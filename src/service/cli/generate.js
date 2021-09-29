"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {TEXTS, TITLES, CATEGORIES} = require(`./possibleData`);
const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../const`);

const DEFAULT_NOTES_NUMBER = 1;
const MAX_NOTES_NUMBER = 1000;
const MAX_MONTHS_AGO_CREATED = 3;
const MAX_ANNOUNCE_SENTENCES = 5;
const MAX_FULL_TEXT_SENTENCES = 10;
const MONTH_MILLISECONDS = 3600000 * 24 * 30;

const FILE_NAME = `mock.json`;
const WRITE_ERROR_MESSAGE = `Can't write data to file...`;
const WRITE_SUCCESS_MESSAGE = `Operation success. File created.`;
const MAX_NOTES_ERROR_MESSAGE = `Can't be more than ${MAX_NOTES_NUMBER} notes`;

const getNotes = (notesNum) =>
  Array(notesNum)
    .fill()
    .map(() => {
      const currentDate = +new Date();
      const minCreationData =
        currentDate - MONTH_MILLISECONDS * MAX_MONTHS_AGO_CREATED;

      return {
        title: TITLES[getRandomInt(0, TITLES.length - 1)],
        createdDate: new Date(getRandomInt(minCreationData, currentDate)),
        announce: shuffle(TEXTS)
          .slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCES))
          .join(` `),
        fullText: shuffle(TEXTS)
          .slice(0, getRandomInt(1, MAX_FULL_TEXT_SENTENCES))
          .join(` `),
        сategory: [
          ...new Set(
              Array(getRandomInt(1, CATEGORIES.length))
              .fill()
              .map(() => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)])
          ),
        ],
      };
    });

module.exports = {
  name: `--generate`,
  run: async (args) => {
    const notesNum = +args[0] || DEFAULT_NOTES_NUMBER;

    if (notesNum > MAX_NOTES_NUMBER) {
      console.error(chalk.red(MAX_NOTES_ERROR_MESSAGE));
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(getNotes(notesNum));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(WRITE_SUCCESS_MESSAGE));
    } catch (err) {
      console.error(chalk.red(WRITE_ERROR_MESSAGE));
      process.exit(ExitCode.ERROR);
    }
  },
};
