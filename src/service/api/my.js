"use strict";

const {Router} = require(`express`);
const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, commentService) => {
  app.use(`/my`, route);

  route.get(`/comments`, (_req, res) => {
    const myComments = commentService.findMyCommentsWithTitles();
    res.status(StatusCode.OK).json(myComments);
  });

};
