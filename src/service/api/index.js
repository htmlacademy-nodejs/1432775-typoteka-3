"use strict";

const {Router} = require(`express`);

const {sequelize} = require(`../../utils/sequelize`);
const defineModels = require(`../models/define-models`);

const articles = require(`./articles`);
const categories = require(`./categories`);
const search = require(`./search`);
const my = require(`./my`);
const comments = require(`./comments`);
const users = require(`./users`);

const NoteService = require(`../data-service/notes-service`);
const CommentService = require(`../data-service/comments-service`);
const CategoryService = require(`../data-service/category`);
const SearchService = require(`../data-service/search-service`);
const UsersService = require(`../data-service/user`);
const TokensService = require(`../data-service/token`);

const app = new Router();

defineModels(sequelize);

(async () => {
  const noteService = new NoteService(sequelize);
  const commentService = new CommentService(sequelize);
  const categoriesService = new CategoryService(sequelize);
  const searchService = new SearchService(sequelize);
  const usersService = new UsersService(sequelize);
  const tokensService = new TokensService(sequelize);

  articles(app, noteService, commentService, categoriesService);
  categories(app, categoriesService);
  search(app, searchService);
  my(app, commentService, noteService);
  comments(app, commentService);
  users(app, usersService, tokensService);
})();

module.exports = app;
