import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import SelectLanguage from '../components/SelectLanguage';
import MyProfile from '../components/MyProfile';

@inject('environment', 'auth')
@observer
class HeaderLayout extends React.Component {
    render() {
        const { auth, i18n, style } = this.props;

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
        )
    }
}

const MarginRightStyle = {
    marginRight: '2px',
    display: 'inline-block'
};

export default withTranslation('HeaderLayout')(HeaderLayout);