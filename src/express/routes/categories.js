"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);
const {StatusCode} = require(`../../const`);
const csrfProtection = require(`../../utils/csrf-protection`);

const asyncHandler = require(`../middlewares/asyncHandler`);
const withValidation = require(`../middlewares/withValidation`);
const withAuth = require(`../middlewares/withAuth`);

const categoriesRouter = new Router();

categoriesRouter.get(
    `/`,
    [withAuth, csrfProtection],
    asyncHandler(async (req, res) => {
      const categories = await api.getCategories();
      return res.render(`categories`, {
        categories,
        csrf: req.csrfToken(),
        user: res.user,
      });
    })
);

categoriesRouter.post(
    `/`,
    [withAuth, csrfProtection],
    withValidation(
        async (req, res) => {
          await api.createCategory(req.body);
          return res.redirect(`/categories`);
        },
        `categories`,
        (req, res) => ({
          categories: api.getCategories,
          csrf: req.csrfToken,
          user: res.user,
        })
    )
);

categoriesRouter.post(
    `/edit/:id`,
    [withAuth, csrfProtection],
    withValidation(
        async (req, res) => {
          const {id} = req.params;
          await api.updateCategory(id, req.body);
          return res.redirect(`/categories`);
        },
        `categories`,
        (req, res) => ({
          categories: api.getCategories,
          csrf: req.csrfToken,
          user: res.user,
        })
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
