"use strict";

const supertest = require(`supertest`);

module.exports = (app, token) => (method, url) =>
  supertest(app)[method](url).set(`authorization`, `Bearer ${token}`);
