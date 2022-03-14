"use strict";

const {getRandomInt, shuffle, getRandomDate} = require(`../../../utils/util`);
const {getDbComments} = require(`./mock-comments`);
const getMockUsers = require(`./mock-users`);
const getCategories = require(`./categories`);
const getRoles = require(`./roles`);

const MAX_MONTHS_AGO_CREATED = 3;
const MAX_ANNOUNCE_SENTENCES = 2;
const MAX_FULL_TEXT_SENTENCES = 10;
const MAX_CATEGORIES_NUMBER = 5;
const AVERAGE_NOTES_FROM_USER = 3;

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

const getRandomNoteCategory = (categories) => {
  return [
    ...new Set(
        Array(getRandomInt(1, MAX_CATEGORIES_NUMBER))
        .fill()
        .map(() => {
          return getRandomInt(1, categories.length);
        })
    ),
  ];
};

const getRandomNoteCreationDate = getRandomDate.bind(null, 3600000 * 24 * 30 * MAX_MONTHS_AGO_CREATED);

const getRandomPhoto = (photos, photosArr, articleId) => {
  const photoName = photos[getRandomInt(0, photos.length - 1)];
  const photo = {
    name: photoName,
    uniqueName: photoName,
    articleId,
  };

  if (photosArr) {
    photosArr.push(photo);
  }

  return photo;
};

const getDbFillData = (notesNum, {possibleCategories, sentences, titles, commentSentences, possiblePhotos, names, possibleRoles}) => {
  const photos = [];

  const categories = getCategories(possibleCategories);
  const notesCategories = [];

  const usersNumber = Math.floor(notesNum / AVERAGE_NOTES_FROM_USER);
  const users = getMockUsers(usersNumber, names);

  const comments = getDbComments(notesNum, usersNumber, commentSentences);

  const roles = getRoles(possibleRoles);

  // admin role for first user
  const usersRoles = [{userId: 1, roleId: 1}];

  const notes = Array(notesNum)
    .fill()
    .map((_item, i) => {
      const isWithPhoto = Math.round(getRandomInt(0, 1));

      if (isWithPhoto) {
        getRandomPhoto(possiblePhotos, photos, i + 1);
      }

      const noteCategories = getRandomNoteCategory(categories);
      noteCategories.forEach((categoryId) => {
        notesCategories.push({
          articleId: i + 1,
          categoryId,
        });
      });

      return {
        title: getRandomNoteTitle(titles),
        createdAt: getRandomNoteCreationDate().toISOString(),
        announce: getRandomNoteAnnounce(sentences),
        fullText: getRandomNoteFullText(sentences),
        userId: 1,
      };
    });

  return {
    comments,
    notes,
    photos,
    categories,
    notesCategories,
    users,
    roles,
    usersRoles,
  };
};

module.exports = {getDbFillData};
