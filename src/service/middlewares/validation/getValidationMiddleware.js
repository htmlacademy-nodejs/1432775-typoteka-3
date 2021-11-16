"use strict";

const {StatusCode} = require(`../../../const`);

const getValidationMiddleware = (schema, cb) => (req, res, next) => {
  const {error} = schema.validate(req.body);

  if (error) {
    return res.status(StatusCode.BAD_REQUEST).send(`Bad request: ${error.message}`);
  }

  if (cb) {
    cb(req, res, schema);
  }

  return next();
};

module.exports = getValidationMiddleware;
