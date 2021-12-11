"use strict";

const {nanoid} = require(`nanoid`);
const {getRandomInt} = require(`../../../utils/util`);

const EMAIL_NAME_LENGTH = 8;
const HASH_LENGTH = 32;
const MOCK_AVATARS_NUMBER = 5;

const getMockUsers = (usersNum, names) => {
  return Array(usersNum)
    .fill()
    .map((_, i) => {
      const name = names[getRandomInt(0, names.length - 1)].split(` `);
      return {
        id: i,
        avatar: `avatar-${getRandomInt(1, MOCK_AVATARS_NUMBER)}.png`,
        firstName: name[0],
        lastName: name[1],
        email: `${nanoid(EMAIL_NAME_LENGTH)}@typoteka.fake`,
        passwordHash: nanoid(HASH_LENGTH),
      };
    });
};

module.exports = getMockUsers;
