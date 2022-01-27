"use strict";

const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const path = require(`path`);

const {ClientDir} = require(`../const`);

const IMG_ID_LENGTH = 10;

const absolutePath = path.resolve(__dirname, `../express/${ClientDir.UPLOAD}/img`);

const storage = multer.diskStorage({
  destination: absolutePath,
  filename: (_req, file, cb) => {
    const extension = file.originalname.split(`.`).pop();
    const newName = `${nanoid(IMG_ID_LENGTH)}.${extension}`;
    cb(null, newName);
  }
});

module.exports = multer({storage});
