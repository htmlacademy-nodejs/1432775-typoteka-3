"use strict";

const {Router} = require(`express`);
const asyncHandler = require(`../middlewares/asyncHandler`);

const {api} = require(`../api`);

const searchRouter = new Router();

searchRouter.get(`/`, asyncHandler(async (req, res) => {
  const {query} = req.query;

  let found = [];

  if (query && query.trim().length) {
    found = await api.search(query);
  }

  res.render(`search`, {found, query, user: res.user});
}));

module.exports = searchRouter;
