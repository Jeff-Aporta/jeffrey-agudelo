"use strict";

require("./app/tools")();

const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const config = require("./app/config");
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.use(urlencodedParser);
app.set("view engine", "ejs");

const zip = require("./app/archivos/zip")();

const openai = require("./app/openai");

const pack_app = {
  openai,
  io,
  app,
  config,
  zip,
  urlencodedParser,
};


server.listen(app.get("port"), () => {
  console.log("corriendo en el puerto:", app.get("port"));
});

require("./app/socket.io")(pack_app);
require("./app/routes")(pack_app);
