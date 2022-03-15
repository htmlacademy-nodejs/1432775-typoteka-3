"use strict";

const {Router} = require(`express`);

const {noteSchema, noteUpdateSchema} = require(`../validation-schemas/note`);
const {commentSchema} = require(`../validation-schemas/comment`);

const validateBody = require(`../middlewares/validation/validate-body`);
const checkExistance = require(`../middlewares/check-existance`);
const validateParams = require(`../middlewares/validation/validate-params`);

const {StatusCode, Role, events} = require(`../../const`);
const authJwt = require(`../middlewares/auth-jwt`);

const route = new Router();

module.exports = (app, notesService, commentsService) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const {offset, limit, fromCategoryId} = req.query;
    const notes = await notesService.findAll({
      offset,
      limit,
      fromCategoryId,
    });
    return res.status(StatusCode.OK).json(notes);
  });

  route.post(
      `/`,
      authJwt(Role.ADMIN),
      validateBody(noteSchema),
      async (req, res) => {
        const newNote = await notesService.create(res.user.id, req.body);
        return res.status(StatusCode.CREATED).json(newNote);
      }
  );

  route.get(`/commented`, async (req, res) => {
    const {limit} = req.query;
    const notes = await notesService.findMostCommented({
      limit,
    });
    return res.status(StatusCode.OK).json(notes);
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
        authJwt(Role.ADMIN),
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

  route.delete(`/:id`, authJwt(Role.ADMIN), async (req, res) => {
    const {id} = req.params;
    const deletedNote = await notesService.drop(id);
    return res.status(StatusCode.OK).json(deletedNote);
  });

  route.post(
      `/:id/comments`,
      [
        authJwt(),
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

        res.status(StatusCode.CREATED).json(newComment);
        const updatedArticle = await notesService.findOne(newComment.articleId);
        req.app.io.emit(events.comment.create, {newComment, updatedArticle});
      }
  );

  route.delete(
      `/:articleId/comments/:commentId`,
      [authJwt(), validateParams, checkExistance(commentsService, `commentId`)],
      async (req, res) => {
        const {commentId} = req.params;
        const comment = await commentsService.findOne(commentId);

        if (comment.userId !== res.user.id) {
          const isAdmin = res.user.roles.some((role) => role.name === Role.ADMIN);
          if (!isAdmin) {
            return res.sendStatus(StatusCode.FORBIDDEN);
          }
        }

        await comment.destroy();
        return res.sendStatus(StatusCode.OK);
      }
  );
};
