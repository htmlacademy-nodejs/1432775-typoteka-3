'use strict';

const cli = require(`./cli/index`);
const {ExitCode, DEFAULT_COMMAND} = require(`../const`);

const args = process.argv.slice(2);
const command = args[0];

if (!args.length || !cli[command]) {
  cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.ERROR);
}

cli[command].run(args.slice(1));
