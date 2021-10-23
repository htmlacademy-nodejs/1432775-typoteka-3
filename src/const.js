"use strict";

exports.FRONT_PORT = 8080;
exports.DEFAULT_COMMAND = `--help`;

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

exports.MOCKS_FILE_NAME = `mock.json`;
exports.FAKE_DATA_PATH = `data/`;

exports.NOTE_ID_SIZE = 10;
