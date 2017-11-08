const fs = require('fs');
var CONFIG = require("../../config.json");
const contentDirectory = CONFIG.contentDirectory;

/**
* Creation Class
*/
function ContentModel (jsonObject) {
    this.id = jsonObject.id;
    this.type = jsonObject.type;
    this.title = jsonObject.title;
    this.src = jsonObject.src;
    this.fileName = jsonObject.fileName;
    var data = jsonObject.data;
}

/**
* Constructeur
*/
module.exports = function(param) {
    return({
        myInstance: new ContentModel(fs.readFileSync(filePath = contentDirectory + "/" + "62cf58dd-ecb1-495a-899c-b7c633fa1df7.meta.json"))
    });
}

/**
* Create
*/
ContentModel.prototype.create = function(content, callback) {
    this.fileName = content.data
    return this.str;
};

/**
* Read
*/
ContentModel.prototype.read = function(id, callback) {
    
    return this.str;
};

/**
* Update
*/
ContentModel.prototype.update = function(content, callback) {
    
    return this.str;
};

/**
* Delete
*/
ContentModel.prototype.delete = function(id, callback) {
    
    return this.str;
};

/**
* GetData
*/
ContentModel.getData = function() {
    
    return data;
};

/**
* SetData
*/
ContentModel.setData = function(data) {
    this._data = data;
};
