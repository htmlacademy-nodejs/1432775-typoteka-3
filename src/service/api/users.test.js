"use strict";

require(`dotenv`).config();
const request = require(`supertest`);

const users = require(`./users`);

const UsersService = require(`../data-service/user`);
const TokenService = require(`../data-service/token`);

const {StatusCode} = require(`../../const`);
const {createTestApi} = require(`../../utils/util`);

const validToCreationUser = {
  email: `validemail@e.com`,
  firstName: `Hans`,
  lastName: `Zibber`,
  password: `fgal3!cc`,
  repeatedPassword: `fgal3!cc`,
  avatar: `iPGA6J45Tb.PNG`,
};

let validAuthObj = {email: `admin@typoteka.com`, password: `12341234`};

describe(`/users route works correctly`, () => {
  let app;

  beforeAll(async () => {
    app = await createTestApi(users, UsersService, TokenService);
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

  describe(`Authorization works correctly`, () => {
    let preparedAuthObj;
    beforeEach(() => {
      preparedAuthObj = {...validAuthObj};
    });

    it(`Authorizes if everything is correct`, async () => {
      const res = await request(app).post(`/users/auth`).send(preparedAuthObj);

      expect(res.statusCode).toBe(StatusCode.OK);
      expect(res.body.user.id).toBe(1);
    });

    it(`Returns 400 if not all fields required`, async () => {
      await Promise.all(
          Object.keys(preparedAuthObj).map(async (key) => {
            delete preparedAuthObj[key];

            const res = await request(app)
            .post(`/users/auth`)
            .send(preparedAuthObj);

            expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
          })
      );
    });

    it(`Returns 400 if there is an unexpected field`, async () => {
      preparedAuthObj.unexpected = `some value`;

      const res = await request(app).post(`/users/auth`).send(preparedAuthObj);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Returns 400 if user doesn't exists`, async () => {
      preparedAuthObj.email = `us@ty.com`;

      const res = await request(app).post(`/users/auth`).send(preparedAuthObj);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });

    it(`Returns 400 if incorrect password`, async () => {
      preparedAuthObj.password = `hsre42`;

      const res = await request(app).post(`/users/auth`).send(preparedAuthObj);

      expect(res.statusCode).toBe(StatusCode.BAD_REQUEST);
    });
  });

  describe(`Token refreshing is correct`, () => {

    it(`Sends new tokens if refresh token is correct`, async () => {
      const authRes = await request(app)
      .post(`/users/auth`)
      .send(validAuthObj);

      expect(authRes.statusCode).toBe(StatusCode.OK);

      const token = authRes.body.tokens.refreshToken;
      const res = await request(app).post(`/users/refresh`).send({token});

      expect(res.statusCode).toBe(StatusCode.OK);
      expect(res.body.user.id).toBe(1);
    });

    it(`Returns 401 if token isn't correct`, async () => {
      const res = await request(app).post(`/users/refresh`).send({token: `nvjg2z.he3h53t1.ca`});

      expect(res.statusCode).toBe(StatusCode.UNAUTHORIZED);
    });

  });
});
