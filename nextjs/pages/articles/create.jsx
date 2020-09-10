import dynamic from 'next/dynamic';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../../components/HydrateComponent';
import { getInitializeAuthData } from '../../stores/Auth';
import { getInitializeUserData } from '../../stores/User';
import Loading from '../../components/Loading';
const ArticleEditor = dynamic(() => import('../../components/ArticleEditor'), { ssr: false, loading: () => <Loading /> });

@inject('environment', 'auth')
@observer
class CreateArticle extends HydrateComponent {
    render() {
        return (
            <div style={ArticleEditorStyle}>
                <ArticleEditor />
            </div>
        );
    }
}

const ArticleEditorStyle = {
    width: '100%',
    height: '100%',
    margin: 'auto',
    display: 'flex'
};

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context, { routing: true });
    const user = await getInitializeUserData(context);

    if (((user || {}).user || {}).id != ((auth || {}).user || {}).id || ((auth || {}).user || {}).id === undefined) {
        context.res.writeHead(303, { Location: '/_404' });
        context.res.end();
    }

    return { props: { initializeData: { auth, user, environment: { query: context.query } } } };
}

export default withTranslation('CreateArticle')(CreateArticle);