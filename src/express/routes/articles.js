"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);
const upload = require(`../../utils/multer`);
const {adaptArticleToServer} = require(`../../utils/adapter`);
const {asyncHandler, prepareErrors} = require(`../../utils/util`);

const ARTICLES_IN_CATEGORY_BY_PAGE = 8;

const articlesRouter = new Router();

articlesRouter.get(`/add`, async (_req, res) => {
  const categories = await api.getCategories();
  res.render(`new-post`, {categories});
});

articlesRouter.post(
    `/add`,
    [upload.single(`upload`), adaptArticleToServer],
    async (req, res) => {
      try {
        await api.createArticle(req.body);
        res.redirect(`/my`);
      } catch (err) {
        const validationMessages = prepareErrors(err);
        const categories = await api.getCategories();
        res.render(`new-post`, {categories, validationMessages});
      }
    }
);

articlesRouter.get(
    `/:id`,
    asyncHandler(async (req, res) => {
      const {id} = req.params;

      const article = await api.getArticle(id, {comments: true});
      res.render(`post-detail`, {article});
    })
);

articlesRouter.get(
    `/delete/:id`,
    asyncHandler(async (req, res) => {
      const {id} = req.params;

      await api.deleteArticle(id);

      res.redirect(`/my`);
    })
);

articlesRouter.post(
    `/:id/comments`,
    asyncHandler(async (req, res) => {
      const {id} = req.params;

      try {
        await api.createComment(req.body, id);

        res.redirect(`/articles/${id}`);
      } catch (err) {
        const article = await api.getArticle(id, {comments: true});
        const validationMessages = prepareErrors(err);
        res.render(`post-detail`, {article, validationMessages});
      }
    })
);

articlesRouter.get(
    `/:articleId/comments/delete/:commentId`,
    async (req, res) => {
      const {commentId, articleId} = req.params;
      await api.deleteComment(commentId, articleId);
      res.redirect(`back`);
    }
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
      const totalPages = Math.ceil(count / ARTICLES_IN_CATEGORY_BY_PAGE);

      return res.render(`articles-by-category`, {
        categories,
        articles,
        chosenCategory,
        page,
        totalPages,
      });
    })
);

articlesRouter.get(
    `/edit/:id`,
    asyncHandler(async (req, res) => {
      const {id} = req.params;
      const [article, categories] = await Promise.all([
        api.getArticle(id),
        api.getCategories(),
      ]);

      res.render(`edit-post`, {article, categories});
    })
);

articlesRouter.post(
    `/edit/:id`,
    [upload.single(`upload`), adaptArticleToServer],
    async (req, res) => {
      const {id} = req.params;
      try {
        await api.updateArticle(id, req.body);
        res.redirect(`/my`);
      } catch (err) {
        const [article, categories] = await Promise.all([
          api.getArticle(id),
          api.getCategories(),
        ]);

        const validationMessages = prepareErrors(err);
        res.render(`edit-post`, {article, categories, validationMessages});
      }
    }
);

module.exports = articlesRouter;
