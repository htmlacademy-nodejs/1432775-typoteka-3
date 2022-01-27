"use strict";

const Joi = require(`joi`);
const messages = require(`./validationMessages`);

const Field = {
  TITLE: `Заголовок`,
  CATEGORIES: `Категории`,
  ANNOUNNCE: `Анонс`,
  FULL_TEXT: `Текст статьи`,
};

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

const noteSchema = Joi.object({
  title: Joi.string()
    .min(NoteTitleLength.MIN)
    .max(NoteTitleLength.MAX)
    .trim()
    .required()
    .messages({
      "string.min": messages.string.min(Field.TITLE, NoteTitleLength.MIN),
      "string.max": messages.string.max(Field.TITLE, NoteTitleLength.MAX),
      "any.required": messages.any.required(Field.TITLE),
    }),
  createdAt: Joi.date().iso().required(),
  categories: Joi.array()
    .items(Joi.number().integer().positive())
    .min(NOTE_MIN_CATEGORIES_NUMBER)
    .required()
    .messages({
      "array.min": messages.array.min(Field.CATEGORIES, NOTE_MIN_CATEGORIES_NUMBER),
      "any.required": messages.any.required(Field.CATEGORIES),
    }),
  announce: Joi.string()
    .min(NoteAnnounceLength.MIN)
    .max(NoteAnnounceLength.MAX)
    .trim()
    .required()
    .messages({
      "string.min": messages.string.min(
          Field.ANNOUNNCE,
          NoteAnnounceLength.MIN
      ),
      "string.max": messages.string.max(
          Field.ANNOUNNCE,
          NoteAnnounceLength.Max
      ),
      "any.required": messages.any.required(Field.ANNOUNNCE),
    }),
  fullText: Joi.string()
    .max(NOTE_MAX_FULL_TEXT_LENGTH)
    .trim()
    .messages({
      "string.max": messages.string.max(Field.FULL_TEXT, NoteTitleLength.MAX),
    }),
  photo: Joi.object({
    name: Joi.string(),
    uniqueName: Joi.string(),
  }),
});

const noteUpdateSchema = Joi.object({
  title: Joi.string()
    .min(NoteTitleLength.MIN)
    .max(NoteTitleLength.MAX)
    .trim()
    .messages({
      "string.min": messages.string.min(Field.TITLE, NoteTitleLength.MIN),
      "string.max": messages.string.max(Field.TITLE, NoteTitleLength.MAX),
    }),
  createdAt: Joi.date().iso(),
  categories: Joi.array()
    .items(Joi.number().integer().positive())
    .min(NOTE_MIN_CATEGORIES_NUMBER)
    .messages({
      "array.min": messages.array.min(Field.CATEGORIES),
    }),
  announce: Joi.string()
    .min(NoteAnnounceLength.MIN)
    .max(NoteAnnounceLength.MAX)
    .trim()
    .messages({
      "string.min": messages.string.min(
          Field.ANNOUNNCE,
          NoteAnnounceLength.MIN
      ),
      "string.max": messages.string.max(
          Field.ANNOUNNCE,
          NoteAnnounceLength.Max
      ),
    }),
  fullText: Joi.string()
    .max(NOTE_MAX_FULL_TEXT_LENGTH)
    .trim()
    .messages({
      "string.max": messages.string.max(Field.FULL_TEXT, NoteTitleLength.MAX),
    }),
  photo: Joi.object({
    name: Joi.string(),
    uniqueName: Joi.string(),
  }),
});

module.exports = {
  noteSchema,
  noteUpdateSchema,
};
