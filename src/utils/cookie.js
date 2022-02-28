"use strict";

const Cookie = {
  ACCESS_TOKEN: `accessToken`,
  REFRESH_TOKEN: `refreshToken`,
  USER: `user`,
};

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

const setCookie = (res, {accessToken, refreshToken}, user) => {
  res.cookie(Cookie.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
  });
  res.cookie(Cookie.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
  });

  res.cookie(Cookie.USER, user, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
  });
};

const clearCookie = (res) => {
  res.clearCookie(Cookie.ACCESS_TOKEN);
  res.clearCookie(Cookie.REFRESH_TOKEN);
  res.clearCookie(Cookie.USER);
};

module.exports = {
  Cookie,
  setCookie,
  clearCookie
};
