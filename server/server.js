const http = require('http');
const express = require('express'); // Handles connection
const socketio = require('socket.io'); // function to allow realtime communication between client and server

const app = express(); // Object and function, handled by express

// Gets the path of the client application from the root directory
const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath)); // Allows the app to access static files

const server = http.createServer(app); // Register express as the listener for the server; What to do while client is connecting

const io = socketio(server); // Turns on realtime client-server communication

io.on("connection", (socket) => {
    console.log("A user has connected");
    socket.emit("message", "Connected to rock-paper-scissors game"); // Send a message to the current client connected

    socket.on("message", (text) => {
        io.emit("message", text); // Sends a message to every client
    });
});

server.on("error", (err) => {
    console.error(`Server error: ${err}`);
});

server.listen(8080, () => {
    console.log("Connection to Rock-Paper-Scissors has been started on port 8080");
});