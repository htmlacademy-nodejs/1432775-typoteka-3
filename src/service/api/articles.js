"use strict";

const {Router} = require(`express`);

const {noteSchema, noteUpdateSchema} = require(`../validationSchemas/note`);
const {commentSchema} = require(`../validationSchemas/comment`);

const validateBody = require(`../middlewares/validation/validateBody`);
const checkExistance = require(`../middlewares/checkExistance`);
const validateParams = require(`../middlewares/validation/validateParams`);

const {StatusCode} = require(`../../const`);
const authJwt = require(`../middlewares/auth-jwt`);

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

  route.post(`/`, authJwt, validateBody(noteSchema), async (req, res) => {
    const newNote = await notesService.create(res.user.id, req.body);
    return res.status(StatusCode.CREATED).json(newNote);
  });

  route.get(
      `/:id`,
      [validateParams, checkExistance(notesService)],
      (_req, res) => {
        const note = res.locals.foundItem;
        return res.status(StatusCode.OK).json(note);
      }
  );

  route.put(
      `/:id`,
      [
        authJwt,
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

  route.delete(`/:id`, authJwt, async (req, res) => {
    const {id} = req.params;
    const deletedNote = await notesService.drop(id);
    return res.status(StatusCode.OK).json(deletedNote);
  });

  route.post(
      `/:id/comments`,
      [
        authJwt,
        validateParams,
        checkExistance(notesService),
        validateBody(commentSchema),
      ],
      async (req, res) => {
        const {id} = req.params;
        const newComment = await commentsService.create(
            req.body,
            id,
            res.user.id
        );
        return res.status(StatusCode.CREATED).json(newComment);
      }
  );

  route.delete(
      `/:articleId/comments/:commentId`,
      [authJwt, validateParams],
      async (req, res) => {
        const {commentId} = req.params;
        const comment = await commentsService.findOne(commentId);

        if (comment.userId !== res.user.id) {
          return res.sendStatus(StatusCode.FORBIDDEN);
        }

        await comment.destroy();
        return res.sendStatus(StatusCode.OK);
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
