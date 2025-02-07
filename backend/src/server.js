const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(
  cors({
    origin: "http://localhost:3000", // replace with your React app's origin
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
  })
);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("message", (data) => {
    const { username, message } = data;
    console.log(`Message received from ${username}: ${message}`);
    io.emit("message", `${username}: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// app.get("/", (req, res) => {
//   res.send({
//     response: "Status ok!",
//   });
// });

server.listen(3333, () => {
  console.log("Server started on port 3333");
});
