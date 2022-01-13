"use strict";

const Joi = require(`joi`);

const getValidationMeddleware = require(`./getValidationMiddleware`);

const CategoryNameLength = {
  MIN: 5,
  MAX: 30,
};

const newCategoryStructure = {
  name: Joi.string().min(CategoryNameLength.MIN).max(CategoryNameLength.MAX).required(),
};

const validateNewCategory = getValidationMeddleware(
    Joi.object(newCategoryStructure)
);

module.exports = {
  validateNewCategory,
};
