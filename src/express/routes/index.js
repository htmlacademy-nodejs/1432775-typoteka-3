"use strict";

const {Router} = require(`express`);

const mainRouter = require(`./main`);
const loginRouter = require(`./login`);
const myRouter = require(`./my`);
const articlesRouter = require(`./articles`);
const searchRouter = require(`./search`);
const categoriesRouter = require(`./categories`);

const router = new Router();

router.use(`/`, mainRouter);
router.use(`/login`, loginRouter);
router.use(`/my`, myRouter);
router.use(`/articles`, articlesRouter);
router.use(`/search`, searchRouter);
router.use(`/categories`, categoriesRouter);

module.exports = router;
