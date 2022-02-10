"use strict";

class User {
  constructor(sequelize) {
    this._User = sequelize.models.User;
  }

  async create(user) {
    return await this._User.create(user);
  }

  async findByEmail(email) {
    return await this._User.findOne({
      where: {email},
    });
  }
}

module.exports = User;
