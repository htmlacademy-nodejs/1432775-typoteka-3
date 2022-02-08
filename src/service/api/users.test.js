"use strict";

const request = require(`supertest`);

const users = require(`./users`);

const UsersService = require(`../data-service/user`);

const {StatusCode} = require(`../../const`);
const {createTestApi} = require(`../../utils/util`);

const validToCreationUser = {
  email: `validemail@e.com`,
  firstName: `Hans`,
  lastName: `Zibber`,
  password: `fgal3!cc`,
  repeatedPassword: `fgal3!cc`,
  avatar: `iPGA6J45Tb.PNG`
};

describe(`/users route works correctly`, () => {
  let app;

  beforeAll(async () => {
    app = await createTestApi(users, UsersService);
  });

  describe(`Creates user`, () => {

    let validUser;
    beforeEach(() => {
      validUser = {...validToCreationUser};
    });

    it(`Creates valid user`, async () => {
      const res = await request(app).post(`/users`).send(validUser);

      expect(res.statusCode).toBe(StatusCode.CREATED);
      expect(res.body).toBeTruthy();
    });

    it(`Creates valid user without avatar`, async () => {
      delete validUser.avatar;
      // not to register same email
      validUser.email = `a` + validUser.email;
      const res = await request(app).post(`/users`).send(validUser);

      expect(res.statusCode).toBe(StatusCode.CREATED);
      expect(res.body).toBeTruthy();
    });

    it(`Returns 400 if has already registered`, async () => {
      delete validUser.avatar;
      const res = await request(app).post(`/users`).send(validUser);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Returns 400 if not valid email`, async () => {
      validUser.email = `notvalid@1.c`;
      const res = await request(app).post(`/users`).send(validUser);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Returns 400 if not valid name`, async () => {
      validUser.firstName = `15^5#!`;
      const res = await request(app).post(`/users`).send(validUser);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Returns 400 if short password`, async () => {
      validUser.password = `three`;
      const res = await request(app).post(`/users`).send(validUser);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Returns 400 if repeated password doesn't match password`, async () => {
      validUser.repeatedPassword = `repeated`;
      const res = await request(app).post(`/users`).send(validUser);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

  });

});
