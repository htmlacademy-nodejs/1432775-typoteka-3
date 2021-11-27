"use strict";

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const NoteService = require(`../data-service/NotesService`);
const {testNotes} = require(`../testData`);
const {StatusCode} = require(`../../const`);

const app = express();
app.use(express.json());

search(app, new NoteService(testNotes));

const getSearchResponse = async (query) => {
  return await request(app).get(`/search`).query({
    query,
  });
};

describe(`/search route works correctly`, () => {
  it(`Should find one match`, async () => {
    const res = await getSearchResponse(`Великое новое`);

    expect(res.statusCode).toBe(StatusCode.OK);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toBe(`7BdzEYyBO_`);
  });

  it(`Should be no matches`, async () => {
    const res = await getSearchResponse(`&^$^@`);

    expect(res.statusCode).toBe(StatusCode.OK);
    expect(res.body.length).toBe(0);
  });

  it(`Should be 400 when query is empty`, async () => {
    const res = await getSearchResponse(``);

    expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
  });

  it(`Should be 400 when query consists of spaces`, async () => {
    const res = await getSearchResponse(`     `);

    expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
  });
});
