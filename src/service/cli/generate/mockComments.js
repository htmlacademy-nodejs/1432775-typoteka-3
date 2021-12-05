"use strict";

const {getRandomInt, shuffle, getRandomDate} = require(`../../../utils/util`);

const MAX_SENTENCES_IN_COMMENT = 5;
const AVERAGE_COMMENTS_FOR_NOTE = 5;
const MAX_MONTHS_AGO_CREATED = 3;

const getCommentText = (sentences) => {
  return shuffle(sentences)
    .slice(0, getRandomInt(1, MAX_SENTENCES_IN_COMMENT))
    .join(` `);
};

const getCommentCreationDate = getRandomDate.bind(
    null,
    3600000 * 24 * 30 * MAX_MONTHS_AGO_CREATED
);

const getDbComments = (notesNumber, usersNumber, sentences) => {
  const commentsNumber = AVERAGE_COMMENTS_FOR_NOTE * notesNumber;

  return Array(commentsNumber)
    .fill()
    .map((_, i) => ({
      id: i,
      text: getCommentText(sentences),
      createdAt: getCommentCreationDate().toISOString(),
      userId: getRandomInt(0, usersNumber - 1),
      articleId: getRandomInt(0, notesNumber - 1),
    }));
};

module.exports = {getDbComments};
