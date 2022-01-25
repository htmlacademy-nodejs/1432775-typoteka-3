"use strict";

require(`dotenv`).config();
const express = require(`express`);
const path = require(`path`);

const {
  StatusCode,
  FRONT_DEFAULT_PORT,
  ClientDir,
} = require(`../const`);
const defineRoutes = require(`./routes`);
const {getFrontLogger} = require(`../utils/logger`);
const {NotFoundErr} = require(`../utils/exceptions`);

const logger = getFrontLogger({name: `express`});

const app = express();
const port = process.env.FRONT_PORT || FRONT_DEFAULT_PORT;

app.use(express.urlencoded({extended: false}));

defineRoutes(app);

app.use(express.static(path.resolve(__dirname, ClientDir.PUBLIC)));
app.use(express.static(path.resolve(__dirname, ClientDir.UPLOAD)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use((_, res) => res.status(StatusCode.NOT_FOUND).render(`404`));

app.use((err, _req, res, _next) => {
  if (err instanceof NotFoundErr) {
    return res.status(StatusCode.NOT_FOUND).render(`404`);
  }

  logger.error(`Error 500: ${err.message}`);
  return res.status(StatusCode.INTERNAL_SERVER_ERROR).render(`500`);
});

app.listen(port, () => {
  logger.info(`Started on port ${port}`);
});
