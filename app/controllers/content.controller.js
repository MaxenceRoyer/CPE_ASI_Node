"use strict";
var ContentModel = require("../models/content.model.js");
var CONFIG = require("../../config.json");
var utils = require("../utils/utils.js");
const fs = require('fs');

class ContentController {

  // Empty constructor
  constructor() {
    this.contentModel = new ContentModel();
  }

  // Return the list of ContentModel of the directory
  static list(request, response) {
    console.log("GET /contents");
    const presentationDirectory = CONFIG.contentDirectory;
    const fs = require('fs');
    var i = 0, nb = 0;

    fs.readdir(presentationDirectory, function(err, files) {
      if (err) console.log(err);

      // The number of files of directory
      files.forEach(function(file) {
        var filePath = presentationDirectory + "/" + file,
            fileContent = fs.readFileSync(filePath);

        if (utils.validateJSON(filePath, fileContent)) {
          nb++;
        }
      });

      // JSON for the answer
      var stringJSON = "{";
      fs.readdir(presentationDirectory, function(err, files) {
        if (err) console.log(err);
        var array_return = [];
        files.forEach(function(file) {
          var filePath = presentationDirectory + "/" + file,
              fileContent = fs.readFileSync(filePath);

          if (utils.validateJSON(filePath, fileContent)) {
            i++;
            console.log("--- Read file : " + filePath);

            let parseContent = JSON.parse(fileContent);
            var fileContent = JSON.parse(fileContent);
            var key = "content".concat(parseContent.id).concat(".id");
            var valueToConcat = { [key]: parseContent};
            array_return.push(valueToConcat);
          } else {
            console.log("--- Ignore file : " + filePath);
          }
        })
        stringJSON += "}";

        // Response
        if (nb > 0) {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(array_return, null, 4));
          response.end();
        }
      });
    });
  }

  // Create a new ContentModel
  static create(request, response) {
    var content = new ContentModel();
    console.dir(request.file);
    content.id = utils.generateUUID();
    content.type = request.body.type;
    content.title = request.body.title;
    if (content.type != "img") {
      content.src = src;

      ContentModel.create(content, function(err, callback) {
        if (err) {
          response.writeHead(500, { "Content-Type": "application/json" });
          let jsonMessage = {"msg" : "An error has occured when create the ContentModel"};
          response.write(JSON.stringify(jsonMessage, null, 4));
          response.end();
        } else {
          response.writeHead(200, { "Content-Type": "application/json" });
          let jsonMessage = {"msg" : "File created", "fileName" : content.fileName};
          response.write(JSON.stringify(jsonMessage, null, 4));
          response.end();
        }
      });
    } else {
      fs.readFile(request.file.path, function(err, data) {
        content.setData(data);
        content.fileName = utils.getNewFileName(content.id, request.file.originalname);
        ContentController.finalCreate(content, response);
      })
    }
  }

  // Create
  static finalCreate(content, response) {
    ContentModel.create(content, function(err, callback) {
      if (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        let jsonMessage = {"msg" : "An error has occured when create the ContentModel"};
        response.write(JSON.stringify(jsonMessage, null, 4));
        response.end();
      } else {
        response.writeHead(200, { "Content-Type": "application/json" });
        let jsonMessage = {"msg" : "File created", "fileName" : content.fileName};
        response.write(JSON.stringify(jsonMessage, null, 4));
        response.end();
      }
    });
  }

  // Read a ContentModel
  static read(request, response) {
    console.log("GET /contents/" + request.params.contentId);
    ContentModel.read(request.params.contentId, function(err, call) {
      if (err) {
        response.writeHead(404, { "Content-Type": "application/json" });
        let jsonMessage = {"msg" : "File doesn't exists !"};
        response.write(JSON.stringify(jsonMessage, null, 4));
        response.end();
      } else {
        call = JSON.parse(call);
        // Image
        if (call.type == 'img') {
          response.sendFile(__dirname + call.fileName);
          response.end();
        } else if (request.query.json == 'true') { // MetaData
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(call, null, 4));
        } else if (call.src !== "/contents/".concat(call.id)) { // Redirection
          let body = "Redirection";
          response.writeHead(301, {
               'Location': call.src,
               'Content-Length': body.length,
               'Content-Type': 'text/plain' });
        }

        response.end();
      }
    });
  }

}

module.exports = ContentController;
