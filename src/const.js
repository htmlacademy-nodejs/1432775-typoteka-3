"use strict";

exports.DEFAULT_COMMAND = `--help`;

exports.ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

exports.StatusCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

exports.MOCKS_FILE_NAME = `mock.json`;

exports.FAKE_DATA_PATH = `data/`;
