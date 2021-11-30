"use strict";

const chalk = require(`chalk`);

const {readContentByLines, writeToTextFile} = require(`../../../utils/fs`);
const {
  MOCK_NOTES_FILE_NAME,
  MOCK_COMMENTS_FILE_NAME,
  FAKE_DATA_PATH,
  MOCK_TITLES_FILE_NAME,
  MOCK_CATEGORIES_FILE_NAME,
  MOCK_COMMENT_SENTENCES_FILE_NAME,
  MOCK_NOTE_SENTENCES_FILE_NAME,
  MOCK_PHOTOS_FILE_NAME,
} = require(`../../../const`);
const getMockData = require(`./mockNotes`);

const DEFAULT_NOTES_NUMBER = 1;
const MAX_NOTES_NUMBER = 1000;

const SENTENCES_PATH = FAKE_DATA_PATH + MOCK_NOTE_SENTENCES_FILE_NAME;
const TITLES_PATH = FAKE_DATA_PATH + MOCK_TITLES_FILE_NAME;
const CATEGORIES_PATH = FAKE_DATA_PATH + MOCK_CATEGORIES_FILE_NAME;
const COMMENT_SENTENCES_PATH =
  FAKE_DATA_PATH + MOCK_COMMENT_SENTENCES_FILE_NAME;
const PHOTOS_PATH = FAKE_DATA_PATH + MOCK_PHOTOS_FILE_NAME;

const run = async (args) => {
  const notesNum = +args[0] || DEFAULT_NOTES_NUMBER;

  if (notesNum > MAX_NOTES_NUMBER) {
    throw new Error(chalk.red(`Can't be more than ${MAX_NOTES_NUMBER} notes`));
  }

  const dataForGeneration = await Promise.all([
    readContentByLines(CATEGORIES_PATH),
    readContentByLines(SENTENCES_PATH),
    readContentByLines(TITLES_PATH),
    readContentByLines(COMMENT_SENTENCES_PATH),
    readContentByLines(PHOTOS_PATH),
  ]);

  const {notes, comments} = getMockData(
      notesNum,
      ...dataForGeneration
  );

  await Promise.all([
    writeToTextFile(MOCK_NOTES_FILE_NAME, notes),
    writeToTextFile(MOCK_COMMENTS_FILE_NAME, comments),
  ]);
};

module.exports = {
  name: `--generate`,
  run,
};
