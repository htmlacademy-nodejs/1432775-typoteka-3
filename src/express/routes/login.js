"use strict";

const {Router} = require(`express`);

const loginRouter = new Router();

loginRouter.get(`/`, (_, res) => res.render(`login`));

module.exports = loginRouter;
