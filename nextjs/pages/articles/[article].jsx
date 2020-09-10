import dynamic from 'next/dynamic';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import HydrateComponent from '../../components/HydrateComponent';
import { getInitializeAuthData } from '../../stores/Auth';
import { getInitializeUserData } from '../../stores/User';
import Loading from '../../components/Loading';
import { getArticle } from '../../api/article';
const ArticleViewer = dynamic(() => import('../../components/ArticleViewer'), { ssr: false, loading: () => <Loading /> });

@inject('environment', 'auth')
@observer
class Article extends HydrateComponent {
  render() {
    return (
      <div style={ArticleViewerStyle}>
        <ArticleViewer />
      </div>
    );
  }
}

const ArticleViewerStyle = {
  position: 'relative',
  width: '100%',
  height: 'auto',
  maxWidth: '1024px',
  margin: 'auto'
};

export async function getServerSideProps(context) {
  const auth = await getInitializeAuthData(context, { routing: true });
  const user = await getInitializeUserData(context);

  const { article } = context.query;
  const _article = await getArticle(article);

  if (!_article) {
    context.res.writeHead(303, { Location: '/_404' });
    context.res.end();
  }

  return { props: { initializeData: { auth, user: { ...user, article: _article }, environment: { query: context.query } } } };
}

export default withTranslation('Article')(Article);