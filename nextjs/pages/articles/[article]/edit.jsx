import dynamic from 'next/dynamic';
import { withTranslation } from "react-i18next";
import { getInitializeAuthData } from '../../../stores/Auth';
import { getInitializeUserData } from '../../../stores/User';
import Loading from '../../../components/Loading';
import { getArticle } from '../../../api/article';
const ArticleEditor = dynamic(() => import('../../../components/ArticleEditor'), { ssr: false, loading: () => <Loading /> });

const ArticleEditorStyle = {
    width: '100%',
    height: '100%',
    margin: 'auto',
    display: 'flex'
};

const Edit = () => {
    return (
        <div style={ArticleEditorStyle}>
            <ArticleEditor />
        </div>
    );
};

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context, { routing: true });
    const user = await getInitializeUserData(context);

    const { article } = context.query;
    const _article = await getArticle(article);

    if (!_article || ((user || {}).user || {}).id != ((auth || {}).user || {}).id || ((auth || {}).user || {}).id === undefined) {
        context.res.writeHead(303, { Location: '/_404' });
        context.res.end();
    }

    return { props: { initializeData: { auth, user: { ...user, article: _article }, environment: { query: context.query } } } };
}

export default withTranslation('Edit')(Edit);