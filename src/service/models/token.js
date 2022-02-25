/* eslint-disable new-cap */
"use strict";

const {Model, DataTypes} = require(`sequelize`);

class Token extends Model {}

module.exports = (sequelize) =>
  Token.init(
      {
        refreshToken: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: `Token`,
        tableName: `tokens`,
      }
  );
