"use strict";

const {Router} = require(`express`);

const searchRouter = new Router();

searchRouter.get(`/`, (_, res) => res.render(`search`));

module.exports = searchRouter;
