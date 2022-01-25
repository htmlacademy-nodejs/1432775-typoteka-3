"use strict";

const Joi = require(`joi`);

const getValidationMeddleware = require(`./getValidationMiddleware`);

const NoteTitleLength = {
  MIN: 30,
  MAX: 250,
};

const NoteAnnounceLength = {
  MIN: 30,
  MAX: 250,
};

const NOTE_MAX_FULL_TEXT_LENGTH = 1000;
const NOTE_MIN_CATEGORIES_NUMBER = 1;

const noteStructure = {
  title: Joi.string()
    .min(NoteTitleLength.MIN)
    .max(NoteTitleLength.MAX)
    .trim()
    .required(),
  createdAt: Joi.date().iso().required(),
  categories: Joi.array().min(NOTE_MIN_CATEGORIES_NUMBER).required(),
  announce: Joi.string()
    .min(NoteAnnounceLength.MIN)
    .max(NoteAnnounceLength.MAX)
    .trim()
    .required(),
  fullText: Joi.string().max(NOTE_MAX_FULL_TEXT_LENGTH).trim(),
  photo: Joi.object({
    name: Joi.string(),
    uniqueName: Joi.string(),
  }),
};

const noteUpdateStructure = {
  title: Joi.string().min(NoteTitleLength.MIN).max(NoteTitleLength.MAX).trim(),
  createdAt: Joi.date().iso(),
  categories: Joi.array().min(NOTE_MIN_CATEGORIES_NUMBER),
  announce: Joi.string()
    .min(NoteAnnounceLength.MIN)
    .max(NoteAnnounceLength.MAX)
    .trim(),
  fullText: Joi.string().max(NOTE_MAX_FULL_TEXT_LENGTH).trim(),
  photo: Joi.object({
    name: Joi.string(),
    uniqueName: Joi.string(),
  }),
};

const validateNoteUpdate = getValidationMeddleware(
    Joi.object(noteUpdateStructure)
);

const validateNewNote = getValidationMeddleware(
    Joi.object(noteStructure)
);

module.exports = {
  validateNoteUpdate,
  validateNewNote,
};
