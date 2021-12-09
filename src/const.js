"use strict";

const FRONT_DEFAULT_PORT = 8080;
const TIMEOUT = 10000;

const BACK_DEFAULT_PORT = 3000;
const DEFAULT_COMMAND = `--help`;

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const StatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const UPLOAD_DIR = `upload`;
const PUBLIC_DIR = `public`;

const LOGS_FILE_PATH = `./logs/apiLogs.log`;
const FRONT_LOGS_FILE_PATH = `./logs/frontLogs.log`;

const MOCK_NOTES_FILE_NAME = `notes.json`;
const MOCK_COMMENTS_FILE_NAME = `comments.json`;
const FILL_DB_QUERY_FILE_NAME = `fill-db.sql`;
const FAKE_DATA_PATH = `data/`;


const MockFileName = {
  NOTE_SENTENCES: `sentences.txt`,
  TITLES: `titles.txt`,
  CATEGORIES: `categories.txt`,
  COMMENT_SENTENCES: `commentSentences.txt`,
  PHOTOS: `photos.txt`,
  NAMES: `names.txt`,
};

const MockСomprisingPath = {
  SENTENCES: FAKE_DATA_PATH + MockFileName.NOTE_SENTENCES,
  TITLES: FAKE_DATA_PATH + MockFileName.TITLES,
  CATEGORIES: FAKE_DATA_PATH + MockFileName.CATEGORIES,
  COMMENT_SENTENCES: FAKE_DATA_PATH + MockFileName.COMMENT_SENTENCES,
  PHOTOS: FAKE_DATA_PATH + MockFileName.PHOTOS,
  NAMES: FAKE_DATA_PATH + MockFileName.NAMES
};

const NOTE_ID_SIZE = 10;
const COMMENT_ID_SIZE = 10;

module.exports = {
  FRONT_DEFAULT_PORT,
  TIMEOUT,
  BACK_DEFAULT_PORT,
  DEFAULT_COMMAND,
  Env,
  ExitCode,
  StatusCode,
  UPLOAD_DIR,
  PUBLIC_DIR,
  LOGS_FILE_PATH,
  FRONT_LOGS_FILE_PATH,
  MOCK_NOTES_FILE_NAME,
  MOCK_COMMENTS_FILE_NAME,
  FILL_DB_QUERY_FILE_NAME,
  FAKE_DATA_PATH,
  MockFileName,
  MockСomprisingPath,
  NOTE_ID_SIZE,
  COMMENT_ID_SIZE,
};
