/* eslint-disable consistent-return */
"use strict";

const {StatusCode} = require(`../../const`);
const jwt = require(`../../utils/jwt`);

module.exports =
  (...allowedRoles) =>
    (req, res, next) => {
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

      if (allowedRoles.length) {
        const userRoles = res.user.roles;
        const isAllowed = userRoles.every((role) =>
          allowedRoles.includes(role.name)
        );

        if (!isAllowed) {
          return res.sendStatus(StatusCode.FORBIDDEN);
        }
      }

      next();
    };
