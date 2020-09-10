import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Pagination, Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HydrateComponent from '../../components/HydrateComponent';
import { getInitializeAuthData } from '../../stores/Auth';
import ArticleCard from '../../components/ArticleCard';
import { getInitializeUserData } from '../../stores/User';

@inject('environment', 'auth', 'user')
@observer
class Index extends HydrateComponent {
  create = () => {
    Router.push(`/articles/create`);
  }

  pageChange = (page) => {
    Router.push(`/pages/[page]`, `/pages/${page}`);
  }

  render() {
    const { environment, auth, user, i18n } = this.props;

    return (
      <div style={MainWrapperStyle}>
        <div style={ArticleCardWrapperStyle}>
          {user.articles && user.articles.map(article => <ArticleCard article={article} key={article.id} />)}
          {!user.articles || !user.articles.length && <Empty description={i18n.t('emptyData')}/>}
        </div>
        {
          auth.hasPermission && user.id == auth.user.id && user.categories.length &&
          <Button type='primary' icon={<PlusOutlined />} style={WriteArticleStyle} onClick={this.create}>{i18n.t('writeArticle')}</Button>
        }
        <div style={{ ...PaginationStyle, width: environment.size === 'small' ? '100%' : 'calc(100% - 240px)', left: environment.size === 'small' ? 0 : 240 }}>
          <Pagination total={user.totalCount} showSizeChanger={false} hideOnSinglePage={false} current={Number(environment.query.page) || 1} onChange={this.pageChange} />
        </div>
      </div >
    );
  }
}

const MainWrapperStyle = {
  width: '100%',
  minHeight: '100%',
  padding: '5px',
  textAlign: 'center',
  display: 'flex',
  position: 'relative'
};

const ArticleCardWrapperStyle = {
  margin: 'auto',
  paddingBottom: '30px'
};

const WriteArticleStyle = {
  position: 'fixed',
  bottom: '52px',
  right: '10px'
};

const PaginationStyle = {
  height: '40px',
  position: 'fixed',
  bottom: 0,
  backgroundColor: 'rgba(30,30,30,0.7)',
  padding: '4px'
};

export async function getServerSideProps(context) {
  const auth = await getInitializeAuthData(context, { routing: true });
  const user = await getInitializeUserData(context);

  return { props: { initializeData: { auth, user, environment: { query: context.query } } } };
}

export default withTranslation('Index')(Index);