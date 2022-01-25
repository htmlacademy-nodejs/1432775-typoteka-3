"use strict";

const {Model, DataTypes} = require(`sequelize`);

class User extends Model {}

module.exports = (sequelize) =>
  User.init(
      {
        avatar: {
          type: DataTypes.STRING
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: `User`,
        tableName: `users`,
      }
  );
