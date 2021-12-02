"use strict";

const Sequelize = require(`sequelize`);
const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: `postgres`,
  pool: {
    min: 0,
    max: 5,
    acquire: 10000,
    idle: 10000
  }
});
