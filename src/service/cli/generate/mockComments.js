"use strict";

const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle, getRandomDate} = require(`../../../utils/util`);

const COMMENT_ID_SIZE = 10;
const MAX_COMMENTS_NUMBER = 10;
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

const getMockComments = (sentences, comments, noteId) => {
  const ids = Array(getRandomInt(1, MAX_COMMENTS_NUMBER))
    .fill()
    .map(() => nanoid(COMMENT_ID_SIZE));

  ids.forEach((id) =>
    comments.push({
      id,
      noteId,
      text: getCommentText(sentences),
    })
  );

  return ids;
};

const getDbComments = (notesNumber, usersNumber, sentences) => {
  const commentsNumber = AVERAGE_COMMENTS_FOR_NOTE * notesNumber;

  return Array(commentsNumber)
    .fill()
    .map((_, i) => ({
      id: i,
      text: getCommentText(sentences),
      createdDate: getCommentCreationDate().toISOString(),
      userId: getRandomInt(0, usersNumber - 1),
      articleId: getRandomInt(0, notesNumber - 1),
    }));
};

module.exports = {getMockComments, getDbComments};
