"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);

const mainRouter = new Router();

mainRouter.get(`/`, async (_req, res) => {
  const [articles, categories] = await Promise.all([
    api.getArticles(),
    api.getCategories(),
  ]);

  res.render(`main`, {
    articles,
    categories,
    popularArticles: articles.slice(0, 4),
  });
});

module.exports = mainRouter;
