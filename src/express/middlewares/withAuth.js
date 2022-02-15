"use strict";

const {Cookie} = require(`../../const`);
const {api} = require(`../api`);
const {UnauthorizedErr} = require(`../../utils/exceptions`);

module.exports = (req, res, next) => {
  const accessToken = req.cookies[Cookie.ACCESS_TOKEN];
  const refreshToken = req.cookies[Cookie.REFRESH_TOKEN];

  if (!accessToken) {
    next(new UnauthorizedErr());
  }

  api.prepareRequest({accessToken, refreshToken}, res);
  next();
};
