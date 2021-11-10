"use strict";

require(`dotenv`).config();
const express = require(`express`);
const path = require(`path`);

const {
  StatusCode,
  FRONT_DEFAULT_PORT,
  UPLOAD_DIR,
  PUBLIC_DIR,
} = require(`../const`);
const {
  mainRouter,
  registerRouter,
  loginRouter,
  myRouter,
  articlesRouter,
  searchRouter,
  categoriesRouter,
} = require(`./routes`);
const {getFrontLogger} = require(`../utils/logger`);

const logger = getFrontLogger({name: `express`});

const app = express();
const port = process.env.FRONT_PORT || FRONT_DEFAULT_PORT;

app.use(`/`, mainRouter);
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use(`/search`, searchRouter);
app.use(`/categories`, categoriesRouter);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use((_, res) => res.status(StatusCode.NOT_FOUND).render(`404`));
app.use((err, _req, res, _next) => {
  logger.error(`Error 500: ${err.message}`);
  res.status(StatusCode.INTERNAL_SERVER_ERROR).render(`500`);
});

app.listen(port, () => {
  logger.info(`Started on port ${port}`);
});
