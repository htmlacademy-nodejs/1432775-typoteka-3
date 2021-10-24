"use strict";

const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle} = require(`../../../utils/util`);

const COMMENT_ID_SIZE = 10;
const MAX_COMMENTS_NUMBER = 10;
const MAX_SENTENCES_IN_COMMENT = 5;

const getCommentText = (sentences) => {
  return shuffle(sentences)
    .slice(0, getRandomInt(1, MAX_SENTENCES_IN_COMMENT))
    .join(` `);
};

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

module.exports = getMockComments;
