"use strict";

const {Router} = require(`express`);

const registerRouter = new Router();

registerRouter.get(`/`, (_, res) => res.render(`register`));

module.exports = registerRouter;
