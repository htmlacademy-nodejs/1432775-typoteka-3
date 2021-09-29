'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getFileNameFromPath} = require(`./util`);

exports.readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    const fileName = getFileNameFromPath(path);
    console.error(chalk.red(`Haven't managed to read from file ${fileName}`));
    throw new Error(err);
  }
};

exports.writeContent = async (path, content) => {
  const fileName = getFileNameFromPath(path);
  try {
    await fs.writeFile(path, content);
    console.info(chalk.green(`File ${fileName} created.`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file ${fileName}`));
    throw new Error(err);
  }
};
