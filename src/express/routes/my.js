"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);
const withAuth = require(`../middlewares/withAuth`);

const myRouter = new Router();

myRouter.get(`/`, withAuth, async (_req, res) => {
  const myArticles = await api.getMyArticles();
  res.render(`my`, {myArticles, user: res.user});
});

myRouter.get(`/comments`, withAuth, async (_req, res) => {
  const comments = await api.getMyComments();
  res.render(`comments`, {comments, user: res.user});
});

module.exports = myRouter;
