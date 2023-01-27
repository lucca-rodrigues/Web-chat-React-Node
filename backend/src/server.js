const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("message", (msg) => {
    console.log(`Message received: ${msg}`);
    io.emit("message", msg);

    socket.emit("response", "Response to message received");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send({
    response: "Status ok!",
  });
});

server.listen(3333, () => {
  console.log("Server started on port 3333");
});
