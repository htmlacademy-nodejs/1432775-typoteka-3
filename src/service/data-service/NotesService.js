"use strict";

const BaseService = require(`./index`);

class NotesService extends BaseService {
  constructor(...args) {
    super(...args);
    this._searchField = `title`;
  }

  addComment(noteId, commentId) {
    const note = this.findOne(noteId);
    note.comments.push(commentId);
  }

  deleteComment(noteId, commentId) {
    const note = this.findOne(noteId);
    const idx = note.comments.findIndex((id) => commentId === id);

    if (idx === -1) {
      return null;
    }

    return note.comments.splice(idx, 1)[0];
  }

  search(str) {
    return this.findByProperty(this._searchField, str, {isExact: false});
  }
}

module.exports = NotesService;
