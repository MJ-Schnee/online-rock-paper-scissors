const http = require('http');
const express = require('express'); // Handles connection
const socketio = require('socket.io'); // function to allow realtime communication between client and server

const app = express(); // Object and function, handled by express

const RockPaperScissorsGame = require("./rps-game-logic"); // Lets us create new games

// Gets the path of the client application from the root directory
const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath)); // Allows the app to access static files

const server = http.createServer(app); // Register express as the listener for the server; What to do while client is connecting

const io = socketio(server); // Turns on realtime client-server communication

let waitingPlayer = null; // Waiting player is initialized to null because there is no one on the server

io.on("connection", (socket) => {
    
    // Once a player has connected, check if there is there are other connected players
    // If there aren't, waitingPlayer will be null
    if (waitingPlayer) {
        // Create a new Rock Paper Scissors game with the two new players
        new RockPaperScissorsGame(waitingPlayer, socket);

        // No more waiting players since a game has started
        waitingPlayer = null;
    }
    // If there is no other waiting player but someone has connected, we can say that the waiting player is a new socket
    else {
        waitingPlayer = socket;
        waitingPlayer.emit("message", "Waiting for another player...");
    }

    // Whenever a socket sends a message, send it across the entire server
    socket.on("message", (text) => {
        io.emit("message", text);
    });
});

server.on("error", (err) => {
    console.error(`Server error: ${err}`);
});

server.listen(8080, () => {
    console.log("Connection to Rock-Paper-Scissors has been started on port 8080");
});