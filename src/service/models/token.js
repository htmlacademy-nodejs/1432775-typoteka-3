"use strict";

const {Model, DataTypes} = require(`sequelize`);

class Token extends Model {}

module.exports = (sequelize) =>
  Token.init(
      {
        refreshToken: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: `Token`,
        tableName: `tokens`,
      }
  );
