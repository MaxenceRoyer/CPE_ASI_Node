"use strict";

const fs = require('fs');
var CONFIG = require("../../config.json");
const contentDirectory = CONFIG.contentDirectory;

class ContentModel {

  constructor(id, type, title, src, fileName) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.src = src;
    this.fileName = fileName;


    this.getData = () => this._data;
    this.setData = function(data) {
      this._data = data;
    }
  }

  create(content, callback) {
    console.log(content);
    if (content.type == "img") {
      fs.writeFile(contentDirectory.concat(content.fileName), content._data, function (err) {
          if (err) throw err;
          console.log("[ContentModel] Write file (type img) " + contentDirectory.concat(content.fileName));

          fs.writeFile(contentDirectory.concat("/").concat(content.id).concat(".meta.json"), JSON.stringify(content, null, 4), function (err) {
            if (err) throw err;
            console.log("[ContentModel] Write file " + contentDirectory.concat("/").concat(content.id).concat(".meta.json"));
          });
      });
    } else {
      fs.writeFile(contentDirectory.concat("/").concat(content.id).concat(".meta.json"), JSON.stringify(content, null, 4), function (err) {
        if (err) throw err;
        console.log("[ContentModel] Write file " + contentDirectory.concat("/").concat(content.id).concat(".meta.json"));
      });
    }
  };

  read(id, callback) {
    fs.readFile(contentDirectory.concat("/").concat(id).concat(".meta.json"), function(err, data) {
      if (err) throw err;
      console.log("[ContentModel] Read file " + data);
      return data;
    });
  };

  update(content, callback) {
    fs.writeFile(contentDirectory.concat("/").concat(content.id).concat(".meta.json"), content.getData(), function(err) {
      if (err) throw err;
      console.log("[ContentModel] Update file " + contentDirectory.concat("/").concat(content.id).concat(".meta.json"));

      if (content.type == "img" && content.getData().length > 0) {
        fs.writeFile(contentDirectory.concat("/").concat(content.fileName), content.getData(), function(err) {
          if (err) throw err;
          console.log("[ContentModel] Update file " + contentDirectory.concat("/").concat(content.fileName));
        });
      }
    });
  }

  delete(id, callback) {
    fs.unlink(contentDirectory.concat("/").concat(id).concat(".meta.json"), function(err) {
      if (err) throw err;
      console.log("[ContentModel] Delete file " + contentDirectory.concat("/").concat(id).concat(".meta.json"));
    });
  };
}

module.exports = ContentModel;
