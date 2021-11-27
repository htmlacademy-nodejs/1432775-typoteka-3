"use strict";

const {Router} = require(`express`);
const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, noteService) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {query} = req.query;

    if (!query.trim().length) {
      return res.status(StatusCode.BAD_REQUEST).send(`search query cann't be empty`);
    }

    const foundNotes = noteService.search(query);
    return res.status(StatusCode.OK).json(foundNotes);
  });
};
