"use strict";

const {nanoid} = require(`nanoid`);

class DataService {
  constructor(data, itemIdLength) {
    this._data = data;
    this._itemIdLength = itemIdLength;
  }

  create(item) {
    const newItem = Object.assign(
        {},
        item,
        {id: nanoid(this._itemIdLength)}
    );

    this._data.push(newItem);
    return newItem;
  }

  findAll() {
    return this._data;
  }

  findOne(id) {
    return this._data.find((item) => item.id === id);
  }

  drop(id) {
    const idx = this._data.findIndex((item) => item.id === id);

    if (idx === -1) {
      return null;
    }

    return this._data.splice(idx, 1);
  }

  update(id, item) {
    const oldItem = this.findOne(id);
    return Object.assign(oldItem, item);
  }
}

module.exports = DataService;
