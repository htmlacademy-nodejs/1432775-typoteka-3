"use strict";

const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle} = require(`../../../utils/util`);

const COMMENT_ID_SIZE = 10;
const MAX_COMMENTS_NUMBER = 10;
const MAX_SENTENCES_IN_COMMENT = 5;

const getCommentText = (sentences) => {
  return shuffle(sentences).slice(0, getRandomInt(1, MAX_SENTENCES_IN_COMMENT));
};

const getMockComments = (sentences) =>
  Array(getRandomInt(1, MAX_COMMENTS_NUMBER))
    .fill()
    .map(() => ({
      id: nanoid(COMMENT_ID_SIZE),
      text: getCommentText(sentences),
    }));

module.exports = getMockComments;
