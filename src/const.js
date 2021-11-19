"use strict";

exports.FRONT_DEFAULT_PORT = 8080;
exports.TIMEOUT = 10000;

exports.BACK_DEFAULT_PORT = 3000;
exports.DEFAULT_COMMAND = `--help`;

exports.Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

exports.ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

exports.StatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

exports.UPLOAD_DIR = `upload`;
exports.PUBLIC_DIR = `public`;

exports.LOGS_FILE_PATH = `./logs/apiLogs.log`;
exports.FRONT_LOGS_FILE_PATH = `./logs/frontLogs.log`;

exports.MOCK_NOTES_FILE_NAME = `notes.json`;
exports.MOCK_COMMENTS_FILE_NAME = `comments.json`;
exports.FAKE_DATA_PATH = `data/`;

exports.MOCK_NOTE_SENTENCES_FILE_NAME = `sentences.txt`;
exports.MOCK_TITLES_FILE_NAME = `titles.txt`;
exports.MOCK_CATEGORIES_FILE_NAME = `categories.txt`;
exports.MOCK_COMMENT_SENTENCES_FILE_NAME = `commentSentences.txt`;
exports.MOCK_PHOTOS_FILE_NAME = `photos.txt`;

exports.NOTE_ID_SIZE = 10;
exports.COMMENT_ID_SIZE = 10;
