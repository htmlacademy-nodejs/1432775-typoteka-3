"use strict";

const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle} = require(`../../../utils/util`);
const getMockComments = require(`./mockComments`);

const NOTE_ID_SIZE = 10;
const MAX_MONTHS_AGO_CREATED = 3;
const MAX_ANNOUNCE_SENTENCES = 5;
const MAX_FULL_TEXT_SENTENCES = 10;
const MAX_CATEGORIES_NUMBER = 5;

const getRandomNoteTitle = (titles) =>
  titles[getRandomInt(0, titles.length - 1)];

const getRandomNoteAnnounce = (sentences) =>
  shuffle(sentences)
    .slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCES))
    .join(` `);

const getRandomNoteFullText = (sentences) =>
  shuffle(sentences)
    .slice(0, getRandomInt(1, MAX_FULL_TEXT_SENTENCES))
    .join(` `);

const getRandomNoteCategory = (categories) => [
  ...new Set(
      Array(getRandomInt(1, MAX_CATEGORIES_NUMBER))
      .fill()
      .map(() => categories[getRandomInt(0, categories.length - 1)])
  ),
];

const getRandomNoteCreationDate = () => {
  const currentDate = +new Date();
  const minCreationData =
    currentDate - 3600000 * 24 * 30 * MAX_MONTHS_AGO_CREATED;
  return new Date(getRandomInt(minCreationData, currentDate));
};

const getMockNotes = (notesNum, categories, sentences, titles, commentSentences) =>
  Array(notesNum)
    .fill()
    .map(() => ({
      id: nanoid(NOTE_ID_SIZE),
      title: getRandomNoteTitle(titles),
      createdDate: getRandomNoteCreationDate(),
      announce: getRandomNoteAnnounce(sentences),
      fullText: getRandomNoteFullText(sentences),
      сategory: getRandomNoteCategory(categories),
      comments: getMockComments(commentSentences),
    }));

module.exports = getMockNotes;
