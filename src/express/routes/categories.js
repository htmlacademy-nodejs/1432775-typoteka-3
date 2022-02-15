"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);
const {StatusCode} = require(`../../const`);

const asyncHandler = require(`../middlewares/asyncHandler`);
const withValidation = require(`../middlewares/withValidation`);
const withAuth = require(`../middlewares/withAuth`);

const categoriesRouter = new Router();

categoriesRouter.get(
    `/`,
    withAuth,
    asyncHandler(async (_req, res) => {
      const categories = await api.getCategories();
      return res.render(`categories`, {categories});
    })
);

categoriesRouter.post(
    `/`,
    withAuth,
    withValidation(
        async (req, res) => {
          await api.createCategory(req.body);
          return res.redirect(`/categories`);
        },
        `categories`,
        {categories: api.getCategories}
    )
);

categoriesRouter.post(
    `/edit/:id`,
    withAuth,
    withValidation(
        async (req, res) => {
          const {id} = req.params;
          await api.updateCategory(id, req.body);
          return res.redirect(`/categories`);
        },
        `categories`,
        {categories: api.getCategories}
    )
);

categoriesRouter.get(
    `/delete/:id`,
    withAuth,
    asyncHandler(async (req, res) => {
      const {id} = req.params;
      try {
        await api.deleteCategory(id);
      } catch (err) {
        if (err.status === StatusCode.FORBIDDEN) {
          return res.redirect(`back`);
        }

        throw new Error(err);
      }
      return res.redirect(`back`);
    })
);

module.exports = categoriesRouter;
