"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);
const upload = require(`../../utils/multer`);
const {adaptArticleToServer} = require(`../../utils/adapter`);
const {asyncHandler} = require(`../../utils/util`);

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
        res.redirect(`back`);
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

      await api.createComment(req.body, id);

      res.redirect(`back`);
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

articlesRouter.get(`/category/:id`, (_req, res) =>
  res.render(`articles-by-category`)
);

articlesRouter.get(
    `/edit/:id`,
    asyncHandler(async (req, res) => {
      const {id} = req.params;
      const [article, categories] = await Promise.all([
        api.getArticle(id),
        api.getCategories(),
      ]);
      console.log(article);
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
        res.redirect(`back`);
      }
    }
);

module.exports = articlesRouter;
