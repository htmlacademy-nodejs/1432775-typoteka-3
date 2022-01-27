"use strict";

const {Router} = require(`express`);
const {asyncHandler, prepareErrors} = require(`../../utils/util`);
const {api} = require(`../api`);
const {StatusCode} = require(`../../const`);

const categoriesRouter = new Router();

categoriesRouter.get(
    `/`,
    asyncHandler(async (_req, res) => {
      const categories = await api.getCategories();
      return res.render(`categories`, {categories});
    })
);

categoriesRouter.post(`/`, async (req, res) => {
  try {
    await api.createCategory(req.body);
    return res.redirect(`/categories`);
  } catch (err) {
    const categories = await api.getCategories();
    const validationMessages = prepareErrors(err);
    return res.render(`categories`, {categories, validationMessages});
  }
});

categoriesRouter.post(
    `/edit/:id`,
    async (req, res) => {
      const {id} = req.params;
      try {
        await api.updateCategory(id, req.body);
        return res.redirect(`/categories`);
      } catch (err) {
        const categories = await api.getCategories();
        const validationMessages = prepareErrors(err);
        return res.render(`categories`, {categories, validationMessages});
      }
    }
);

categoriesRouter.get(
    `/delete/:id`,
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
