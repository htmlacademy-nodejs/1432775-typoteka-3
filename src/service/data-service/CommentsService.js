"use strict";

const {nanoid} = require(`nanoid`);

const BaseService = require(`./index`);

class CommentsService extends BaseService {
  constructor(data, itemIdLength, noteService) {
    super(data, itemIdLength);
    this._noteService = noteService;
  }

  create(item, noteId) {
    const commentId = nanoid(this._itemIdLength);
    const newItem = Object.assign({}, item, {id: commentId, noteId});

    this._noteService.addComment(noteId, commentId);
    this._data.push(newItem);
    return newItem;
  }

  drop(commentId) {
    const idx = this._data.findIndex((item) => item.id === commentId);

    if (idx === -1) {
      return null;
    }

    this._noteService.deleteComment(this._data[idx].noteId, commentId);

    return this._data.splice(idx, 1)[0];
  }

  findByNoteId(noteId) {
    return this.findByProperty(`noteId`, noteId);
  }
}

module.exports = CommentsService;
