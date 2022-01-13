"use strict";

const {Router} = require(`express`);

const {
  validateNewNote,
  validateNoteUpdate,
} = require(`../middlewares/validation/note`);
const {validateNewComment} = require(`../middlewares/validation/comment`);
const {validateNewCategory} = require(`../middlewares/validation/category`);
const checkExistance = require(`../middlewares/checkExistance`);

const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, notesService, commentsService, categoriesService) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const {
      commentsNumber,
      mostCommented,
      comments,
      offset,
      limit,
      fromCategoryId,
    } = req.query;
    const notes = await notesService.findAll({
      commentsNumber,
      mostCommented,
      comments,
      offset,
      limit,
      fromCategoryId,
    });
    return res.status(StatusCode.OK).json(notes);
  });

  route.post(`/`, validateNewNote, async (req, res) => {
    const newNote = await notesService.create(req.body);
    return res.status(StatusCode.CREATED).json(newNote);
  });

  route.get(`/:id`, checkExistance(notesService), (_req, res) => {
    const note = res.locals.foundItem;
    return res.status(StatusCode.OK).json(note);
  });

  route.put(
      `/:id`,
      [checkExistance(notesService), validateNoteUpdate],
      async (req, res) => {
        const {id} = req.params;
        const updatedNote = await notesService.update(id, req.body);
        return res.status(StatusCode.OK).json(updatedNote);
      }
  );

  route.delete(`/:id`, async (req, res) => {
    const {id} = req.params;
    const deletedNote = await notesService.drop(id);
    return res.status(StatusCode.OK).json(deletedNote);
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

  route.delete(`/:articleId/comments/:commentId`, async (req, res) => {
    const {commentId, articleId} = req.params;
    const deletedComment = await commentsService.drop(commentId, articleId);
    return res.status(StatusCode.OK).json(deletedComment);
  });

  route.get(`/:articleId/categories`, async (req, res) => {
    const {articleId} = req.params;
    const articleCategories = await categoriesService.findAll({
      where: {articleId},
    });
    return res.status(StatusCode.OK).json(articleCategories);
  });

  route.post(
      `/:articleId/categories`,
      validateNewCategory,
      async (req, res) => {
        const {articleId} = req.params;
        const newCategory = await categoriesService.create(
            articleId,
            req.body
        );
        return res.status(StatusCode.CREATED).json(newCategory);
      }
  );
};
