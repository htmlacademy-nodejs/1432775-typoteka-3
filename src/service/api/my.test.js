"use strict";

require(`dotenv`).config();
const stdRequest = require(`supertest`);

const my = require(`./my`);

const CommentService = require(`../data-service/comments-service`);
const NotesService = require(`../data-service/notes-service`);

const {StatusCode, HttpMethod} = require(`../../const`);
const {createTestApi} = require(`../../utils/util`);
const configRequest = require(`../../utils/supertest`);

describe(`/my route works correctly`, () => {
  let app;
  let request;

  beforeAll(async () => {
    app = await createTestApi(
        my,
        CommentService,
        NotesService
    );

    const res = await stdRequest(app)
      .post(`/users/auth`)
      .send({email: `admin@typoteka.com`, password: `12341234`});

    request = configRequest(app, res.body.tokens.accessToken);
  });

  it(`Returns comments list`, async () => {
    const res = await request(HttpMethod.GET, `/my/comments`);

    expect(res.statusCode).toBe(StatusCode.OK);
    expect(res.body.length).toBe(15);
  });

  it(`Returns my articles list`, async () => {
    const res = await request(HttpMethod.GET, `/my`);


    expect(res.statusCode).toBe(StatusCode.OK);

    const isMy = res.body.every((article) => article.userId === 1);
    expect(isMy).toBeTruthy();
  });
});
