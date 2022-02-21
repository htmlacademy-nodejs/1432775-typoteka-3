"use strict";

const {Router} = require(`express`);
const {StatusCode, Role} = require(`../../const`);
const authJwt = require(`../middlewares/auth-jwt`);

const route = new Router();

module.exports = (app, commentService, articleService) => {
  app.use(`/my`, route);

  route.use(authJwt(Role.ADMIN));

  route.get(`/`, async (_req, res) => {
    const myArticles = await articleService.findUserArticles(res.user.id);
    res.status(StatusCode.OK).json(myArticles);
  });

  route.get(`/comments`, async (_req, res) => {
    const myComments = await commentService.findMyComments(res.user.id);
    res.status(StatusCode.OK).json(myComments);
  });
};
