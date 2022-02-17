/* eslint-disable consistent-return */
"use strict";

const {StatusCode} = require(`../../const`);
const jwt = require(`../../utils/jwt`);

module.exports = (req, res, next) => {
  const authorization = req.headers[`authorization`];

  if (!authorization) {
    return res.sendStatus(StatusCode.UNAUTHORIZED);
  }

  const [, token] = authorization.split(` `);

  if (!token) {
    return res.sendStatus(StatusCode.UNAUTHORIZED);
  }

  try {
    res.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (e) {
    return res.sendStatus(StatusCode.TOKEN_REFRESH);
  }

  next();
};
