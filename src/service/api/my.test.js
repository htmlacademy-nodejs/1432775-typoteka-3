"use strict";

const request = require(`supertest`);

const my = require(`./my`);

const CommentService = require(`../data-service/comments-service`);
const NotesService = require(`../data-service/notes-service`);

const {StatusCode} = require(`../../const`);
const {createTestApi} = require(`../../utils/util`);

describe(`/my route works correctly`, () => {
  let app;

  beforeAll(async () => {
    app = await createTestApi(my, CommentService, NotesService);
  });

  it(`Returns my comments list`, async () => {
    const res = await request(app).get(`/my/comments`);

    expect(res.statusCode).toBe(StatusCode.OK);

    const isMy = res.body.every((comment) => comment.user.id === 1);
    expect(isMy).toBeTruthy();
  });

  it(`Returns my articles list`, async () => {
    const res = await request(app).get(`/my`);

    expect(res.statusCode).toBe(StatusCode.OK);

    const isMy = res.body.every((article) => article.userId === 1);
    expect(isMy).toBeTruthy();
  });
});
