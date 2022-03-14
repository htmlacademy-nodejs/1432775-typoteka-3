"use strict";

const Joi = require(`joi`);

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(1),
  articleId: Joi.number().integer().min(1),
  commentId: Joi.number().integer().min(1),
});

module.exports = paramsSchema;
