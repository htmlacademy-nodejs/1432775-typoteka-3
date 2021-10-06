"use strict";

const express = require(`express`);

const {FRONT_PORT} = require(`../const`);
const {
  mainRouter,
  registerRouter,
  loginRouter,
  myRouter,
  articlesRouter,
  searchRouter,
  categoriesRouter,
} = require(`./routes`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use(`/search`, searchRouter);
app.use(`/categories`, categoriesRouter);

app.listen(FRONT_PORT);
