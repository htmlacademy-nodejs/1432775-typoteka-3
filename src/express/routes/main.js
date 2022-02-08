"use strict";

const {Router} = require(`express`);
const {prepareErrors} = require(`../../utils/util`);

const {api} = require(`../api`);

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

mainRouter.post(`/register`, async (req, res) => {
  try {
    await api.createUser(req.body);
    return req.redirect(`/login`);
  } catch (err) {
    console.log(`ERROR!!!`);
    console.log(err);
    const validationMessages = prepareErrors(err);
    return res.render(`register`, {validationMessages});
  }
});

module.exports = mainRouter;
