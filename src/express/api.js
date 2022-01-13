"use strict";

const axios = require(`axios`);

const {BACK_DEFAULT_PORT, TIMEOUT, StatusCode} = require(`../const`);
const {NotFoundErr} = require(`../utils/exceptions`);

class Api {
  constructor(baseUrl, timeout) {
    this._baseUrl = baseUrl;
    this._timeout = timeout;

    this._axios = axios.create({baseURL: baseUrl, timeout});
    this._setResponseInterceptors();
  }

  _setResponseInterceptors() {
    this._axios.interceptors.response.use(
        (res) => res,
        (err) => {
          const {status} = err.response;
          if (status === StatusCode.NOT_FOUND) {
            throw new NotFoundErr();
          }
          return Promise.reject(err.response);
        }
    );
  }

  async _request(url, options = {}) {
    const res = await this._axios.request({url, ...options});
    return res.data;
  }

  async getArticles(params) {
    return this._request(`/articles`, {params});
  }

  async getArticle(id, params) {
    return this._request(`/articles/${id}`, {params});
  }

  async createArticle(data) {
    return this._request(`/articles`, {method: `POST`, data});
  }

  async updateArticle(id, data) {
    return this._request(`/articles/${id}`, {method: `PUT`, data});
  }

  async deleteArticle(id) {
    return this._request(`/articles/${id}`, {method: `DELETE`});
  }

  async getCommentsToArticle(id) {
    return this._request(`/articles/${id}/comments`);
  }

  async getMyArticles() {
    return this._request(`/my`);
  }

  async getMyComments() {
    return this._request(`/my/comments`);
  }

  async getLatestComments(params) {
    return this._request(`/comments/latest`, {params});
  }

  async createComment(data, articleId) {
    return this._request(`/articles/${articleId}/comments`, {
      method: `POST`,
      data,
    });
  }

  async deleteComment(commentId, articleId) {
    return this._request(`/articles/${articleId}/comments/${commentId}`, {
      method: `DELETE`,
    });
  }

  async getCategories(articleId) {
    return this._request(
        `${articleId ? `articles/${articleId}/categories` : `/categories`}`
    );
  }

  async createCategory(articleId, data) {
    return this._request(`/articles/${articleId}/categories`, {
      method: `POST`,
      data,
    });
  }

  async updateCategory(categoryId, data) {
    return this._request(`/categories/${categoryId}`, {method: `PUT`, data});
  }

  async deleteCategory(categoryId) {
    return this._request(`/categories/${categoryId}`, {method: `DELETE`});
  }

  async search(query) {
    return this._request(`/search`, {params: {query}});
  }
}

const port = process.env.BACK_PORT || BACK_DEFAULT_PORT;
const url = `http://${process.env.API_HOST}:${port}/api/`;
const api = new Api(url, TIMEOUT);

module.exports = {
  Api,
  api,
};
