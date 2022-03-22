"use strict";

class NotFoundError extends Error {
  constructor() {
    super(`NotFound`);
  }
}

class ValidationError extends Error {
  constructor(err) {
    super(`ValidationError`);
    this.data = err.response.data;
  }
}

class UnauthorizedError extends Error {
  constructor() {
    super(`Unauthorized`);
  }
}

module.exports = {NotFoundError, ValidationError, UnauthorizedError};
