"use strict";

const axios = require(`axios`);

const {
  BACK_DEFAULT_PORT,
  TIMEOUT,
  StatusCode,
  HttpMethod,
} = require(`../const`);
const {NotFoundErr, ValidationErr, UnauthorizedErr} = require(`../utils/exceptions`);
const {setTokens} = require(`../utils/util`);

class Api {
  constructor(baseUrl, timeout) {
    this._baseUrl = baseUrl;
    this._timeout = timeout;
    this._tokens = {
      refreshToken: null,
      accessToken: null,
    };
    this._res = null;

    this._axios = axios.create({
      baseURL: baseUrl,
      timeout,
    });

    this._setResponseInterceptors();
    this._setRequestInterceptors();

    this.getCategories = this.getCategories.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.getCommentsToArticle = this.getCommentsToArticle.bind(this);
    this.getMyArticles = this.getMyArticles.bind(this);
    this.getMyComments = this.getMyComments.bind(this);
    this.getLatestComments = this.getLatestComments.bind(this);
    this.createComment = this.createComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.createUser = this.createUser.bind(this);
    this.login = this.login.bind(this);
    this.search = this.search.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.prepareRequest = this.prepareRequest.bind(this);
  }

  _setRequestInterceptors() {
    this._axios.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ` + this._tokens.accessToken;
      return config;
    });
  }

  _setResponseInterceptors() {
    this._axios.interceptors.response.use(
        async (res) => {

          if (res.status === StatusCode.TOKEN_REFRESH) {
            try {
              const tokens = await this.refreshToken({token: this._tokens.refreshToken});
              setTokens(this._res, tokens);
              this._tokens = tokens;
              return this._axios.request(res.config);
            } catch (e) {
              throw new UnauthorizedErr();
            }
          }

          return res;
        },
        async (err) => {
          const {status} = err.response;
          switch (status) {
            case StatusCode.NOT_FOUND:
              throw new NotFoundErr();

            case StatusCode.BAD_REQUEST:
              throw new ValidationErr(err);

            case StatusCode.UNAUTHORIZED:
              throw new UnauthorizedErr();
          }
          return Promise.reject(err);
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
    return this._request(`/articles`, {method: HttpMethod.POST, data});
  }

  async updateArticle(id, data) {
    return this._request(`/articles/${id}`, {method: HttpMethod.PUT, data});
  }

  async deleteArticle(id) {
    return this._request(`/articles/${id}`, {method: HttpMethod.DELETE});
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
      method: HttpMethod.POST,
      data,
    });
  }

  async deleteComment(commentId, articleId) {
    return this._request(`/articles/${articleId}/comments/${commentId}`, {
      method: HttpMethod.DELETE,
    });
  }

  async getCategories(articleId) {
    return this._request(
        `${articleId ? `articles/${articleId}/categories` : `/categories`}`
    );
  }

  async createCategory(data) {
    return this._request(`/categories`, {
      method: HttpMethod.POST,
      data,
    });
  }

  async updateCategory(categoryId, data) {
    return this._request(`/categories/${categoryId}`, {
      method: HttpMethod.PUT,
      data,
    });
  }

  async deleteCategory(categoryId) {
    return this._request(`/categories/${categoryId}`, {
      method: HttpMethod.DELETE,
    });
  }

  async createUser(data) {
    return this._request(`/users`, {method: HttpMethod.POST, data});
  }

  async login(data) {
    return this._request(`/users/auth`, {method: HttpMethod.POST, data});
  }

  async search(query) {
    return this._request(`/search`, {params: {query}});
  }

  async refreshToken(data) {
    return this._request(`/users/refresh`, {method: HttpMethod.POST, data});
  }

  prepareRequest(tokens, res) {
    this._tokens = tokens;
    this._res = res;
  }
}

const port = process.env.BACK_PORT || BACK_DEFAULT_PORT;
const url = `http://${process.env.API_HOST}:${port}/api/`;
const api = new Api(url, TIMEOUT);

module.exports = {
  Api,
  api,
};
