"use strict";

const {StatusCode} = require(`../../../const`);
const paramsSchema = require(`../../validation-schemas/params`);

module.exports = async (req, res, next) => {
  try {
    await paramsSchema.validateAsync(req.params);
  } catch (error) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
