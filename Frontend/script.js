// Function to send message to backend
async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();

    if (message === "") return;

    const chatBox = document.getElementById("messages");

    // Display user message
    chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;

    // Clear input
    inputField.value = "";

    try {
        // Send message to Flask backend
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        // Display bot reply
        chatBox.innerHTML += `<div class="message bot"><strong>Bot:</strong> ${data.reply}</div>`;

    } catch (error) {
        // Handle error
        chatBox.innerHTML += `<div class="message bot"><strong>Bot:</strong> Error: Could not reach backend</div>`;
        console.error("Error:", error);
    }

    // Auto scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow Enter key to send message
document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("user-input");

    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});