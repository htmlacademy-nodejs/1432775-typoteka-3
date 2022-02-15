"use strict";

const {Router} = require(`express`);

const {api} = require(`../api`);

const upload = require(`../../utils/multer`);
const {adaptUserToServer} = require(`../../utils/adapter`);
const {setTokens} = require(`../../utils/util`);

const withValidation = require(`../middlewares/withValidation`);

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
    api.getArticles({limit: ARTICLES_PER_MAIN_PAGE, offset, needCount: true}),
    api.getArticles({
      mostCommented: true,
      limit: MOST_COMMENTED_ARTICLES_NUMBER,
    }),
    api.getCategories(),
    api.getLatestComments({limit: LATEST_COMMENTS_NUMBER}),
  ]);

  const totalPages = Math.ceil(count / ARTICLES_PER_MAIN_PAGE);

  res.render(`main`, {
    articles,
    categories,
    mostCommentedArticles,
    latestComments,
    totalPages,
    page,
  });
});

mainRouter.get(`/register`, (_req, res) => res.render(`register`));

mainRouter.post(
    `/register`,
    [upload.single(`upload`), adaptUserToServer],
    withValidation(async (req, res) => {
      await api.createUser(req.body);
      return res.redirect(`/login`);
    }, `register`)
);

mainRouter.get(`/login`, (_, res) => res.render(`login`));

mainRouter.post(
    `/login`,
    withValidation(async (req, res) => {
      const tokens = await api.login(req.body);

      setTokens(res, tokens);

      return res.redirect(`/`);
    }, `login`)
);

module.exports = mainRouter;
