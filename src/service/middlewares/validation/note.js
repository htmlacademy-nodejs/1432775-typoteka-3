"use strict";

const Joi = require(`joi`);

const {StatusCode} = require(`../../../const`);

const noteStructure = {
  title: Joi.string().min(30).max(250).required(),
  createdDate: Joi.date().iso().required(),
  categories: Joi.array().min(1).required(),
  announce: Joi.string().min(30).max(250).required(),
  fullText: Joi.string().max(1000),
  comments: Joi.array(),
};

const noteSchema = Joi.object(noteStructure);

module.exports = (req, res, next) => {
  const note = req.body;

  const {error} = noteSchema.validate(note);

  if (error) {
    res.status(StatusCode.BAD_REQUEST).send(`Bad request: ${error.message}`);
  }

  if (!req.body.comments) {
    req.body.comments = [];
  }

  next();
};
