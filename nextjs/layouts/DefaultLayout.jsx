import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import SiderLayout from './SiderLayout';
import HeaderLayout from './HeaderLayout';

const FULL_HEIGHT = {
    height: '100%'
};

const WrapperStyle = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5
};

const ContentStyle = {
    height: 'calc(100% - 36px)',
    marginTop: '36px',
    transition: 'all 0.2s',
    overflowY: 'auto',
    overflowX: 'hidden'
};

const HeaderStyle = {
    height: '36px',
    zIndex: 4,
    textAlign: 'right',
    backgroundColor: 'rgba(33,33,33,0.8)',
    position: 'fixed',
    padding: '2px',
    top: 0,
    left: 0,
    boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)'
};

const DefaultLayout = inject('environment', 'user')(observer(({ environment, user, children }) => {
    const [size, setSize] = useState('default');
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (collapsed, type) => {
        if (type === 'responsive' && collapsed) {
            environment.size = 'small';
            setSize('small');
            setCollapsed(collapsed);
        } else if (type === 'responsive' && !collapsed) {
            environment.size = 'default';
            setSize('default');
            setCollapsed(collapsed);
        } else {
            setCollapsed(collapsed);
        }
    }
    const disableMenu = !user || user.id === undefined;

    return (
        <Layout style={FULL_HEIGHT}>
            {!disableMenu && <SiderLayout onCollapse={onCollapse} collapsed={collapsed} />}
            {
                (size === 'small' && !collapsed) &&
                <div style={WrapperStyle} onClick={() => onCollapse(!collapsed)} />
            }
            <Layout style={FULL_HEIGHT}>
                {!disableMenu && <HeaderLayout style={{ ...HeaderStyle, marginLeft: size === 'small' ? 0 : 240, width: size === 'small' ? '100%' : 'calc(100% - 240px)' }} />}
                <Layout.Content style={{ ...ContentStyle, marginLeft: size === 'small' || disableMenu ? 0 : 240 }}>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    );
}));

export default DefaultLayout;