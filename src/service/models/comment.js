"use strict";

const {Model, DataTypes} = require(`sequelize`);

class Comment extends Model {}

module.exports = (sequelize) =>
  Comment.init(
      {
        text: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: `Comment`,
        tableName: `comments`,
      }
  );
