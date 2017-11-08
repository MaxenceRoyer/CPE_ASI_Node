'use strict';
var express = require("express");
var router = express.Router();
module.exports = router;

router.route("/")
  .get(function(request, response) {
    console.log("GET /");
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("<h1>It works !</h1>");
    response.end();
  })
