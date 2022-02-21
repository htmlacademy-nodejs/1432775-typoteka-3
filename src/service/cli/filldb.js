"use strict";

const chalk = require(`chalk`);

const {ExitCode, MockСomprisingPath, Role} = require(`../../const`);
const {getDbFillData} = require(`./generate/mockNotes`);
const {getLogger} = require(`../../utils/logger`);
const {sequelize, initdb} = require(`../../utils/sequelize`);
const {readContentByLines} = require(`../../utils/fs`);

const logger = getLogger({name: `filldb`});

const DEFAULT_NOTES_NUMBER = 10;
const MAX_NOTES_NUMBER = 1000;

const run = async (args) => {
  const notesNum = +args[0] || DEFAULT_NOTES_NUMBER;

  if (notesNum > MAX_NOTES_NUMBER) {
    throw new Error(chalk.red(`Can't be more than ${MAX_NOTES_NUMBER} notes`));
  }

  try {
    await sequelize.authenticate();
    logger.info(`Connected to DB`);
  } catch (err) {
    logger.error(`Haven't managed to connect DB: ${err.message}`);
    process.exit(ExitCode.ERROR);
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

  const {comments, notes, photos, categories, notesCategories, users, roles, usersRoles} =
    getDbFillData(notesNum, {
      possibleCategories,
      sentences,
      titles,
      commentSentences,
      possiblePhotos,
      names,
      possibleRoles: Object.values(Role),
    });

  await initdb(sequelize, {
    comments,
    notes,
    photos,
    categories,
    notesCategories,
    users,
    roles,
    usersRoles,
  });
};

module.exports = {
  name: `--filldb`,
  run,
};
