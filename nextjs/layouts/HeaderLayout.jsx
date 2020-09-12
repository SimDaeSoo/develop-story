import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import SelectLanguage from '../components/SelectLanguage';
import MyProfile from '../components/MyProfile';

const MarginRightStyle = {
    marginRight: '2px',
    display: 'inline-block'
};

const HeaderLayout = inject('auth')(observer(({ style, auth, i18n }) => {
    return (
        <div style={style}>
            {auth.hasPermission && <MyProfile showName={true} />}
            {
                !auth.hasPermission &&
                <div style={MarginRightStyle}>
                    <Button icon={<GoogleOutlined />} href={`/connect/google`}>
                        <span>{i18n.t('googleLogin')}</span>
                    </Button>
                </div>
            }
            <SelectLanguage />
        </div>
    );
}));

export default withTranslation('HeaderLayout')(HeaderLayout);