"use strict";

const express = require(`express`);
const request = require(`supertest`);

const my = require(`./my`);

const CommentService = require(`../data-service/CommentsService`);
const NotesService = require(`../data-service/NotesService`);

const {testComments, testNotes} = require(`../testData`);
const {StatusCode, NOTE_ID_SIZE, COMMENT_ID_SIZE} = require(`../../const`);

const app = express();
app.use(express.json());

const noteService = new NotesService(testNotes, NOTE_ID_SIZE);
const commentService = new CommentService(testComments, COMMENT_ID_SIZE, noteService);
my(app, commentService);

describe(`/my route works correctly`, () => {
  it(`Returns my comments list`, async () => {
    const res = await request(app).get(`/my/comments`);

    expect(res.statusCode).toBe(StatusCode.OK);
    expect(res.body).toEqual(commentService.findMyCommentsWithTitles());
  });
});
