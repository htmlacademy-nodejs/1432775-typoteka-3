"use strict";

const {getCheckboxArray} = require(`./util`);

exports.adaptArticleToServer = (req, _res, next) => {
  const {body, file} = req;
  const categories = getCheckboxArray(body, `category/`);

  body.categories = categories;
  body.createdDate = new Date(body.date);

  if (!body.photo) {
    delete body.photo;
  } else if (!file) {
    body.photo = {
      name: body.photo,
      id: body.photoId,
    };
  } else {
    body.photo = {
      name: body.photo,
      id: file.filename,
    };
  }

  if (!body.fullText.trim().length) {
    delete body.fullText;
  }

  delete body.photoId;
  delete body.date;

  next();
};

exports.adaptArticleToClient = (article) => {
  const date = new Date(article.createdDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  article.createdDate = `${year}-${month}-${day}`;

  return article;
};
