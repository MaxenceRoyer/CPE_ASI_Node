"use strict";

var IOController = function(name) {

  var myMap = new Map();

  this.listen = function(server) {
    server.listen(1337, function() {
      console.log("[SocketIO] : listening on *:1337");
    });
  }

  this.connection = function(server) {
    var io = require("socket.io")(server);
    io.on("connection", function(socket) {
      console.log("[SocketIO] : an user open a new connection !");
      // emit the event
      io.emit("data_comm", { for: "everyone" });
      console.log("[SocketIO] : emit an event data_comm");

      socket.on("data_comm", function() {
        myMap.set(socket.id, socket);
        console.log("[SocketIO] : add a socket to the map : " + socket.id);

      });

      socket.on("slidEvent", function(msg) {
        console.log("[SocketIO] : slidEvent, value received : " + msg);
        io.emit("currentSlidEvent", null);

        if (msg.CMD == "START") {
          // TO_DO
        } else if (msg.CMD == "PAUSE") {
          // TO_DO
        } else if (msg.CMD == "END") {
          // TO_DO
        } else if (msg.CMD == "BEGIN") {
          // TO_DO
        } else if (msg.CMD == "PREV") {
          // TO_DO
        } else if (msg.CMD == "NEXT") {

        }
      });
    });
  }

}
exports.IOController = IOController;
