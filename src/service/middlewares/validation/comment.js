"use strict";

const Joi = require(`joi`);
const messages = require(`./messages`);

const Field = {
  TEXT: `Текст комментария`,
};

const CommentLength = {
  MIN: 20,
  MAX: 1000,
};

const commentSchema = Joi.object({
  text: Joi.string()
    .min(CommentLength.MIN)
    .max(CommentLength.MAX)
    .required()
    .messages({
      "string.min": messages.string.min(Field.TEXT, CommentLength.MIN),
      "string.max": messages.string.max(Field.TEXT, CommentLength.MAX),
      "any.required": messages.any.required(Field.TEXT),
    }),
});

module.exports = {
  commentSchema,
};
