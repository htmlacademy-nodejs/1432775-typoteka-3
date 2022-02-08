"use strict";

const {StatusCode} = require(`../../../const`);

const validateBody = (schema, cb) => async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body, {abortEarly: false});
    req.body = value;
  } catch (error) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  if (cb) {
    const sendedRes = await cb(req, res, schema);
    if (sendedRes) {
      return sendedRes;
    }
  }

  return next();
};

module.exports = validateBody;
