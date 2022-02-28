"use strict";

const {Cookie} = require(`../../utils/cookie`);
const {api} = require(`../api`);
const {UnauthorizedErr} = require(`../../utils/exceptions`);

module.exports = (...allowedRoles) => (req, res, next) => {
  const accessToken = req.cookies[Cookie.ACCESS_TOKEN];
  const refreshToken = req.cookies[Cookie.REFRESH_TOKEN];

  if (!accessToken) {
    next(new UnauthorizedErr());
  }

  if (allowedRoles.length) {
    const user = req.cookies[Cookie.USER];
    const userRoles = user.roles;

    const isAllowed = userRoles.every((role) =>
      allowedRoles.includes(role.name)
    );

    if (!isAllowed) {
      next(new UnauthorizedErr());
    }
  }

  api.prepareRequest({accessToken, refreshToken}, res);
  next();
};
