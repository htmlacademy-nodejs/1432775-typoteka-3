"use strict";

const {Router} = require(`express`);

const searchRouter = new Router();

searchRouter.get(`/`, (_, res) => res.send(`/search`));

module.exports = searchRouter;
