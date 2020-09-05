import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Pagination, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HydrateComponent from '../../../../components/HydrateComponent';
import { getInitializeAuthData } from '../../../../stores/Auth';
import ArticleCard from '../../../../components/ArticleCard';
import { getInitializeUserData } from '../../../../stores/User';

@inject('environment', 'auth', 'user')
@observer
class Category extends HydrateComponent {
  create = () => {
    Router.push(`/articles/create`);
  }

  pageChange = (page) => {
    const { environment } = this.props;
    Router.push(`/categories/[category]/pages/[page]`, `/categories/${environment.query.category}/pages/${page}`);
  }

  render() {
    const { environment, auth, user, i18n } = this.props;

    return (
      <div style={{ width: '100%', minHeight: '100%', padding: '5px', textAlign: 'center', display: 'flex', position: 'relative' }}>
        <div style={{ margin: 'auto', paddingBottom: '30px' }}>
          {user.articles && user.articles.map(article => <ArticleCard article={article} key={article.id} />)}
        </div>
        {
          auth.hasPermission && user.id == auth.user.id && user.categories.length &&
          <Button type='primary' icon={<PlusOutlined />} style={{ position: 'fixed', bottom: '52px', right: '10px' }} onClick={this.create}>{i18n.t('writeArticle')}</Button>
        }
        <div style={{ width: environment.size === 'small' ? '100%' : 'calc(100% - 240px)', height: '40px', position: 'fixed', bottom: 0, left: environment.size === 'small' ? 0 : 240, backgroundColor: 'rgba(30,30,30,0.7)', padding: '4px' }}>
          <Pagination total={user.totalCount} showSizeChanger={false} hideOnSinglePage={false} current={Number(environment.query.page) || 1} onChange={this.pageChange} />
        </div>
      </div >
    );
  }
}
export async function getServerSideProps(context) {
  const auth = await getInitializeAuthData(context, { routing: true });
  const user = await getInitializeUserData(context);

  const { category } = context.query;
  if (!user.user.categories || !user.user.categories.filter(c => c.id === category).length) {
    context.res.writeHead(303, { Location: '/' });
    context.res.end();
  }

  return { props: { initializeData: { auth, user, environment: { query: context.query } } } };
}

export default withTranslation('Category')(Category);