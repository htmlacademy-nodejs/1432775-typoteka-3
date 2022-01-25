"use strict";

const mainRouter = require(`./main`);
const registerRouter = require(`./register`);
const loginRouter = require(`./login`);
const myRouter = require(`./my`);
const articlesRouter = require(`./articles`);
const searchRouter = require(`./search`);
const categoriesRouter = require(`./categories`);

module.exports = (app) => {
  app.use(`/`, mainRouter);
  app.use(`/register`, registerRouter);
  app.use(`/login`, loginRouter);
  app.use(`/my`, myRouter);
  app.use(`/articles`, articlesRouter);
  app.use(`/search`, searchRouter);
  app.use(`/categories`, categoriesRouter);
};
