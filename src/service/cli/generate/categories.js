"use strict";

const getCategories = (categories) => categories.map((category, i) => ({
  id: i,
  name: category,
}));

module.exports = getCategories;
