import Network from '../utils/network';

const CreateArticleQuery = `
mutation($input: createArticleInput) {
  createArticle(input:$input){
    article {
      id
    }
  }
}`;

const UpdateArticleQuery = `
mutation($input: updateArticleInput) {
  updateArticle(input:$input){
    article {
      id
    }
  }
}`;

const DeleteArticleQuery = `
mutation($input: deleteArticleInput) {
  deleteArticle(input:$input){
    article {
      id
    }
  }
}`;

const GetArticleQuery = `
query GetArticle($id: ID!) {
    article(id: $id) {
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
        comments {
            id
            created_at
            updated_at
            removed
            edited
            user {
                id
                username
                email
                link
                message
                thumbnail
            }
            comment {
              id
            }
            content
        }
    }
}
`;

export async function getArticle(id) {
  const { data } = await Network.graphql(GetArticleQuery, { id });
  const { article } = data;
  return article;
}

export async function createArticle(article) {
  const { data } = await Network.graphql(CreateArticleQuery, { input: { data: article } });
  const { createArticle } = data;
  return createArticle.article;
}

export async function updateArticle(id, article) {
  const { data } = await Network.graphql(UpdateArticleQuery, { input: { data: article, where: { id } } });
  const { updateArticle } = data;
  return updateArticle.article;
}

export async function deleteArticle(id) {
  const { data } = await Network.graphql(DeleteArticleQuery, { input: { where: { id } } });
  const { deleteArticle } = data;
  return deleteArticle.article;
}