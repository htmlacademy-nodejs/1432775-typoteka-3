"use strict";

const express = require(`express`);
const request = require(`supertest`);

const categories = require(`./categories`);
const DataService = require(`../data-service/index`);
const {testCategories} = require(`../testData`);
const {StatusCode} = require(`../../const`);

const app = express();
app.use(express.json());

categories(app, new DataService(testCategories));

describe(`/categories route works correctly`, () => {
  it(`Returns categories list`, async () => {
    const res = await request(app).get(`/categories`);

    expect(res.statusCode).toBe(StatusCode.OK);
    expect(res.body).toEqual(testCategories);
  });
});
