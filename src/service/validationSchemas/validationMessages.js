"use strict";

module.exports = {
  string: {
    min: (name, number) => `${name} содержит меньше ${number} символов`,
    max: (name, number) => `${name} содержит больше ${number} символов`,
  },

  array: {
    min: (name, number) =>
      `В поле ${name} должно быть не менее ${number} элементов`,
  },

  any: {
    required: (name) => `${name} - обязательное поле`,
  },
};
