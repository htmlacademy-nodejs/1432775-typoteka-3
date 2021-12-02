"use strict";

const {Model, DataTypes} = require(`sequelize`);

class Photo extends Model {}

module.exports = (sequelize) =>
  Photo.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        uniqueName: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        modelName: `Photo`,
        tableName: `photos`,
      }
  );
