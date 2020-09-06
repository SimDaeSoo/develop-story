import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import NextHead from 'next/head';

const defaultTitle = 'default title';
const defaultDescription = 'default description';
const defaultKeywords = '';
const defaultOGURL = '';
const defaultOGImage = '';

@inject('auth', 'user')
@observer
class Head extends React.Component {
  get title() {
    const { user, i18n } = this.props;
    const article = user.article;
    return article.title ? `${article.title} | ${i18n.t('pageTitle')}` : i18n.t('pageTitle');
  }

  get description() {
    const { user, i18n } = this.props;
    const article = user.article;
    const _description = (article.description + article.content) || i18n.t('pageDescription');
    return _description.length > 92 ? `${_description.slice(0, 92)}...` : _description;
  }

  get keywords() {
    const { user, i18n } = this.props;
    const article = user.article;
    return [(article.category || {}).title_ko || '', (article.category || {}).title_en || ''];
  }

  render() {
    const { title, description, keywords, url, ogImage } = this.props;
    const _description = description || defaultDescription;

    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <title>{this.title || defaultTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0 user-scalable=no" />
        <meta name="description" content={this.description || defaultDescription} />
        <meta name="keywords" content={this.keywords || defaultKeywords} />
        <link rel="icon" type="image/png" sizes="16x16" href="/default/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/default/favicon-32x32.png" />
        <link rel="shortcut icon" href="/default/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/default/apple-touch-icon.png" />
        <link rel="mask-icon" href="/default/favicon-mask.svg" color="#000000" />
        <meta property="og:url" content={url || defaultOGURL} />
        <meta property="og:title" content={this.title || defaultTitle} />
        <meta property="og:description" content={this.description || defaultDescription} />
        <meta name="twitter:site" content={url || defaultOGURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage || defaultOGImage} />
        <meta property="og:image" content={ogImage || defaultOGImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </NextHead>
    )
  }
}

export default withTranslation('Head')(Head);
