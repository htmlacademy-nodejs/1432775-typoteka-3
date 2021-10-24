"use strict";

const {Router} = require(`express`);

const {
  validateNewNote,
  validateNoteUpdate,
} = require(`../middlewares/validation/note`);
const {validateNewComment} = require(`../middlewares/validation/comment`);
const checkExistance = require(`../middlewares/checkExistance`);

const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, notesService, commentsService) => {
  app.use(`/articles`, route);

  route.get(`/`, (_req, res) => {
    const notes = notesService.findAll();
    return res.status(StatusCode.OK).json(notes);
  });

  route.post(`/`, validateNewNote, (req, res) => {
    const newNote = notesService.create(req.body);
    return res.status(StatusCode.CREATED).json(newNote);
  });

  route.get(`/:id`, checkExistance(notesService), (_req, res) => {
    const note = res.locals.foundItem;
    return res.status(StatusCode.OK).json(note);
  });

  route.put(
      `/:id`,
      [checkExistance(notesService), validateNoteUpdate],
      (req, res) => {
        const {id} = req.params;
        const updatedNote = notesService.update(id, req.body);
        return res.status(StatusCode.OK).json(updatedNote);
      }
  );

  route.delete(`/:id`, checkExistance(notesService), (req, res) => {
    const {id} = req.params;
    const deletedNote = notesService.drop(id);
    return res.status(StatusCode.OK).json(deletedNote);
  });

  route.get(`/:id/comments`, checkExistance(notesService), (req, res) => {
    const {id} = req.params;
    const comments = commentsService.findByNoteId(id);
    return res.status(StatusCode.OK).json(comments);
  });

  route.post(
      `/:id/comments`,
      [checkExistance(notesService), validateNewComment],
      (req, res) => {
        const {id} = req.params;
        const newComment = commentsService.create(req.body, id);
        return res.status(StatusCode.CREATED).json(newComment);
      }
  );

  route.delete(
      `/:noteId/comments/:commentId`,
      [
        checkExistance(notesService, `noteId`),
        checkExistance(commentsService, `commentId`),
      ],
      (req, res) => {
        const {commentId} = req.params;
        const deletedComment = commentsService.drop(commentId);
        return res.status(StatusCode.OK).json(deletedComment);
      }
  );
};
