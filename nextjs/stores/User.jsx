import { observable, action } from 'mobx';
import Network from '../utils/network';
import { _gerServerConfig } from '../utils';
import { getArticle } from '../api/article';

class User {
    @observable user = {};
    @observable articles = [];
    @observable article = {};
    @observable totalCount = 0;
    @observable articleCountDictionary = {};

    hydrate(initializeData) {
        const { groupBy } = initializeData;
        const { values, aggregate } = initializeData.articlesConnection || {};
        this.user = initializeData.user || {};
        this.articles = values;
        this.totalCount = (aggregate || {}).count;
        this.article = initializeData.article || {};

        let allCount = 0;
        for (const category of (groupBy || {}.category || [])) {
            const { key, connection } = category;
            this.articleCountDictionary[key] = connection.aggregate.count || 0;
            allCount += this.articleCountDictionary[key];
        }

        this.articleCountDictionary.all = allCount;
    }

    @action async refetch(id) {
        const article = await getArticle(id);
        this.article = article
    }

    get id() {
        return this.user.id;
    }

    get username() {
        return this.user.username;
    }

    get email() {
        return this.user.email;
    }

    get link() {
        return this.user.link;
    }

    get message() {
        return this.user.message;
    }

    get thumbnail() {
        return this.user.thumbnail;
    }

    get categories() {
        return this.user.categories;
    }
}

const InitialUserDataQuery = `
query InitializeUserData($user: ID!, $article_where: JSON, $start: Int, $limit: Int, $sort: String) {
    user(id: $user) {
        id
        username
        email
        link
        message
        thumbnail
        categories {
            id
            title_en
            title_ko
            thumbnail
        }
    }

    articlesConnection(where: $article_where, start: $start, limit: $limit, sort: $sort) {
        groupBy{
            category {
                key
                connection {
                    aggregate {
                        count
                    }
                }
            }
        }
        values {
            id
            created_at
            updated_at
            title
            description
            category {
                id
                title_en
                title_ko
                thumbnail
            }
            thumbnail
            content
            author {
                id
                username
                email
                link
                message
                thumbnail
            }
        }
        aggregate {
            count
        }
    }
}
`;

const CategoryQuery = `
query {
    articlesConnection{
        groupBy{
            category {
                key
                connection {
                    aggregate {
                        count
                    }
                }
            }
        }
    }
}`

export async function getInitializeUserData(context) {
    const { owner } = await _gerServerConfig();

    const { category, page } = context.query;
    const article_where = { author: owner.id };
    if (category !== undefined) {
        article_where.category = category;
    }
    const start = page ? (page - 1) * 10 : 0;
    const sort = 'created_at:desc';
    const limit = 10;
    const { data } = await Network.graphql(InitialUserDataQuery, { user: owner.id, article_where, start, limit, sort });
    const response = await Network.graphql(CategoryQuery);
    const { articlesConnection } = response.data;
    const { groupBy } = articlesConnection;

    data.groupBy = groupBy;

    return data;
}

export default User;