"use strict";

const {nanoid} = require(`nanoid`);
const {getRandomInt} = require(`../../../utils/util`);

const EMAIL_NAME_LENGTH = 8;
const HASH_LENGTH = 32;
const MOCK_AVATARS_NUMBER = 5;

const getMockUsers = (usersNum, names) => {
  const users = Array(usersNum)
    .fill()
    .map(() => {
      const name = names[getRandomInt(0, names.length - 1)].split(` `);
      return {
        avatar: `avatar-${getRandomInt(1, MOCK_AVATARS_NUMBER)}.png`,
        firstName: name[0],
        lastName: name[1],
        email: `${nanoid(EMAIL_NAME_LENGTH)}@typoteka.fake`,
        passwordHash: nanoid(HASH_LENGTH),
      };
    });

  users.unshift({
    avatar: `avatar-${getRandomInt(1, MOCK_AVATARS_NUMBER)}.png`,
    firstName: `admin`,
    lastName: `admin`,
    email: `ad@ty.com`,
    passwordHash: `$2b$10$DqcnSUgKdYMTzwh.pCAg7O9llJSSWjZRQkecYQ5C0QamBJlaLGKui`,
  });

  return users;
};

module.exports = getMockUsers;
