"use strict";

const {Router} = require(`express`);
const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, async (_req, res) => {
    const categories = await categoryService.findAll({count: true});
    return res.status(StatusCode.OK).json(categories);
  });
};
