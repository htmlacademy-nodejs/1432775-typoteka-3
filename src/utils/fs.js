"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {getFileNameFromPath} = require(`./util`);

const showErrorWithMessafe = (err, message) => {
  console.error(chalk.red(message));
  console.error(chalk.red(err.message));
};

exports.readContentByLines = async (path) => {
  try {
    const content = await fs.readFile(path, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    const fileName = getFileNameFromPath(path);
    showErrorWithMessafe(
        err,
        `Haven't managed to read from file ${fileName}`
    );
    throw new Error(err);
  }
};

exports.writeToTextFile = async (path, data) => {
  const fileName = getFileNameFromPath(path);
  try {
    await fs.writeFile(path, JSON.stringify(data));
    console.info(chalk.green(`File ${fileName} created.`));
  } catch (err) {
    showErrorWithMessafe(err, `Can't write data to file ${fileName}`);
    throw new Error(err);
  }
};

exports.readContent = async (path) => {
  try {
    const fileContent = await fs.readFile(path);
    return JSON.parse(fileContent);
  } catch (err) {
    const fileName = getFileNameFromPath(path);
    showErrorWithMessafe(err, `Can't read data from file ${fileName}`);
    throw new Error(err);
  }
};
