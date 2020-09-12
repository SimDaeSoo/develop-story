import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Tag, Avatar, Menu, Dropdown, Button } from 'antd';
import { ExportOutlined, MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';

const TagStyle = {
    margin: '2px'
};

const NoMarginStyle = {
    margin: 0
};

const UserIconStyle = {
    marginRight: '4px'
};

const ButtonStyle = {
    position: 'relative',
    verticalAlign: 'bottom',
    paddingLeft: '42px',
    marginRight: '2px'
};

const AvatarStyle = {
    verticalAlign: 'bottom',
    margin: '0 2px',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '4px',
    backgroundColor: 'rgba(0,0,0,0.3)'
};

const ExtendsAvatarStyle = {
    position: 'absolute',
    left: '-3px',
    top: '-1px'
};

const MyProfile = inject('environment', 'auth')(observer(({ environment, auth, i18n, style, showName }) => {
    const logout = () => auth.logout();

    const menu = (
        <Menu>
            <Menu.Item disabled={true}>
                <Tag icon={<UserOutlined style={NoMarginStyle} />} style={TagStyle}>{auth.user.username}</Tag>
                <Tag icon={<LockOutlined style={NoMarginStyle} />} style={TagStyle}>{auth.user.role.name}</Tag>
            </Menu.Item>
            <Menu.Item disabled={true}>
                <Tag icon={<MailOutlined style={NoMarginStyle} />} style={TagStyle}>{auth.user.email}</Tag>
            </Menu.Item>
            <Menu.Item onClick={logout}>
                <ExportOutlined />
                {i18n.t('logout')}
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {
                !showName &&
                <Dropdown overlay={menu} trigger={environment.size === 'small' ? 'click' : 'hover'}>
                    <a>
                        <Avatar shape="square" src={auth.user.thumbnail} style={{ ...AvatarStyle, ...(style || {}) }} />
                    </a>
                </Dropdown>
            }
            {
                showName &&
                <Dropdown overlay={menu} trigger={environment.size === 'small' ? 'click' : 'hover'}>
                    <Button icon={<UserOutlined style={UserIconStyle} />} style={{ ...ButtonStyle, ...(style || {}) }}>
                        <Avatar shape="square" src={auth.user.thumbnail} style={{ ...AvatarStyle, ...ExtendsAvatarStyle }} />
                        {auth.user.username}
                    </Button>
                </Dropdown>
            }
        </>
    );
}));

export default withTranslation('MyProfile')(MyProfile);