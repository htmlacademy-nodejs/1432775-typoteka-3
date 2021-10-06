"use strict";

const {Router} = require(`express`);

const registerRouter = new Router();

registerRouter.get(`/`, (_, res) => res.send(`/register`));

module.exports = registerRouter;
