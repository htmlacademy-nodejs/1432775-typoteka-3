"use strict";

class NotFoundErr extends Error {
  constructor() {
    super(`NotFound`);
  }
}

module.exports = {NotFoundErr};
