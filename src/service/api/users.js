"use strict";

const {Router} = require(`express`);
const {StatusCode} = require(`../../const`);
const validateNewUser = require(`../middlewares/validation/validateNewUser`);

const route = new Router();

module.exports = (app, usersService) => {
  app.use(`/users`, route);

  route.post(`/`, validateNewUser(usersService), async (req, res) => {
    const isUserCreated = !!(await usersService.create(req.body));
    return res.status(StatusCode.CREATED).send(isUserCreated);
  });
};
