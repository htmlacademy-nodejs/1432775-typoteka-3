"use strict";

const {StatusCode} = require(`../../const`);

module.exports = (model, paramName) => (req, res, next) => {
  const id = paramName ? req.params[paramName] : req.params.id;

  const item = model.findOne(id);

  if (!item) {
    return res.status(StatusCode.NOT_FOUND).send(`Not found with ${id}`);
  }

  res.locals.foundItem = item;
  return next();
};
