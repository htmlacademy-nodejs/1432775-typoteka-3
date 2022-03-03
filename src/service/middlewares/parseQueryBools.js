"use strict";

module.exports = (req, _res, next) => {
  const {query} = req;
  Object.keys(query).map((key) => {
    let value = query[key];
    const isBool = value === `true` || value === `false`;
    if (isBool) {
      req.query[key] = value === `true`;
    }
  });
  next();
};
