"use strict";

class Photo {
  constructor(sequelize) {
    this._Photo = sequelize.models.Photo;
  }

  async create(photo) {
    return await this._Photo.create(photo);
  }
}

module.exports = Photo;
