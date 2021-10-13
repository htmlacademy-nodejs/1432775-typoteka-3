"use strict";

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (_, res) => res.send(`/`));

module.exports = mainRouter;
