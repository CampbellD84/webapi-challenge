const express = require("express");
const projectsRouter = require("./data/helpers/projectsRouter");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/projects", projectsRouter);

module.exports = server;
