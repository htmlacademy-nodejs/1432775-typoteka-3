"use strict";

require(`dotenv`).config();
const request = require(`supertest`);

const comments = require(`./comments`);
const CommentService = require(`../data-service/comments-service`);

const {StatusCode} = require(`../../const`);
const {createTestApi} = require(`../../utils/util`);

describe(`/my route works correctly`, () => {
  let app;

  beforeAll(async () => {
    app = await createTestApi(comments, CommentService);
  });

  it(`Returns latest comments with limit`, async () => {
    const res = await request(app).get(`/comments/latest?limit=4`);

    expect(res.statusCode).toBe(StatusCode.OK);
    expect(res.body.length).toBe(4);
    expect(res.body[0].id).toBe(10);
  });
});
