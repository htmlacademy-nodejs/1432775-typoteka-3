"use strict";

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (_, res) => res.send(`/my`));

myRouter.get(`/comments`, (_, res) => res.send(`/my/comments`));

module.exports = myRouter;
