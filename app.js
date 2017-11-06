'use strict';

var express = require("express");
var http = require("http");
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG); // module's access to the configuration
var defaultRoute = require("./app/routes/default.route.js");
var path = require("path");

var app = express();
app.use(defaultRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

var server = http.createServer(app); // init the server
server.listen(CONFIG.port);

//console.log("It works !");
