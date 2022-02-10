"use strict";

const {StatusCode} = require(`../../../const`);
const paramsSchema = require(`../../validationSchemas/params`);

module.exports = (req, res, next) => {
  const {error} = paramsSchema.validate(req.params);

  if (error) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
