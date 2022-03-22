"use strict";

// solves problem when pg converts int into string
require(`pg`).defaults.parseInt8 = true;

const Sequelize = require(`sequelize`);
const {Env} = require(`../const`);
const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} = process.env;
const defineModels = require(`../service/models/define-models`);

const initdb = async (
    sequelize,
    {categories, users, notes, photos, comments, notesCategories, roles, usersRoles = []}
) => {
  const {Article, Category, Comment, Photo, User, ArticleCategory, Role, UserRole} =
    defineModels(sequelize);
  await sequelize.sync({force: true});

  await Promise.all([
    Category.bulkCreate(categories),
    User.bulkCreate(users),
    Article.bulkCreate(notes),
    Photo.bulkCreate(photos),
    Comment.bulkCreate(comments),
    ArticleCategory.bulkCreate(notesCategories),
    Role.bulkCreate(roles),
    UserRole.bulkCreate(usersRoles)
  ]);
};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: `postgres`,
  pool: {
    min: 0,
    max: 5,
    acquire: 10000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === Env.PRODUCTION ? false : console.log,
});

module.exports = {
  sequelize,
  initdb,
};
