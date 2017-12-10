"use strict";

const fs = require('fs');
var CONFIG = require("../../config.json");
const contentDirectory = CONFIG.contentDirectory;
var utils = require("../utils/utils.js");

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

    /**     let _data;
        this.getData = () =>_data;
        this.setData = function(data) {
          _data = data;
        } */
  }

  static create(content, callback) {
    if (content.type == "img") {
      fs.writeFile(utils.getDataFilePath(content.fileName), content._data, function (err) {
          if (err) callback(err);
          console.log("[ContentModel] Write file (type img) " + utils.getDataFilePath(content.fileName));

          fs.writeFile(utils.getMetaFilePath(content.id), JSON.stringify(content, null, 4), function (err) {
            if (err) callback(err);
            console.log("[ContentModel] Write file " + utils.getMetaFilePath(content.id));

            callback();
          });
      });
    } else {
      fs.writeFile(utils.getMetaFilePath(content.id), JSON.stringify(content, null, 4), function (err) {
        if (err) callback(err);
        console.log("[ContentModel] Write file " + utils.getMetaFilePath(content.id));
        callback();
      });
    }
  };

  static read(id, callback) {
    console.log(utils.getMetaFilePath(id));
    utils.readFileIfExists(utils.getMetaFilePath(id), function(err, data) {
      if (err) {
         console.log("[ContentModel] Error");
         callback(err);
      } else {
         console.log("[ContentModel] Read file data : " + data);
         callback(null, data);
      }
    });
  }

  static update(content, callback) {
    fs.writeFile(utils.getMetaFilePath(content.id), content.getData(), function(err) {
      if (err) callback(err);
      console.log("[ContentModel] Update file " + utils.getMetaFilePath(content.id));

      if (content.type == "img" && content.getData().length > 0) {
        fs.writeFile(utils.getDataFilePath(content.fileName), content.getData(), function(err) {
          if (err) callback(err);
          console.log("[ContentModel] Update file " + utils.getDataFilePath(content.fileName));
          callback();
        });
      }
    });
  }

  static delete(id, callback) {

// TODO : Lire le content via son ID
// - Supprimer si filename existe (data)
// - Supprimer les meta

    fs.unlink(utils.getMetaFilePath(id), function(err) {
      if (err) callback(err);
      console.log("[ContentModel] Delete file " + utils.getMetaFilePath(id));
      callback();
    });
  };
}

module.exports = ContentModel;
