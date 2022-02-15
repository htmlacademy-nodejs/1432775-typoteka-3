"use strict";

const jwt = require(`../../utils/jwt`);

class Token {
  constructor(sequelize) {
    this._Token = sequelize.models.Token;
  }

  async create(userId, payload) {
    const accessToken = jwt.createAccess(payload);
    const refreshToken = jwt.createRefresh(payload);

    const oldToken = await this._Token.findOne({
      where: {userId},
    });

    if (oldToken) {
      await oldToken.update({refreshToken});
    } else {
      await this._Token.create({userId, refreshToken});
    }

    return {
      accessToken,
      refreshToken,
    };
  }
}

module.exports = Token;
