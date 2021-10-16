"use strict";

const express = require(`express`);
const path = require(`path`);

const {FRONT_PORT, StatusCode} = require(`../const`);
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

app.use(express.static(path.resolve(__dirname, `public`)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use((_, res) => res.status(StatusCode.NOT_FOUND).render(`404`));
app.use((err, req, res, _) =>
  res.status(StatusCode.INTERNAL_SERVER_ERROR).render(`500`)
);

app.listen(FRONT_PORT);
