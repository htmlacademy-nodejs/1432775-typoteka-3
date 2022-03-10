"use strict";

const {StatusCode} = require(`../../const`);

module.exports = (service, paramName) => async (req, res, next) => {
  const id = paramName ? req.params[paramName] : req.params.id;

  const item = await service.findOne(id, req.query);

  if (!item) {
    return res.status(StatusCode.NOT_FOUND).send(`Not found with ${id}`);
  }

  res.locals.foundItem = item;
  return next();
};
