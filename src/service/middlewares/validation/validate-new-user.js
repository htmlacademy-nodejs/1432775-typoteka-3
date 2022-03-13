"use strict";

const validateBody = require(`./validate-body`);
const {newUserSchema} = require(`../../validation-schemas/user`);

const {StatusCode} = require(`../../../const`);
const {hash} = require(`../../../utils/hash`);
const errorMessages = require(`../../../utils/error-messages`);

const validateNewUser = (userService) =>
  // eslint-disable-next-line consistent-return
  validateBody(newUserSchema, async (req, res, _next) => {
    const user = await userService.findByEmail(req.body.email);

    if (user) {
      return res.status(StatusCode.BAD_REQUEST).send(errorMessages.user.userExists);
    }

    req.body.passwordHash = await hash(req.body.password);
  });
module.exports = validateNewUser;
