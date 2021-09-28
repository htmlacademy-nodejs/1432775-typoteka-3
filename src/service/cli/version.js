"use strict";

const pkj = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run: () => console.info(pkj.version),
};
