"use strict";

const {MOCKS_FILE_NAME} = require(`../../const`);
const {readContent} = require(`../../utils/fs`);

let data = [];

const getMockNotes = async () => {
  if (!data.length) {
    data = await readContent(MOCKS_FILE_NAME);
  }

  return data;
};

module.exports = getMockNotes;
