"use strict";

const jwt = require(`jsonwebtoken`);

const TokenExpires = {
  ACCESS: `15m`,
  REFRESH: `30d`,
};

module.exports = {
  createAccess: (payload) =>
    jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: TokenExpires.ACCESS,
    }),

  createRefresh: (payload) =>
    jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: TokenExpires.REFRESH,
    }),

  verify: jwt.verify,
};
