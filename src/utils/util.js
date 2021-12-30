"use strict";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [
      someArray[randomPosition],
      someArray[i],
    ];
  }

  return someArray;
};

const getFileNameFromPath = (path) => path.split(`/`).pop();

const getCheckboxArray = (body, fieldPreffix, {isNumber = false} = {inNumber: false}) => {
  const checkboxes = [];
  for (const [key, value] of Object.entries(body)) {
    if (key.startsWith(fieldPreffix) && value === `on`) {
      const fieldName = key.split(fieldPreffix).pop();
      const prepearedName = isNumber ? +fieldName : fieldName;
      checkboxes.push(prepearedName);
      delete body[key];
    }
  }
  return checkboxes;
};

const asyncHandler =
  (fn) =>
    (...args) => {
      const fnReturn = fn(...args);
      const next = args[args.length - 1];
      return Promise.resolve(fnReturn).catch(next);
    };

const getRandomDate = (pastPediodTime) => {
  const currentDate = +new Date();
  const minCreationData = currentDate - pastPediodTime;
  return new Date(getRandomInt(minCreationData, currentDate));
};

const getSQLStringFromArray = (arr) =>
  arr
    .map(
        (el) =>
          `(${Object.values(el)
          .map((value) => (isNaN(value) ? `'${value}'` : value))
          .join(`,`)})`
    )
    .join(`,\n`);

module.exports = {
  getRandomInt,
  shuffle,
  getFileNameFromPath,
  getCheckboxArray,
  asyncHandler,
  getRandomDate,
  getSQLStringFromArray,
};
