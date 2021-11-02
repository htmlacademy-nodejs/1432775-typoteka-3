"use strict";

const pino = require(`pino`);
const {Env, LOGS_FILE_PATH} = require(`../../const`);

const isDev = process.env.NODE_ENV === Env.DEVELOPMENT;
const logLevel = isDev ? `debug` : `error`;

const prettyTransport = {
  target: `pino-pretty`,
};

const fileTransport = {
  target: `pino/file`,
  options: {
    destination: LOGS_FILE_PATH
  }
};

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || logLevel,
  transport: isDev ? prettyTransport : fileTransport,
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
};
