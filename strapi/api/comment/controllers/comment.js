'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  update: async ctx => {
    const { id } = ctx.params;
    const { content } = ctx.request.body;
    const user = ctx.state.user;
    const comment = await strapi.query('comment').findOne({ id });

    if (comment.user.id === user.id) {
      const _comment = await strapi.query('comment').update({ id }, { content, edited: true });
      ctx.status = 200;
      ctx.send({ comment: _comment });
    } else {
      ctx.status = 403;
      ctx.res.end();
    }
  },
  delete: async ctx => {
    const { id } = ctx.params;
    const user = ctx.state.user;
    const comment = await strapi.query('comment').findOne({ id });

    if (comment.user.id === user.id) {
      await strapi.query('comment').update({ id }, { content: '', user: null, removed: true });
      ctx.status = 200;
      ctx.res.end();
    } else {
      ctx.status = 403;
      ctx.res.end();
    }
  }
};
