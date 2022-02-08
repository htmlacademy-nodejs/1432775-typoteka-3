"use strict";

const {hash, hashSync, compare, compareSync} = require(`bcrypt`);

const SALT_ROUNDS = 10;

module.exports = {
  hash: (str) => hash(str, SALT_ROUNDS),
  hashSync: (str) => hashSync(str, SALT_ROUNDS),
  compare: (str, hashedStr) => compare(str, hashedStr),
  compareSync: (str, hashedStr) => compareSync(str, hashedStr),
};
