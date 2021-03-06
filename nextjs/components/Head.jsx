import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import NextHead from 'next/head';

const defaultTitle = 'default title';
const defaultDescription = 'default description';
const defaultKeywords = '';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = inject('user')(observer(({ user, url, ogImage, i18n }) => {
  const title = user.article && user.article.title ? `${user.article.title} | ${i18n.t('pageTitle')}` : i18n.t('pageTitle');
  const articleDescription = user.article ? user.article.description : '';
  const content = user.article ? user.article.content : '';
  const description = (articleDescription && content) ? `${(articleDescription + content).slice(0, 92)}...` : i18n.t('pageDescription');
  const keywords = [(user.article.category || {}).title_ko || '', (user.article.category || {}).title_en || ''];

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title || defaultTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0 user-scalable=no" />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="icon" type="image/png" sizes="16x16" href="/default/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/default/favicon-32x32.png" />
      <link rel="shortcut icon" href="/default/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/default/apple-touch-icon.png" />
      <link rel="mask-icon" href="/default/favicon-mask.svg" color="#000000" />
      <meta property="og:url" content={url || defaultOGURL} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta name="twitter:site" content={url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || defaultOGImage} />
      <meta property="og:image" content={ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
  );
}));

export default withTranslation('Head')(Head);
