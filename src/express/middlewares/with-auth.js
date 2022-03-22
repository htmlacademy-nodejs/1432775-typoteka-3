"use strict";

const {Cookie} = require(`../../utils/cookie`);
const {api} = require(`../api`);
const {UnauthorizedError} = require(`../../utils/exceptions`);

module.exports = (...allowedRoles) => (req, res, next) => {
  const accessToken = req.cookies[Cookie.ACCESS_TOKEN];
  const refreshToken = req.cookies[Cookie.REFRESH_TOKEN];

  if (!accessToken) {
    next(new UnauthorizedError());
  }

  if (allowedRoles.length) {
    const user = req.cookies[Cookie.USER];
    const userRoles = user.roles;

    if (!userRoles.length) {
      next(new UnauthorizedError());
    }

    const isAllowed = userRoles.every((role) =>
      allowedRoles.includes(role.name)
    );

    if (!isAllowed) {
      next(new UnauthorizedError());
    }
  }

  api.prepareRequest({accessToken, refreshToken}, res);
  next();
};
