"use strict";

const {Router} = require(`express`);
const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, usersService) => {
  app.use(`/users`, route);

  
};
