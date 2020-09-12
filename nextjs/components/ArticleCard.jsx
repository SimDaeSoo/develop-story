import React from 'react';
import { withRouter } from 'next/router'
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import moment from 'moment';
import { Card, Tag, Tooltip, Button } from 'antd';
import { ClockCircleOutlined, UserOutlined, TagOutlined } from '@ant-design/icons';
import UserProfile from '../components/UserProfile';
import MyProfile from '../components/MyProfile';

const TouchNoneStyle = {
  touchAction: 'none'
}

const CardWrapperStyle = {
  margin: '15px',
  display: 'inline-block',
  verticalAlign: 'top'
};

const ArticleCardStyle = {
  width: 280,
  height: 367,
  textAlign: 'left'
};

const CoverWrapperStyle = {
  position: 'relative',
  width: '100%',
  height: '180px'
};

const CoverThumbnailStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'brightness(0.7)'
};

const CardDateTagStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '4px'
};

const SmallMarginStyle = {
  marginRight: '1px'
};

const AvatarStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '4px'
};

const UserNameTagStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  padding: '4px'
};

const FullWidthStyle = {
  width: '100%'
};

const ArticleCard = inject('auth')(observer(({ auth, i18n, article, router }) => {
  const linkTo = () => router.push('/articles/[article]', `/articles/${article.id}`);

  return (
    <div style={CardWrapperStyle}>
      <Card
        style={ArticleCardStyle}
        cover={
          <div style={CoverWrapperStyle}>
            <img src={article.thumbnail || article.category.thumbnail || '/assets/default.png'} style={CoverThumbnailStyle} />
            <div style={CardDateTagStyle}>
              <Tooltip title={moment(article.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                <Tag color='orange' icon={<ClockCircleOutlined />} style={SmallMarginStyle}>
                  {moment(article.created_at).fromNow()}
                </Tag>
              </Tooltip>
            </div>
            <div style={AvatarStyle}>
              {auth.hasPermission && article.author.id == auth.user.id && <MyProfile />}
              {(!auth.hasPermission || article.author.id != auth.user.id) && <UserProfile user={article.author} />}
            </div>
            <div style={UserNameTagStyle}>
              <Tag color='blue' icon={<UserOutlined />} style={SmallMarginStyle}>{article.author.username}</Tag>
              <Tag color='magenta' icon={<TagOutlined />} style={SmallMarginStyle}>{article.category[`title_${i18n.language}`]}</Tag>
            </div>
          </div>
        }
        actions={[<Button key='view' style={{ ...FullWidthStyle, ...TouchNoneStyle }} onClick={linkTo}>{i18n.t('view')}</Button>]}
      >
        <Card.Meta
          title={article.title || '-'}
          description={<div className='card-description'>{article.description}</div>}
        />
      </Card>
    </div>
  );
}));

export default withRouter(withTranslation('ArticleCard')(ArticleCard));