"use strict";

const {getCheckboxArray} = require(`./util`);

exports.adaptArticleToServer = (req, _res, next) => {
  const {body, file} = req;
  const categories = getCheckboxArray(body, `category/`, {isNumber: true});

  body.categories = categories;
  body.createdAt = new Date(body.date);

  if (!body.photo) {
    delete body.photo;
  } else if (!file) {
    body.photo = {
      name: body.photo,
      uniqueName: body.uniqueName,
    };
  } else {
    body.photo = {
      name: body.photo,
      uniqueName: file.filename,
    };
  }

  if (!body.fullText.trim().length) {
    delete body.fullText;
  }

  delete body.uniqueName;
  delete body.date;

  next();
};

exports.adaptUserToServer = (req, _res, next) => {
  const {body, file} = req;
  if (file) {
    body.avatar = file.filename;
  }

  next();
};
