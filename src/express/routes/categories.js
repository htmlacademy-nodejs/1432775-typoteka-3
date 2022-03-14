"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);
const {StatusCode, Role} = require(`../../const`);
const csrfProtection = require(`../../utils/csrf-protection`);

const asyncHandler = require(`../middlewares/async-handler`);
const withValidation = require(`../middlewares/with-validation`);
const withAuth = require(`../middlewares/with-auth`);

const categoriesRouter = new Router();

categoriesRouter.get(
    `/`,
    [withAuth(Role.ADMIN), csrfProtection],
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
    [withAuth(Role.ADMIN), csrfProtection],
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
    [withAuth(Role.ADMIN), csrfProtection],
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
    withAuth(Role.ADMIN),
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
