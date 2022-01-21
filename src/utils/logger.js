"use strict";

const pino = require(`pino`);
const {Env, LogPath} = require(`../const`);

const isProd = process.env.NODE_ENV === Env.PRODUCTION;
const logLevel = isProd ? `error` : `debug`;

const prettyTransport = {
  target: `pino-pretty`,
};

const fileTransport = {
  target: `pino/file`,
  options: {
    destination: LogPath.API,
  },
};

const frontFileTransport = {
  target: `pino/file`,
  options: {
    destination: LogPath.FRONT,
  },
};

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || logLevel,
  transport: isProd ? fileTransport : prettyTransport,
});

const frontLogger = pino({
  name: `front-base-logger`,
  level: process.env.LOG_LEVEL || logLevel,
  transport: isProd ? frontFileTransport : prettyTransport,
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
  frontLogger,
  getFrontLogger(options = {}) {
    return frontLogger.child(options);
  },
};
