"use strict";

const getCategories = (categories) => categories.map((category) => ({
  name: category,
}));

module.exports = getCategories;
