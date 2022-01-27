/* eslint-disable new-cap */
"use strict";

const {Model, DataTypes} = require(`sequelize`);

class Article extends Model {}

module.exports = (sequelize) =>
  Article.init(
      {
        title: {
          type: DataTypes.STRING(250),
          allowNull: false,
        },
        announce: {
          type: DataTypes.STRING(250),
          allowNull: false,
        },
        fullText: {
          type: DataTypes.STRING(1000),
        },
      },
      {
        sequelize,
        modelName: `Article`,
        tableName: `articles`,
      }
  );
