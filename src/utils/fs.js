"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {getFileNameFromPath} = require(`./util`);
const {ExitCode} = require(`../const`);

const exitWithMessageOnError = (err, message) => {
  console.error(chalk.red(message));
  console.error(chalk.red(err.message));
  process.exit(ExitCode.ERROR);
};

exports.readContentByLines = async (path) => {
  try {
    const content = await fs.readFile(path, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    const fileName = getFileNameFromPath(path);
    return exitWithMessageOnError(
        err,
        `Haven't managed to read from file ${fileName}`
    );
  }
};

exports.writeContent = async (path, content) => {
  const fileName = getFileNameFromPath(path);
  try {
    await fs.writeFile(path, content);
    console.info(chalk.green(`File ${fileName} created.`));
  } catch (err) {
    exitWithMessageOnError(err, `Can't write data to file ${fileName}`);
  }
};
