"use strict";

const {Router} = require(`express`);

const {
  noteSchema,
  noteUpdateSchema,
} = require(`../validationSchemas/note`);
const {commentSchema} = require(`../validationSchemas/comment`);

const validateBody = require(`../middlewares/validation/validateBody`);
const checkExistance = require(`../middlewares/checkExistance`);
const validateParams = require(`../middlewares/validation/validateParams`);

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
      needCount,
    } = req.query;
    const notes = await notesService.findAll({
      commentsNumber,
      mostCommented,
      comments,
      offset,
      limit,
      fromCategoryId,
      needCount,
    });
    return res.status(StatusCode.OK).json(notes);
  });

  route.post(`/`, validateBody(noteSchema), async (req, res) => {
    const newNote = await notesService.create(req.body);
    return res.status(StatusCode.CREATED).json(newNote);
  });

  route.get(
      `/:id`,
      validateParams,
      checkExistance(notesService),
      (_req, res) => {
        const note = res.locals.foundItem;
        return res.status(StatusCode.OK).json(note);
      }
  );

  route.put(
      `/:id`,
      [
        validateParams,
        checkExistance(notesService),
        validateBody(noteUpdateSchema),
      ],
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
      [validateParams, checkExistance(notesService), validateBody(commentSchema)],
      async (req, res) => {
        const {id} = req.params;
        const newComment = await commentsService.create(req.body, id);
        return res.status(StatusCode.CREATED).json(newComment);
      }
  );

  route.delete(
      `/:articleId/comments/:commentId`,
      validateParams,
      async (req, res) => {
        const {commentId, articleId} = req.params;
        const deletedComment = await commentsService.drop(commentId, articleId);
        return res.status(StatusCode.OK).json(deletedComment);
      }
  );

  route.get(`/:articleId/categories`, validateParams, async (req, res) => {
    const {articleId} = req.params;
    const articleCategories = await categoriesService.findAll({
      where: {articleId},
    });
    return res.status(StatusCode.OK).json(articleCategories);
  });
};
