"use strict";

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/:id`, (_, res) => res.render(`post-detail`));

articlesRouter.get(`/add`, (_, res) => res.render(`new-post`));

articlesRouter.get(`/category/:id`, (_, res) => res.render(`articles-by-category`));

articlesRouter.get(`/edit/:id`, (_, res) => res.render(`new-post`));

module.exports = articlesRouter;
