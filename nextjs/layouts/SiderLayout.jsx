import React from 'react';
import { withRouter } from 'next/router'
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Layout, Menu, Tag, Tooltip } from 'antd';
import { FileTextOutlined, UserOutlined, MailOutlined, MessageFilled, LinkOutlined, SettingOutlined } from '@ant-design/icons';
import icons from '../utils/icons';

const ProfileStyle = {
    position: 'absolute',
    top: 0,
    height: '328px',
    backgroundColor: '#181818',
    transition: '.2s all'
};

const ThumbnailWrapperStyle = {
    width: '240px',
    height: '236px',
    padding: '4px 4px 0px 4px'
};

const ThumbnailStyle = {
    position: 'relative',
    width: '232px',
    height: '232px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '3px solid #303030'
};

const ThumbnailImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const InfoStyle = {
    width: '240px',
    height: '90px',
    padding: '1px 2px 2px 2px',
    overflow: 'hidden',
    display: 'inline-block'
};

const InfoRowStyle = {
    width: '100%',
    marginRight: 0,
    border: 'none',
    backgroundColor: 'inherit'
};

const ShadowStyle = {
    boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)',
    paddingTop: '328px'
};

const MenuItemStyle = {
    marginTop: 0,
    marginBottom: '2px'
};

const TagStyle = {
    background: 'none',
    position: 'absolute',
    right: '4px',
    top: '8.5px'
};
const SiderLayout = inject('environment', 'auth', 'user')(observer(({ environment, i18n, onCollapse, collapsed, user, auth, router }) => {
    const pathname = router.pathname;
    const linkTo = (path, url) => router.push(path, url);
    const category = environment.query.category;
    const selectedKeys = [category !== undefined ? category : (user.article && user.article.category && user.article.category.id) || (pathname === '/settings' ? pathname : '/')];

    return (
        <Layout.Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={onCollapse}
            collapsed={collapsed}
            style={ShadowStyle}
            width='240px'
        >
            <Menu mode="inline" selectedKeys={selectedKeys}>
                <Menu.Item key="/" icon={<FileTextOutlined />} onClick={() => linkTo('/', '/')} style={MenuItemStyle}>
                    {i18n.t('all')} {i18n.t('category')}
                    <Tag size='small' style={TagStyle}>{user.articleCountDictionary.all}</Tag>
                </Menu.Item>
                {
                    user && user.categories && user.categories.map((category) => {
                        return (
                            <Menu.Item key={category.id} icon={icons[category.icon] || <FileTextOutlined />} onClick={() => linkTo(`/categories/[category]`, `/categories/${category.id}`)} style={MenuItemStyle}>
                                {category[`title_${i18n.language}`]}
                                <Tag size='small' style={TagStyle}>{user.articleCountDictionary[category.id] || 0}</Tag>
                            </Menu.Item>
                        )
                    })
                }
                {
                    auth.hasPermission && user.id == auth.user.id && user.categories.length &&
                    <Menu.Item key="/settings" icon={<SettingOutlined />} onClick={() => linkTo('/settings', '/settings')} style={MenuItemStyle}>
                        {i18n.t('settings')}
                    </Menu.Item>
                }
            </Menu>
            <div style={{ ...ProfileStyle, left: collapsed ? -240 : 0 }}>
                <div style={ThumbnailWrapperStyle} onClick={() => linkTo('/', '/')}>
                    <div style={ThumbnailStyle}>
                        <img src={user.thumbnail} style={ThumbnailImageStyle} />
                    </div>
                </div>
                <div style={InfoStyle}>
                    <Tag icon={<UserOutlined />} style={InfoRowStyle}>{user.username}</Tag>
                    <Tag icon={<MailOutlined />} style={InfoRowStyle}>{user.email}</Tag>
                    <Tooltip title={user.link}>
                        <Tag icon={<LinkOutlined />} style={InfoRowStyle} onClick={() => linkTo(user.link, user.link)}>{user.link}</Tag>
                    </Tooltip>
                    <Tag color='blue' icon={<MessageFilled />} style={InfoRowStyle}>{user.message}</Tag>
                </div>
            </div>
        </Layout.Sider >
    )
}));

export default withRouter(withTranslation('SiderLayout')(SiderLayout));