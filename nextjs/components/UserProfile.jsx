import React from 'react';
import { observer, inject } from 'mobx-react';
import { Tag, Avatar, Menu, Dropdown } from 'antd';
import { MailOutlined, UserOutlined, LinkOutlined, MessageFilled } from '@ant-design/icons';

const TagStyle = {
    margin: '2px'
};

const NoMarginStyle = {
    margin: 0
};

const AvatarStyle = {
    verticalAlign: 'bottom',
    margin: '0 2px',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '4px',
    backgroundColor: 'rgba(0,0,0,0.3)'
};

const UserProfile = inject('environment', 'auth', 'user')(observer(({ environment, user, style, disabled }) => {
    const menu = (
        <Menu>
            <Menu.Item disabled={true}>
                <Tag icon={<UserOutlined style={NoMarginStyle} />} style={TagStyle}>{user.username}</Tag>
            </Menu.Item>
            <Menu.Item disabled={true}>
                <Tag icon={<MailOutlined style={NoMarginStyle} />} style={TagStyle}>{user.email}</Tag>
            </Menu.Item>
            <Menu.Item disabled={true}>
                <Tag icon={<LinkOutlined style={NoMarginStyle} />} style={TagStyle}>{user.link}</Tag>
            </Menu.Item>
            <Menu.Item disabled={true}>
                <Tag icon={<MessageFilled style={NoMarginStyle} />} color='blue' style={TagStyle}>{user.message}</Tag>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={environment.size === 'small' ? 'click' : 'hover'} disabled={!!disabled}>
            <a>
                <Avatar shape="square" src={user.thumbnail} style={{ ...AvatarStyle, ...(style || {}) }} />
            </a>
        </Dropdown>
    );
}));

export default UserProfile;