import dynamic from 'next/dynamic';
import { withTranslation } from "react-i18next";
import { getInitializeAuthData } from '../../stores/Auth';
import { getInitializeUserData } from '../../stores/User';
import Loading from '../../components/Loading';
import { getArticle } from '../../api/article';
const ArticleViewer = dynamic(() => import('../../components/ArticleViewer'), { ssr: false, loading: () => <Loading /> });

const ArticleViewerStyle = {
  width: '100%',
  height: 'auto',
  display: 'flex',
  maxWidth: '1024px',
  minHeight: '100%',
  margin: 'auto'
};

const Article = () => {
  return (
    <div style={ArticleViewerStyle}>
      <ArticleViewer />
    </div>
  );
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