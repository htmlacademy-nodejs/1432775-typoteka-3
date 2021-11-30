"use strict";

const {getLogger} = require(`../../utils/logger`);

const logger = getLogger({name: `request`});

module.exports = (req, res, next) => {
  logger.debug(`Request on route: ${req.url}`);

  res.on(`finish`, () => {
    logger.info(`Request status code: ${res.statusCode}`);
  });

  next();
};
