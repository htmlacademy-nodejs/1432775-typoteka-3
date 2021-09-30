"use strict";

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const {ExitCode, MOCKS_FILE_NAME, StatusCode} = require(`../../const`);

const DEFAUL_PORT = 3000;
const NOT_FOUND_MESSAGE = `Not found`;

const send = (res, statusCode, content) => {
  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`,
  });

  res.end(content);
};

const onUserConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      const fileContent = await fs.readFile(MOCKS_FILE_NAME);
      const notesList = JSON.parse(fileContent)
        .map(({title}) => `<li>${title}</li>`)
        .join(``);
      send(res, StatusCode.OK, notesList);
      break;
    default:
      send(res, StatusCode.NOT_FOUND, NOT_FOUND_MESSAGE);
  }
};

const onServerStart = (port) =>
  console.info(chalk.green(`Sterted on port ${port}`));

const onServerError = (err) =>
  console.info(chalk.red(`Error on server creation: ${err.message}`));

const run = (args) => {
  const port = Math.floor(+args[0]) || DEFAUL_PORT;

  if (port < 0 || port > 65535) {
    console.error(chalk.red(`Port can't be less than 0 or bigger than 65535`));
    process.exit(ExitCode.ERROR);
  }

  http
    .createServer(onUserConnect)
    .listen(port)
    .on(`listening`, onServerStart.bind(null, port))
    .on(`error`, onServerError);
};

module.exports = {
  name: `--server`,
  run,
};
