"use strict";

const {Model, DataTypes} = require(`sequelize`);

class Role extends Model {}

module.exports = (sequelize) =>
  Role.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: `Role`,
        tableName: `roles`,
      }
  );
