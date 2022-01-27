"use strict";

const Joi = require(`joi`);
const messages = require(`./messages`);

const Field = {
  NAME: `Название категории`,
};

const CategoryNameLength = {
  MIN: 5,
  MAX: 30,
};

const newCategorySchema = Joi.object({
  name: Joi.string()
    .min(CategoryNameLength.MIN)
    .max(CategoryNameLength.MAX)
    .required()
    .messages({
      "string.min": messages.string.min(Field.NAME, CategoryNameLength.MIN),
      "string.max": messages.string.max(Field.NAME, CategoryNameLength.MAX),
      "any.required": messages.any.required(Field.NAME),
    }),
});

module.exports = {
  newCategorySchema,
};
