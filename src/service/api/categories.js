"use strict";

const {Router} = require(`express`);
const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, (_req, res) => {
    const categories = categoryService.findAll();
    return res.status(StatusCode.OK).json(categories);
  });
};
