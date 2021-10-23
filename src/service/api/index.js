"use strict";

const {Router} = require(`express`);

const getMockNotes = require(`../lib/getMockNotes`);
const {NOTE_ID_SIZE} = require(`../../const`);

const articles = require(`./articles`);

const DataService = require(`../data-service`);

const app = new Router();

(async () => {
  const mockNotes = await getMockNotes();

  const noteService = new DataService(mockNotes, NOTE_ID_SIZE);

  articles(app, noteService);
})();

module.exports = app;
