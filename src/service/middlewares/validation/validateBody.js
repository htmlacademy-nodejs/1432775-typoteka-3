"use strict";

const {StatusCode} = require(`../../../const`);

const validateBody = (schema, cb) => async (req, res, next) => {
  const {error, value} = await schema.validateAsync(req.body, {abortEarly: false});

  if (error) {
    console.log(`error in validate body!!!`);
    return res
      .status(StatusCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  req.body = value;

  if (cb) {
    await cb(req, res, schema);
  }

  return next();
};

module.exports = validateBody;
