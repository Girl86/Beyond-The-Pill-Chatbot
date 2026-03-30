// script.js

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messagesDiv = document.getElementById("messages");

// Backend URL
const apiUrl = "http://127.0.0.1:5000/chat";

// Function to append messages to chat
function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(sender === "user" ? "user" : "bot");
    messageDiv.innerText = `${sender.toUpperCase()}: ${text}`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // auto scroll
}

// Send message function
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) throw new Error("Backend error");

        const data = await response.json();
        appendMessage("bot", data.reply);
    } catch (err) {
        appendMessage("bot", "Error: Could not reach backend.");
        console.error(err);
    }
}

// Event listener for Enter key
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Event listener for Send button
sendBtn.addEventListener("click", sendMessage);