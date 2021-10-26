"use strict";

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (_, res) => res.render(`my`));

myRouter.get(`/comments`, (_, res) => res.render(`comments`));

module.exports = myRouter;
