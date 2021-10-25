"use strict";

const Joi = require(`joi`);

const getValidationMeddleware = require(`./getValidationMiddleware`);

const CommentLength = {
  MIN: 20,
  MAX: 1000,
};

const commentStructure = {
  text: Joi.string().min(CommentLength.MIN).max(CommentLength.MAX).required(),
};

const validateNewComment = getValidationMeddleware(
    Joi.object(commentStructure)
);

module.exports = {
  validateNewComment,
};
