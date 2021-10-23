"use strict";

const {Router} = require(`express`);

const validateNote = require(`../middlewares/validation/note`);
const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, model) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    try {
      const notes = model.findAll();
      return res.json(notes);
    } catch (err) {
      return res.send([]);
    }
  });

  route.get(`/:id`, (req, res) => {
    const {id} = req.params;
    const note = model.findOne(id);

    if (!note) {
      return res.status(StatusCode.NOT_FOUND).send(`Not Found with ${id}`);
    }

    return res.status(StatusCode.OK).json(note);
  });

  route.post(`/`, validateNote, (req, res) => {
    const newNote = model.create(req.body);

    return res.status(StatusCode.CREATED).json(newNote);
  });
};
