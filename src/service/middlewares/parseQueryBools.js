"use strict";

module.exports = (req, res, next) => {
  const {query} = req;
  Object.keys(query).map((key) => {
    let value = query[key];
    const isBool = value === `true` || value === `false`;
    if (isBool) {
      value = value === `true`;
    }
  });
  next();
};
