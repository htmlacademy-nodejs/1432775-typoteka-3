"use strict";

const {Cookie} = require(`../../const`);
const {api} = require(`../api`);

module.exports = (req, res, next) => {
  const accessToken = req.cookies[Cookie.ACCESS_TOKEN];
  const refreshToken = req.cookies[Cookie.REFRESH_TOKEN];
  api.prepareRequest({accessToken, refreshToken}, res);
  next();
};
