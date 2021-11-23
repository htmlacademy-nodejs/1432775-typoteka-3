"use strict";

const {getSQLStringFromArray} = require(`../../../utils/util`);

module.exports = ({
  comments,
  notes,
  photos,
  categories,
  notesCategories,
  users,
}) =>
  `ALTER TABLE categories DISABLE TRIGGER ALL;
INSERT INTO categories VALUES
${getSQLStringFromArray(categories)};
ALTER TABLE categories ENABLE TRIGGER ALL;

ALTER TABLE users DISABLE TRIGGER ALL;
INSERT INTO users VALUES
${getSQLStringFromArray(users)};
ALTER TABLE users ENABLE TRIGGER ALL;

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles VALUES
${getSQLStringFromArray(notes)};
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE photos DISABLE TRIGGER ALL;
INSERT INTO photos VALUES
${getSQLStringFromArray(photos)};
ALTER TABLE photos ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments VALUES
${getSQLStringFromArray(comments)};
ALTER TABLE comments ENABLE TRIGGER ALL;

ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories VALUES
${getSQLStringFromArray(notesCategories)};
ALTER TABLE articles_categories ENABLE TRIGGER ALL;`;
