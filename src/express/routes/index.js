"use strict";

const mainRouter = require(`./main`);
const registerRouter = require(`./register`);
const loginRouter = require(`./login`);
const myRouter = require(`./my`);
const articlesRouter = require(`./articles`);
const searchRouter = require(`./search`);
const categoriesRouter = require(`./categories`);

module.exports = {
  mainRouter,
  registerRouter,
  loginRouter,
  myRouter,
  articlesRouter,
  searchRouter,
  categoriesRouter
};
