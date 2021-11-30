"use strict";

const {Router} = require(`express`);

const {readContent, readContentByLines} = require(`../../utils/fs`);
const {
  NOTE_ID_SIZE,
  COMMENT_ID_SIZE,
  MOCK_NOTES_FILE_NAME,
  MOCK_COMMENTS_FILE_NAME,
  FAKE_DATA_PATH,
  MOCK_CATEGORIES_FILE_NAME,
} = require(`../../const`);

const articles = require(`./articles`);
const categories = require(`./categories`);
const search = require(`./search`);
const my = require(`./my`);

const NoteService = require(`../data-service/NotesService`);
const CommentService = require(`../data-service/CommentsService`);
const DataService = require(`../data-service`);

const app = new Router();

(async () => {
  const [mockNotes, mockComments, possibleCategories] = await Promise.all([
    readContent(MOCK_NOTES_FILE_NAME),
    readContent(MOCK_COMMENTS_FILE_NAME),
    readContentByLines(FAKE_DATA_PATH + MOCK_CATEGORIES_FILE_NAME),
  ]);

  const noteService = new NoteService(mockNotes, NOTE_ID_SIZE);
  const commentService = new CommentService(
      mockComments,
      COMMENT_ID_SIZE,
      noteService
  );
  const categoriesService = new DataService(possibleCategories, 0);

  articles(app, noteService, commentService);
  categories(app, categoriesService);
  search(app, noteService);
  my(app, commentService);
})();

module.exports = app;
