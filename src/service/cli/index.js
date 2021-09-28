"use strict";

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generate`);

module.exports = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
};
