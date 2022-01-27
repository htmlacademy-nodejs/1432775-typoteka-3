"use strict";

const {Router} = require(`express`);
const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, commentService) => {
  app.use(`/comments`, route);

  route.get(`/latest`, async (req, res) => {
    const {limit} = req.query;
    const comments = await commentService.findLatestComments({limit});
    res.status(StatusCode.OK).json(comments);
  });
};
