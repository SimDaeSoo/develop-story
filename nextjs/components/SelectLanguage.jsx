import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Select } from 'antd';

const DefaultStyle = {
    width: '70px',
    textAlign: 'center'
};

const SelectLanguage = inject('environment')(observer(({ environment, i18n, style }) => {
    const changeLanguage = (language) => {
        environment.setLangauge(language);
    }

    return (
        <Select value={i18n.language} onChange={changeLanguage} style={{ ...DefaultStyle, ...(style || {}) }}>
            <Select.Option value="en">{i18n.t('english')}</Select.Option>
            <Select.Option value="ko">{i18n.t('korean')}</Select.Option>
        </Select>
    );
}));

export default withTranslation('SelectLanguage')(SelectLanguage);