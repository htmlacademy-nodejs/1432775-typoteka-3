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

class UnauthorizedErr extends Error {
  constructor() {
    super(`Unauthorized`);
  }
}

module.exports = {NotFoundErr, ValidationErr, UnauthorizedErr};
