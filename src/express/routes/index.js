"use strict";

const {Router} = require(`express`);

const mainRouter = require(`./main`);
const myRouter = require(`./my`);
const articlesRouter = require(`./articles`);
const searchRouter = require(`./search`);
const categoriesRouter = require(`./categories`);

const router = new Router();

router.use(`/`, mainRouter);
router.use(`/my`, myRouter);
router.use(`/articles`, articlesRouter);
router.use(`/search`, searchRouter);
router.use(`/categories`, categoriesRouter);

module.exports = router;
