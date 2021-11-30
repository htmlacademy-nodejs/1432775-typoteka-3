"use strict";

exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [
      someArray[randomPosition],
      someArray[i],
    ];
  }

  return someArray;
};

exports.getFileNameFromPath = (path) => path.split(`/`).pop();

exports.getCheckboxArray = (body, fieldPreffix) => {
  const checkboxes = [];
  for (const [key, value] of Object.entries(body)) {
    if (key.startsWith(fieldPreffix) && value === `on`) {
      const fieldName = key.split(fieldPreffix);
      checkboxes.push(fieldName.pop());
      delete body[key];
    }
  }
  return checkboxes;
};
