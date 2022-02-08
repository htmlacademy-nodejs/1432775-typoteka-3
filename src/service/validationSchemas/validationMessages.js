"use strict";

module.exports = {
  string: {
    min: (name, number) => `${name} содержит меньше ${number} символов`,
    max: (name, number) => `${name} содержит больше ${number} символов`,

    email: (name) => `Поле ${name} не является валидным email адресом`,

    // TODO: username should contain...
    userName: () => `Имя пользователя должно содержать ...`
  },

  array: {
    min: (name, number) =>
      `В поле ${name} должно быть не менее ${number} элементов`,
  },

  any: {
    required: (name) => `${name} - обязательное поле`,
    only: (name, originalName) => `Поле ${name} не совпадает с полем ${originalName}`
  },
};
