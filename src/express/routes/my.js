"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);

const myRouter = new Router();

myRouter.get(`/`, async (_req, res) => {
  const myArticles = await api.getMyArticles();
  res.render(`my`, {myArticles});
});

myRouter.get(`/comments`, async (_req, res) => {
  const comments = await api.getMyComments();
  res.render(`comments`, {comments});
});

module.exports = myRouter;
