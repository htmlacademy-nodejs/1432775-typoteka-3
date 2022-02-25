"use strict";

const Aliase = require(`../models/aliase`);

class User {
  constructor(sequelize) {
    this._User = sequelize.models.User;
    this._Role = sequelize.models.Role;
  }

  async create(user) {
    return await this._User.create(user);
  }

  async findByEmail(email) {
    return await this._User.findOne({
      where: {email},
      include: {
        model: this._Role,
        as: Aliase.ROLES,
        through: {
          attributes: [],
        },
        attributes: [`name`],
      }
    });
  }
}

module.exports = User;
