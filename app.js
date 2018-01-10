const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting! // this initializes a new instance of socketIo
// by passing it in the server object. This "wires up" the server to Socket.IO
const getApiAndEmit = "TODO"