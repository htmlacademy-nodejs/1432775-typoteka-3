"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);

const upload = require(`../../utils/multer`);
const {adaptUserToServer} = require(`../../utils/adapter`);
const {setCookie, clearCookie} = require(`../../utils/cookie`);

const withValidation = require(`../middlewares/with-validation`);
const csrfProtection = require(`../../utils/csrf-protection`);

const ARTICLES_PER_MAIN_PAGE = 8;
const MOST_COMMENTED_ARTICLES_NUMBER = 4;
const LATEST_COMMENTS_NUMBER = 4;

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const {page = 1} = req.query;

  const offset = (page - 1) * ARTICLES_PER_MAIN_PAGE;

  const [
    {count, rows: articles},
    mostCommentedArticles,
    categories,
    latestComments,
  ] = await Promise.all([
    api.getArticles({limit: ARTICLES_PER_MAIN_PAGE, offset}),
    api.getCommentedArticles({
      limit: MOST_COMMENTED_ARTICLES_NUMBER,
    }),
    api.getCategories(),
    api.getLatestComments({limit: LATEST_COMMENTS_NUMBER}),
  ]);

  const totalPages = Math.ceil(count / ARTICLES_PER_MAIN_PAGE);
  const nonEmptyCategories = categories.filter(
      (category) => category.count > 0
  );

  res.render(`main`, {
    articles,
    categories: nonEmptyCategories,
    mostCommentedArticles,
    latestComments,
    totalPages,
    page,
    user: res.user,
  });
});

mainRouter.get(`/register`, csrfProtection, (req, res) =>
  res.render(`register`, {csrf: req.csrfToken()})
);

mainRouter.post(
    `/register`,
    [upload.single(`upload`), csrfProtection, adaptUserToServer],
    withValidation(
        async (req, res) => {
          await api.createUser(req.body);
          return res.redirect(`/login`);
        },
        `register`,
        (req) => ({
          csrf: req.csrfToken,
        })
    )
);

mainRouter.get(`/login`, csrfProtection, (req, res) =>
  res.render(`login`, {csrf: req.csrfToken()})
);

mainRouter.post(
    `/login`,
    csrfProtection,
    withValidation(
        async (req, res) => {
          const {tokens, user} = await api.login(req.body);

          setCookie(res, tokens, user);

          return res.redirect(`/`);
        },
        `login`,
        (req) => ({
          csrf: req.csrfToken,
        })
    )
);

mainRouter.get(`/logout`, async (req, res) => {
  clearCookie(res);
  res.redirect(`back`);
});

module.exports = mainRouter;
