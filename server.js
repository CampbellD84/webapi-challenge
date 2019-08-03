const express = require("express");
const projectsRouter = require("./data/helpers/projectsRouter");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/projects", projectsRouter);

module.exports = server;
