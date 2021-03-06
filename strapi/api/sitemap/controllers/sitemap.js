'use strict';
const { sanitizeEntity } = require('strapi-utils');

async function SITE_MAP() {
  const articles = await strapi.services.article.find();
  const ITEMS = articles.map((article) => {
    const URL = `https://www.develop-story.com/articles/${article.id}`;
    const PRIORITY = 0.5;
    return `<url>
    <loc>${URL}</loc>
    <lastmod>${article.created_at.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${PRIORITY}</priority>
    </url>`;
  });

  return `<?xml version="1.0" encoding="utf-8"?>
  <!--Generated by Screaming Frog SEO Spider 9.4-->
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${ITEMS}
  </urlset>`;
}

module.exports = {
  index: async ctx => {
    const XML = await SITE_MAP();
    ctx.set('Content-Type', 'text/xml');
    ctx.send(XML);
  }
};