"use strict";

const {Router} = require(`express`);

const sequelize = require(`../../utils/sequelize`);
const defineModels = require(`../models`);

const articles = require(`./articles`);
const categories = require(`./categories`);
const search = require(`./search`);
const my = require(`./my`);
const comments = require(`./comments`);

const NoteService = require(`../data-service/NotesService`);
const CommentService = require(`../data-service/CommentsService`);
const CategoryService = require(`../data-service/Category`);
const SearchService = require(`../data-service/SearchService`);

const app = new Router();

defineModels(sequelize);

(async () => {
  const noteService = new NoteService(sequelize);
  const commentService = new CommentService(sequelize);
  const categoriesService = new CategoryService(sequelize);
  const searchService = new SearchService(sequelize);

  articles(app, noteService, commentService, categoriesService);
  categories(app, categoriesService);
  search(app, searchService);
  my(app, commentService, noteService);
  comments(app, commentService);
})();

module.exports = app;
