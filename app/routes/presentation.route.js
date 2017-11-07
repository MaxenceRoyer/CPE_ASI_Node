var express = require("express");
var router = express.Router();
module.exports = router;
var CONFIG = require("../../config.json");

// List presentations fils - GET request
router.route("/loadPres")
  .get(function(request, response) {
    console.log("GET /loadPres");
    const presentationDirectory = CONFIG.presentationDirectory;
    const fs = require('fs');
    var i = 0, nb = 0;

    fs.readdir(presentationDirectory, function(err, files) {
      if (err) throw err;

      // The number of files of directory
      files.forEach(function(file) {
        var filePath = presentationDirectory + "/" + file,
            fileContent = fs.readFileSync(filePath);

        if (validateJSON(filePath, fileContent)) {
          nb++;
        }
      });

      // JSON for the answer
      var stringJSON = "{";
      fs.readdir(presentationDirectory, function(err, files) {
        if (err) throw err;

        files.forEach(function(file) {
          i++;
          var filePath = presentationDirectory + "/" + file,
              fileContent = fs.readFileSync(filePath);

          if (validateJSON(filePath, fileContent)) {
            console.log("--- Read file : " + filePath);
            var valueToConcat = '"pres'
                                .concat(i)
                                .concat('.id')
                                .concat('"')
                                .concat(':')
                                .concat('"')
                                .concat(JSON.parse(fileContent))
                                .concat('"');
            if (i != nb) {
              valueToConcat += ",";
            }
            stringJSON += valueToConcat;
          } else {
            console.log("--- Ignore file : " + filePath);
          }
        })
        stringJSON += "}";

        // Response
        if (nb > 0) {
          // Parse the result in JSON
          var resultJSON = JSON.parse(stringJSON);
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(resultJSON, null, 4));
          response.end();
        }
      })
    })
  })

// Method used to test if the file is a JSON
function validateJSON(filename, body) {
  try {
    if (filename.includes(".json")) {
      var data = JSON.parse(body);
      return data;
    } else {
      return false;
    }
  } catch(e) {
    return false;
  }
}

// Save presentations - POST request
router.route("/savePres")
  .post(function(request, response) {
    console.log("\nGET /savePres");
    const fs = require('fs');
    const presentationDirectory = CONFIG.presentationDirectory;

    if (request.body.name != null && request.body.contenuJSON != null) {
      var fileName = presentationDirectory.concat("/").concat(request.body.name).concat(".pres.json");
      try {
        fs.writeFile(fileName, JSON.stringify(request.body.contenuJSON, null, 4), function (err) {
            if (err) throw err;
            console.log("--- Document [" + fileName + "] saved !");
        });
      } catch (err) {
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.end("contenuJSON is not JSON !");
      }

      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("Document [" + fileName + "] saved !");
    } else {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Bad parameters.");
    }
  })
