import React from 'react';
import { withRouter } from 'next/router'
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Layout, Menu, Tag, Tooltip } from 'antd';
import { FileTextOutlined, UserOutlined, MailOutlined, MessageFilled, LinkOutlined, SettingOutlined } from '@ant-design/icons';

@inject('environment', 'auth', 'user')
@observer
class SiderLayout extends React.Component {
    get pathname() {
        const { router } = this.props;
        const { pathname } = router;
        return pathname;
    }

    linkTo = (path, url) => {
        const { router } = this.props;
        router.push(path, url);
    }

    get selectedKeys() {
        const { environment, user } = this.props;
        let key = environment.query.category !== undefined ? environment.query.category : undefined;
        key = key || (user.article && user.article.category && user.article.category.id) || (this.pathname === '/settings' ? this.pathname : '/');
        return [key];
    }

    render() {
        const { i18n, onCollapse, collapsed, user, auth } = this.props;

        return (
            <Layout.Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={onCollapse}
                collapsed={collapsed}
                style={SHADOW_STYLE}
                width='240px'
            >
                <Menu mode="inline" selectedKeys={this.selectedKeys}>
                    <Menu.Item key="/" icon={<FileTextOutlined />} onClick={() => this.linkTo('/', '/')} style={{ marginTop: 0, marginBottom: '2px' }}>
                        {i18n.t('all')} {i18n.t('category')}
                        <Tag size='small' style={{ background: 'none', position: 'absolute', right: '4px', top: '8.5px' }}>{user.articleCountDictionary.all}</Tag>
                    </Menu.Item>
                    {
                        user && user.categories && user.categories.map((category) => {
                            return (
                                <Menu.Item key={category.id} icon={<FileTextOutlined />} onClick={() => this.linkTo(`/categories/[category]`, `/categories/${category.id}`)} style={{ marginTop: 0, marginBottom: '2px' }}>
                                    {category[`title_${i18n.language}`]}
                                    <Tag size='small' style={{ background: 'none', position: 'absolute', right: '4px', top: '8.5px' }}>{user.articleCountDictionary[category.id] || 0}</Tag>
                                </Menu.Item>
                            )
                        })
                    }
                    {
                        auth.hasPermission && user.id == auth.user.id && user.categories.length &&
                        <Menu.Item key="/settings" icon={<SettingOutlined />} onClick={() => this.linkTo('/settings', '/settings')} style={{ marginTop: 0, marginBottom: '2px' }}>
                            {i18n.t('settings')}
                        </Menu.Item>
                    }
                </Menu>
                <div style={{ ...ProfileStyle, left: collapsed ? -240 : 0 }}>
                    <div style={ThumbnailWrapperStyle}>
                        <div style={ThumbnailStyle}>
                            <img src={user.thumbnail} style={ThumbnailImageStyle} />
                        </div>
                    </div>
                    <div style={InfoStyle}>
                        <Tag icon={<UserOutlined />} style={InfoRowStyle}>{user.username}</Tag>
                        <Tag icon={<MailOutlined />} style={InfoRowStyle}>{user.email}</Tag>
                        <Tooltip title={user.link}>
                            <Tag icon={<LinkOutlined />} style={InfoRowStyle}>{user.link}</Tag>
                        </Tooltip>
                        <Tag color='blue' icon={<MessageFilled />} style={InfoRowStyle}>{user.message}</Tag>
                    </div>
                </div>
            </Layout.Sider >
        )
    }
}

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

const SHADOW_STYLE = {
    boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)',
    paddingTop: '328px'
};

export default withRouter(withTranslation('SiderLayout')(SiderLayout));