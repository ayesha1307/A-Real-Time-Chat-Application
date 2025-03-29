const socket = io();

const joinBtn = document.getElementById("joinRoomBtn");
const usernameInput = document.getElementById("username");
const roomInput = document.getElementById("room");
const chatContainer = document.querySelector(".chat-container");
const roomNameDisplay = document.getElementById("roomId");
const chatMessages = document.querySelector(".chat-messages");
const messageInput = document.querySelector(".chat-input");
const sendButton = document.querySelector(".send-button");
const clearButton = document.querySelector(".clear-chat-button");

let username, room;

// Join Room
joinBtn.addEventListener("click", () => {
    username = usernameInput.value.trim();
    room = roomInput.value.trim();

    if (username && room) {
        socket.emit("joinRoom", { username, room });

        // Hide join section and show chat
        document.querySelector(".container").style.display = "none";
        chatContainer.style.display = "block";
        roomNameDisplay.textContent = room;
    } else {
        alert("Please enter both username and room ID");
    }
});

// Send Message
sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("chatMessage", { username, room, message });
        messageInput.value = "";
    }
}

// Receive Message
socket.on("message", (msg) => {
    const msgElement = document.createElement("p");
    msgElement.textContent = msg;
    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Clear Chat
clearButton.addEventListener("click", () => {
    chatMessages.innerHTML = "";
});
