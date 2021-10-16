"use strict";

const chalk = require(`chalk`);

const {readContentByLines, writeToTextFile} = require(`../../../utils/fs`);
const {MOCKS_FILE_NAME, FAKE_DATA_PATH} = require(`../../../const`);
const getMockNotes = require(`./mockNotes`);

const DEFAULT_NOTES_NUMBER = 1;
const MAX_NOTES_NUMBER = 1000;

const SENTENCES_PATH = FAKE_DATA_PATH + `sentences.txt`;
const TITLES_PATH = FAKE_DATA_PATH + `titles.txt`;
const CATEGORIES_PATH = FAKE_DATA_PATH + `categories.txt`;

const run = async (args) => {
  const notesNum = +args[0] || DEFAULT_NOTES_NUMBER;

  if (notesNum > MAX_NOTES_NUMBER) {
    throw new Error(chalk.red(`Can't be more than ${MAX_NOTES_NUMBER} notes`));
  }

  const [categories, sentences, titles] = await Promise.all([
    readContentByLines(CATEGORIES_PATH),
    readContentByLines(SENTENCES_PATH),
    readContentByLines(TITLES_PATH),
  ]);

  const content = getMockNotes(notesNum, categories, sentences, titles);

  await writeToTextFile(MOCKS_FILE_NAME, content);
};

module.exports = {
  name: `--generate`,
  run,
};
