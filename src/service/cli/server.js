"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const express = require(`express`);

const {MOCKS_FILE_NAME} = require(`../../const`);

const DEFAUL_PORT = 3000;

const app = express();
app.use(express.json());

app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(MOCKS_FILE_NAME);
    const notesList = JSON.parse(fileContent);
    res.json(notesList);
  } catch (err) {
    res.send([]);
  }
});

const run = (args) => {
  const port = Math.floor(+args[0]) || DEFAUL_PORT;

  if (port < 0 || port > 65535) {
    throw new Error(
        chalk.red(`Port can't be less than 0 or bigger than 65535`)
    );
  }

  app.listen(port);
};

module.exports = {
  name: `--server`,
  run,
};
