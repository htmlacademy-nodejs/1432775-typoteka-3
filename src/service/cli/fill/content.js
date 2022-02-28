"use strict";

const {getSQLStringFromArray} = require(`../../../utils/util`);

module.exports = ({
  comments,
  notes,
  photos,
  categories,
  notesCategories,
  users,
  roles,
}) =>
  `ALTER TABLE categories DISABLE TRIGGER ALL;
INSERT INTO categories (name) VALUES
${getSQLStringFromArray(categories)};
ALTER TABLE categories ENABLE TRIGGER ALL;

ALTER TABLE users DISABLE TRIGGER ALL;
INSERT INTO users (avatar, firstName, lastName, email, passwordHash) VALUES
${getSQLStringFromArray(users)};
ALTER TABLE users ENABLE TRIGGER ALL;

ALTER TABLE roles DISABLE TRIGGER ALL;
INSERT INTO roles (name) VALUES
${getSQLStringFromArray(roles)};
ALTER TABLE roles ENABLE TRIGGER ALL;

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles (title, createdAt, announce, fullText, userId) VALUES
${getSQLStringFromArray(notes)};
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE photos DISABLE TRIGGER ALL;
INSERT INTO photos (name, uniqueName, articleId) VALUES
${getSQLStringFromArray(photos)};
ALTER TABLE photos ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments (text, createdAt, userId, articleId) VALUES
${getSQLStringFromArray(comments)};
ALTER TABLE comments ENABLE TRIGGER ALL;

ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories (articleId, categoryId) VALUES
${getSQLStringFromArray(notesCategories)};
ALTER TABLE articles_categories ENABLE TRIGGER ALL;`;
