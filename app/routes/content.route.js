/**'use strict';
var multer = require("multer");
var express = require("express");
var router = express.Router();
module.exports = router;

var contentController = require("../controllers/content.controller.js");
var multerMiddleware = multer({ "dest": "/tmp/" })

// Get all contents
router.get("/contents", contentController.list);

// Create
router.post("/contents", multerMiddleware.single("file"), contentController.create);

// Get a specific content
router.get("/contents/:contentId", contentController.read);

// Recover the contentId of the request
router.param("contendId", function(req, res, next, id) {
  req.contendId = id;
  next();
});*/
