"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);
const upload = require(`../../utils/multer`);
const {adaptArticleToServer} = require(`../../utils/adapter`);

const asyncHandler = require(`../middlewares/async-handler`);
const withValidation = require(`../middlewares/with-validation`);
const withAuth = require(`../middlewares/with-auth`);
const csrfProtection = require(`../../utils/csrf-protection`);
const {Role} = require(`../../const`);

const ARTICLES_IN_CATEGORY_BY_PAGE = 8;

const articlesRouter = new Router();

articlesRouter.get(
    `/add`,
    [withAuth(Role.ADMIN), csrfProtection],
    async (req, res) => {
      const categories = await api.getCategories();
      res.render(`new-post`, {
        categories,
        csrf: req.csrfToken(),
        user: res.user,
      });
    }
);

articlesRouter.post(
    `/add`,
    [
      withAuth(Role.ADMIN),
      upload.single(`upload`),
      csrfProtection,
      adaptArticleToServer,
    ],
    withValidation(
        async (req, res) => {
          await api.createArticle(req.body);
          res.redirect(`/my`);
        },
        `new-post`,
        (req, res) => ({
          categories: api.getCategories,
          csrf: req.csrfToken,
          user: res.user,
        })
    )
);

articlesRouter.get(
    `/:id`,
    csrfProtection,
    asyncHandler(async (req, res) => {
      const {id} = req.params;

      const article = await api.getArticle(id, {comments: true});
      res.render(`post-detail`, {
        article,
        csrf: req.csrfToken(),
        user: res.user,
      });
    })
);

articlesRouter.get(
    `/delete/:id`,
    withAuth(Role.ADMIN),
    asyncHandler(async (req, res) => {
      const {id} = req.params;

      await api.deleteArticle(id);

      res.redirect(`/my`);
    })
);

articlesRouter.post(
    `/:id/comments`,
    withAuth(),
    csrfProtection,
    withValidation(
        async (req, res) => {
          const {id} = req.params;
          await api.createComment(req.body, id);
          res.redirect(`/articles/${id}`);
        },
        `post-detail`,
        (req, res) => ({
          article: api.getArticle.bind(null, req.params.id, {comments: true}),
          csrf: req.csrfToken,
          user: res.user,
        })
    )
);

articlesRouter.get(
    `/:articleId/comments/delete/:commentId`,
    withAuth(),
    asyncHandler(async (req, res) => {
      const {commentId, articleId} = req.params;
      await api.deleteComment(commentId, articleId);
      res.redirect(`back`);
    })
);

articlesRouter.get(
    `/category/:id`,
    asyncHandler(async (req, res) => {
      const {id} = req.params;
      const {page = 1} = req.query;

      const offset = (page - 1) * ARTICLES_IN_CATEGORY_BY_PAGE;

      const [categories, {count, rows: articles}] = await Promise.all([
        api.getCategories(),
        api.getArticles({
          limit: ARTICLES_IN_CATEGORY_BY_PAGE,
          offset,
          fromCategoryId: id,
          needCount: true,
        }),
      ]);

      const chosenCategory = categories.find((e) => e.id === +id);
      const nonEmptyCategories = categories.filter((category) => category.count > 0);
      const totalPages = Math.ceil(count / ARTICLES_IN_CATEGORY_BY_PAGE);

      return res.render(`articles-by-category`, {
        categories: nonEmptyCategories,
        articles,
        chosenCategory,
        page,
        totalPages,
        user: res.user,
      });
    })
);

articlesRouter.get(
    `/edit/:id`,
    [withAuth(Role.ADMIN), csrfProtection],
    asyncHandler(async (req, res) => {
      const {id} = req.params;
      const [article, categories] = await Promise.all([
        api.getArticle(id),
        api.getCategories(),
      ]);

      res.render(`edit-post`, {
        article,
        categories,
        csrf: req.csrfToken(),
        user: res.user,
      });
    })
);

articlesRouter.post(
    `/edit/:id`,
    [
      withAuth(Role.ADMIN),
      upload.single(`upload`),
      csrfProtection,
      adaptArticleToServer,
    ],
    withValidation(
        async (req, res) => {
          const {id} = req.params;
          await api.updateArticle(id, req.body);
          res.redirect(`/my`);
        },
        `edit-post`,
        (req, res) => ({
          article: api.getArticle.bind(null, req.params.id),
          categories: api.getCategories,
          csrf: req.csrfToken,
          user: res.user,
        })
    )
);

module.exports = articlesRouter;
