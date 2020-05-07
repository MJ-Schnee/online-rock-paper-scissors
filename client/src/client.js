const writeEvent = (text) => {
    // Find the events <ul> element
    const parent = document.querySelector("#events");

    // Creates <li> element
    const el = document.createElement("li");
    el.innerHTML = text;

    parent.appendChild(el);
};

writeEvent('Welcome to Rock Paper Scissors');


const onFormSubmitted = (event) => {
    event.preventDefault(); // Stops browser from reloading the page

    const input = document.querySelector("#chat"); // Get current input
    const text = input.value; // Store that input for later
    input.value = ""; // Reset the input

    socket.emit("message", text);
};

const socket = io(); // Global variable to allow client to access the socket
socket.on("message",  writeEvent); // Whenever a message is passed on the socket, alert the client

document.querySelector("#chat-form").addEventListener("submit", onFormSubmitted);