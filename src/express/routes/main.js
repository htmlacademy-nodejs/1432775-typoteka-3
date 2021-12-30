"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);

const mainRouter = new Router();

mainRouter.get(`/`, async (_req, res) => {
  const [articles, mostCommentedArticles, categories, latestComments] = await Promise.all([
    api.getArticles({limit: 5, offset: 1}),
    api.getArticles({mostCommented: true, limit: 5, offset: 1}),
    api.getCategories(),
    api.getLatestComments({limit: 3}),
  ]);

  res.render(`main`, {
    articles,
    categories,
    mostCommentedArticles,
    latestComments
  });
});

module.exports = mainRouter;
