"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);

const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) => {
  const {query} = req.query;

  let found = [];

  if (query && query.trim().length) {
    found = await api.search(query);
  }

  res.render(`search`, {found, query});
});

module.exports = searchRouter;
