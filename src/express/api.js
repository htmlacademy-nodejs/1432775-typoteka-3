"use strict";

const axios = require(`axios`);

const {BACK_DEFAULT_PORT, TIMEOUT} = require(`../const`);
const {adaptArticleToClient} = require(`../utils/adapter`);

class Api {
  constructor(baseUrl, timeout) {
    this._baseUrl = baseUrl;
    this._timeout = timeout;

    this._axios = axios.create({baseURL: baseUrl, timeout});
  }

  async _request(url, options = {}) {
    const res = await this._axios.request({url, ...options});
    return res.data;
  }

  async _requestArticles(url, options = {}) {
    const articles = await this._request(url, options);
    return Array.isArray(articles)
      ? articles.map((article) => adaptArticleToClient(article))
      : adaptArticleToClient(articles);
  }

  async getArticles() {
    return this._requestArticles(`/articles`);
  }

  async getMyArticles() {
    return this._requestArticles(`/articles`);
  }

  async getArticle(id) {
    return this._requestArticles(`/articles/${id}`);
  }

  async createArticle(data) {
    return this._request(`/articles`, {method: `POST`, data});
  }

  async updateArticle(id, data) {
    return this._request(`/articles/${id}`, {method: `PUT`, data});
  }

  async getMyComments() {
    return this._request(`/my/comments`);
  }

  async getCategories() {
    return this._request(`/categories`);
  }

  async search(query) {
    return this._requestArticles(`/search`, {params: {query}});
  }
}

const port = process.env.BACK_PORT || BACK_DEFAULT_PORT;
const url = process.env.API_URL || `http://localhost:${port}/api/`;
const api = new Api(url, TIMEOUT);

module.exports = {
  Api,
  api,
};
