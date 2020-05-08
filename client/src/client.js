const writeEvent = (text) => {
    // Find the events <ul> element
    const parent = document.querySelector("#events");

    // Creates <li> element
    let el = document.createElement("li");
    el.innerHTML = text;

    parent.appendChild(el);

    // Keeps the chat scrolled to the bottom when updated
    parent.scrollTop = parent.scrollHeight - parent.clientHeight;
};

// Lets the players use the chat
const onFormSubmitted = (event) => {
    event.preventDefault(); // Stops browser from reloading the page

    const input = document.querySelector("#chat"); // Get current input
    const text = input.value; // Store that input for later
    input.value = ""; // Reset the input

    socket.emit("message", text);
};

// Adds listeners to each of the buttons
// When a button is clicked, let the server know they selected that move
const addButtonListeners = () => {
    ["rock", "paper", "scissors"].forEach( (id) => {
        const button = document.getElementById(id);
        button.addEventListener("click", () => {
            socket.emit("move", id);
        });
    });
};

writeEvent('Welcome to Rock Paper Scissors');

const socket = io(); // Global variable to allow client to access the socket
socket.on("message",  writeEvent); // Whenever a message is passed on the socket, alert the client

document.querySelector("#chat-form").addEventListener("submit", onFormSubmitted);
addButtonListeners();