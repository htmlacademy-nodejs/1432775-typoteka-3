"use strict";

const {Cookie} = require(`../../utils/cookie`);

module.exports = (req, res, next) => {
  res.user = req.cookies[Cookie.USER];
  next();
};
