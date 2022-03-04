"use strict";

const {Server} = require(`socket.io`);
const {HttpMethod} = require(`../const`);

module.exports = (server) => new Server(server, {
  cors: {
    origins: [`${process.env.API_HOST}:${process.env.FRONT_PORT}`],
    methods: [HttpMethod.GET],
  }
});
