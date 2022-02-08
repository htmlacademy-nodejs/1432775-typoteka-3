"use strict";

const request = require(`supertest`);

const categories = require(`./categories`);
const CategoryService = require(`../data-service/category`);
const {StatusCode} = require(`../../const`);
const {createTestApi} = require(`../../utils/util`);

describe(`/categories route works correctly`, () => {
  let app;

  beforeAll(async () => {
    app = await createTestApi(categories, CategoryService);
  });

  it(`Returns categories list`, async () => {
    const res = await request(app).get(`/categories`);

    expect(res.statusCode).toBe(StatusCode.OK);
    expect(res.body.length).toBe(15);
    expect(res.body[0].id).toBe(1);
    expect(res.body[0].count).toBe(2);
  });

  describe(`Deletes category`, () => {
    it(`Deletes category if there aren't connected articles`, async () => {
      const res = await request(app).delete(`/categories/15`);

      expect(res.statusCode).toBe(StatusCode.OK);

      const checkRequest = await request(app).get(`/categories`);

      expect(checkRequest.body.length).toBe(14);
    });

    it(`Can't delete category if there is at least 1 connected article`, async () => {
      const res = await request(app).delete(`/categories/1`);

      expect(res.statusCode).toBe(StatusCode.FORBIDDEN);
    });

  });

  describe(`Adds category`, () => {
    it(`Adds valid category`, async () => {
      const categoryName = `newTestCategory`;
      const res = await request(app).post(`/categories`).send({name: categoryName});

      expect(res.statusCode).toBe(StatusCode.CREATED);

      expect(res.body.name).toBe(categoryName);
    });

    it(`Should return 400 if empty`, async () => {
      const res = await request(app).post(`/categories`).send({});

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Should return 400 if unexpected field`, async () => {
      const res = await request(app).post(`/categories`).send({name: `some name`, id: 6});

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Should return 400 if short name`, async () => {
      const categoryName = `new`;
      const res = await request(app).post(`/categories`).send({name: categoryName});

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Should return 400 if long name`, async () => {
      const categoryName = `new mega super ultimate long category`;
      const res = await request(app).post(`/categories`).send({name: categoryName});

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

  });

  describe(`Updates category`, () => {
    it(`Updates category`, async () => {
      const categoryNewName = `newTestCategory`;
      const res = await request(app).put(`/categories/4`).send({name: categoryNewName});

      expect(res.statusCode).toBe(StatusCode.OK);

      expect(res.body[0]).toBe(1);
    });

    it(`Should return 400 if empty`, async () => {
      const res = await request(app).put(`/categories/4`).send({});

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Should return 400 if unexpected field`, async () => {
      const res = await request(app).put(`/categories/4`).send({name: `some name`, id: 6});

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Should return 400 if short name`, async () => {
      const categoryName = `new`;
      const res = await request(app).put(`/categories/4`).send({name: categoryName});

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Should return 400 if long name`, async () => {
      const categoryName = `new mega super ultimate long category`;
      const res = await request(app).put(`/categories/4`).send({name: categoryName});

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

  });

});
