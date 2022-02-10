"use strict";

const {StatusCode} = require(`../../../const`);

const validateBody = (schema, cb) => (req, res, next) => {
  const {error, value} = schema.validate(req.body, {abortEarly: false});

  if (error) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  req.body = value;

  if (cb) {
    cb(req, res, schema);
  }

  return next();
};

module.exports = validateBody;
