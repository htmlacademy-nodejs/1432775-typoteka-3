"use strict";

const chalk = require(`chalk`);

const {readContentByLines, writeToTextFile} = require(`../../../utils/fs`);
const {
  MockСomprisingPath,
  FILL_DB_QUERY_FILE_NAME,
  Role,
} = require(`../../../const`);
const {getDbFillData} = require(`../generate/mock-notes`);
const getFillContent = require(`./content`);

const DEFAULT_NOTES_NUMBER = 10;
const MAX_NOTES_NUMBER = 1000;

const run = async (args) => {
  const notesNum = +args[0] || DEFAULT_NOTES_NUMBER;

  if (notesNum > MAX_NOTES_NUMBER) {
    throw new Error(chalk.red(`Can't be more than ${MAX_NOTES_NUMBER} notes`));
  }

  const [
    possibleCategories,
    sentences,
    titles,
    commentSentences,
    possiblePhotos,
    names,
  ] = await Promise.all([
    readContentByLines(MockСomprisingPath.CATEGORIES),
    readContentByLines(MockСomprisingPath.SENTENCES),
    readContentByLines(MockСomprisingPath.TITLES),
    readContentByLines(MockСomprisingPath.COMMENT_SENTENCES),
    readContentByLines(MockСomprisingPath.PHOTOS),
    readContentByLines(MockСomprisingPath.NAMES),
  ]);

  const fillDbQueryData = getDbFillData(notesNum, {
    possibleCategories,
    sentences,
    titles,
    commentSentences,
    possiblePhotos,
    names,
    possibleRoles: Object.values(Role),
  });

  const content = getFillContent(fillDbQueryData);

  await writeToTextFile(FILL_DB_QUERY_FILE_NAME, content, {isJSON: false});
};

module.exports = {
  name: `--fill`,
  run,
};
