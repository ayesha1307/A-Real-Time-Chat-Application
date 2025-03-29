const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); // Serve static files

io.on("connection", (socket) => {
    console.log("A user connected");

    // Join a Room
    socket.on("joinRoom", ({ username, room }) => {
        socket.join(room);
        socket.to(room).emit("message", `${username} joined the room`);
        console.log(`${username} joined room ${room}`);
    });

    // Handle Chat Messages
    socket.on("chatMessage", ({ username, room, message }) => {
        io.to(room).emit("message", `${username}: ${message}`);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
