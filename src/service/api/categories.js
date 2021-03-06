"use strict";

const {Router} = require(`express`);

const {newCategorySchema} = require(`../validation-schemas/category`);
const validateBody = require(`../middlewares/validation/validate-body`);
const validateParams = require(`../middlewares/validation/validate-params`);
const authJwt = require(`../middlewares/auth-jwt`);

const {StatusCode, Role} = require(`../../const`);

const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, async (_req, res) => {
    const categories = await categoryService.findAll();
    return res.status(StatusCode.OK).json(categories);
  });

  route.post(
      `/`,
      authJwt(Role.ADMIN),
      validateBody(newCategorySchema),
      async (req, res) => {
        const newCategory = await categoryService.create(req.body);
        return res.status(StatusCode.CREATED).json(newCategory);
      }
  );

  route.put(
      `/:id`,
      [authJwt(Role.ADMIN), validateParams, validateBody(newCategorySchema)],
      async (req, res) => {
        const {id} = req.params;
        const updatedCategory = await categoryService.update(id, req.body);
        return res.status(StatusCode.OK).json(updatedCategory);
      }
  );

  route.delete(`/:id`, [authJwt(Role.ADMIN), validateParams], async (req, res) => {
    const {id} = req.params;
    const isAtLeastOneRelationFound = await categoryService.findOneRelation(id);
    if (isAtLeastOneRelationFound) {
      return res.status(StatusCode.FORBIDDEN).send(`Can't delete`);
    }

    await categoryService.drop(id);

    return res.status(StatusCode.OK).send();
  });
};
