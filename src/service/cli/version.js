"use strict";

const pkj = require(`../../../package.json`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run: () => console.info(chalk.blue(pkj.version)),
};
