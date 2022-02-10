"use strict";

class NotFoundErr extends Error {
  constructor() {
    super(`NotFound`);
  }
}

class ValidationErr extends Error {
  constructor(err) {
    super(`ValidationErr`);
    this.data = err.response.data;
  }
}

module.exports = {NotFoundErr, ValidationErr};
