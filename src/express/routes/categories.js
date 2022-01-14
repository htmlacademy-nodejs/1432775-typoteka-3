"use strict";

const {Router} = require(`express`);
const {asyncHandler} = require(`../../utils/util`);
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

categoriesRouter.post(
    `/`,
    asyncHandler(async (req, res) => {
      await api.createCategory(req.body);
      res.redirect(`back`);
    })
);

categoriesRouter.post(
    `/edit/:id`,
    asyncHandler(async (req, res) => {
      const {id} = req.params;
      await api.updateCategory(id, req.body);
      return res.redirect(`back`);
    })
);

categoriesRouter.get(`/delete/:id`, asyncHandler(async (req, res) => {
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
}));

module.exports = categoriesRouter;
