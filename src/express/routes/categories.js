"use strict";

const {Router} = require(`express`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, (_, res) => res.render(`categories`));

module.exports = categoriesRouter;
