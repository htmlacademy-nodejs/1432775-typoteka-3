"use strict";

const request = require(`supertest`);

const search = require(`./search`);
const SearchService = require(`../data-service/SearchService`);

const {StatusCode} = require(`../../const`);
const {createTestApi} = require(`../../utils/util`);

describe(`/search route works correctly`, () => {
  let app;

  beforeAll(async () => {
    app = await createTestApi(search, SearchService);
  });

  const getSearchResponse = async (query) => {
    return await request(app).get(`/search`).query({
      query,
    });
  };

  it(`Should find one match`, async () => {
    const res = await getSearchResponse(`альбом`);

    expect(res.statusCode).toBe(StatusCode.OK);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe(`Самый лучший музыкальный альбом этого года`);
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
