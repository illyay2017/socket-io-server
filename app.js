const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const config = require("./config/config.js");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting! // this initializes a new instance of socketIo
// by passing it in the server object. This "wires up" the server to Socket.IO
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  // console.log(config.darkSkyKey);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => { // need to learn what this is doing, i think its axios
  try {
    const res = await axios.get(
    	// ****** NEED TO REFACTOR API KEY TO A .GITIGNORED CONFIG FILE! ******
      `https://api.darksky.net/forecast/${config.darkSkyKey}/43.7695,11.2558`
    );
    socket.emit("FromAPI", res.data.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));