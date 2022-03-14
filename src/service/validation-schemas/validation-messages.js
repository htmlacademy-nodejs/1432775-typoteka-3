"use strict";

module.exports = {
  string: {
    min: (name, number) => `${name} содержит меньше ${number} символов`,
    max: (name, number) => `${name} содержит больше ${number} символов`,

    email: (name) => `Поле ${name} не является валидным email адресом`,

    userName: () => `Имя пользователя не должно содержать цифры и символы`
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
