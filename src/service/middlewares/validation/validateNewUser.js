"use strict";

const validateBody = require(`./validateBody`);
const {newUserSchema} = require(`../../validationSchemas/user`);

const {StatusCode} = require(`../../../const`);
const {hash} = require(`../../../utils/hash`);

const USER_EXISTS_MESSAGE = `Пользоватеьл уже существует`;

const validateNewUser = (userService) =>
  // eslint-disable-next-line consistent-return
  validateBody(newUserSchema, async (req, res, _next) => {
    const user = userService.findByEmail(req.body.email);

    if (user) {
      return res.status(StatusCode.BAD_REQUEST).send(USER_EXISTS_MESSAGE);
    }

    req.body.passwordHash = await hash(req.body.password);
  });
module.exports = validateNewUser;
