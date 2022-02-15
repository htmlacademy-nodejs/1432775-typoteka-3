"use strict";

const {Router} = require(`express`);

const {newCategorySchema} = require(`../validationSchemas/category`);
const validateBody = require(`../middlewares/validation/validateBody`);
const validateParams = require(`../middlewares/validation/validateParams`);
const authJwt = require(`../middlewares/auth-jwt`);

const {StatusCode} = require(`../../const`);

const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, async (_req, res) => {
    const categories = await categoryService.findAll({count: true});
    return res.status(StatusCode.OK).json(categories);
  });

  route.post(
      `/`,
      authJwt,
      validateBody(newCategorySchema),
      async (req, res) => {
        const newCategory = await categoryService.create(req.body);
        return res.status(StatusCode.CREATED).json(newCategory);
      }
  );

  route.put(
      `/:id`,
      [authJwt, validateParams, validateBody(newCategorySchema)],
      async (req, res) => {
        const {id} = req.params;
        const updatedCategory = await categoryService.update(id, req.body);
        return res.status(StatusCode.OK).json(updatedCategory);
      }
  );

  route.delete(`/:id`, [authJwt, validateParams], async (req, res) => {
    const {id} = req.params;
    const isAtLeastOneRelationFound = await categoryService.findOneRelation(id);
    if (isAtLeastOneRelationFound) {
      return res.status(StatusCode.FORBIDDEN).send(`Can't delete`);
    }

    await categoryService.drop(id);

    return res.status(StatusCode.OK).send();
  });
};
