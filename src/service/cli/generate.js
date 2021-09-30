"use strict";

const chalk = require(`chalk`);

const {getRandomInt, shuffle} = require(`../../utils/util`);
const {readContentByLines, writeContent} = require(`../../utils/fs`);
const {ExitCode, MOCKS_FILE_NAME} = require(`../../const`);

const DEFAULT_NOTES_NUMBER = 1;
const MAX_NOTES_NUMBER = 1000;
const MAX_MONTHS_AGO_CREATED = 3;
const MAX_ANNOUNCE_SENTENCES = 5;
const MAX_FULL_TEXT_SENTENCES = 10;
const MAX_CATEGORIES_NUMBER = 5;

const FAKE_DATA_PATH = `./data/`;
const SENTENCES_PATH = FAKE_DATA_PATH + `sentences.txt`;
const TITLES_PATH = FAKE_DATA_PATH + `titles.txt`;
const CATEGORIES_PATH = FAKE_DATA_PATH + `categories.txt`;

const getNotes = (notesNum, categories, sentences, titles) =>
  Array(notesNum)
    .fill()
    .map(() => {
      const currentDate = +new Date();
      const minCreationData =
        currentDate - 3600000 * 24 * 30 * MAX_MONTHS_AGO_CREATED;

      return {
        title: titles[getRandomInt(0, titles.length - 1)],
        createdDate: new Date(getRandomInt(minCreationData, currentDate)),
        announce: shuffle(sentences)
          .slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCES))
          .join(` `),
        fullText: shuffle(sentences)
          .slice(0, getRandomInt(1, MAX_FULL_TEXT_SENTENCES))
          .join(` `),
        сategory: [
          ...new Set(
              Array(getRandomInt(1, MAX_CATEGORIES_NUMBER))
              .fill()
              .map(() => categories[getRandomInt(0, categories.length - 1)])
          ),
        ],
      };
    });

const run = async (args) => {
  const notesNum = +args[0] || DEFAULT_NOTES_NUMBER;

  if (notesNum > MAX_NOTES_NUMBER) {
    console.error(chalk.red(`Can't be more than ${MAX_NOTES_NUMBER} notes`));
    process.exit(ExitCode.ERROR);
  }

  const [categories, sentences, titles] = await Promise.all([
    readContentByLines(CATEGORIES_PATH),
    readContentByLines(SENTENCES_PATH),
    readContentByLines(TITLES_PATH),
  ]);

  const content = JSON.stringify(
      getNotes(notesNum, categories, sentences, titles)
  );

  writeContent(MOCKS_FILE_NAME, content);
};

module.exports = {
  name: `--generate`,
  run,
};
