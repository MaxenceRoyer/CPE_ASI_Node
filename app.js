'use strict';

var express = require("express");
var http = require("http");
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG); // module's access to the configuration
var defaultRoute = require("./app/routes/default.route.js");
var presentationRoute = require("./app/routes/presentation.route.js");
var contentRoute = require("./app/routes/content.route.js");
var path = require("path");
var bodyParser = require("body-parser");
var IOControllerModule = require("./app/controllers/io.controller.js");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(defaultRoute);
app.use(presentationRoute);
app.use(contentRoute);
app.use("/admin", express.static(path.join(__dirname, "/public/admin")));
app.use("/watch", express.static(path.join(__dirname, "/public/watch")));

var server = http.createServer(app); // init the server
server.listen(CONFIG.port);
var IOController = new IOControllerModule.IOController();
IOController.listen(server);
IOController.connection(server);
