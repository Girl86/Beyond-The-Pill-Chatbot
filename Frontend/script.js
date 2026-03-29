async function sendMessage() {
    const input = document.getElementById("userInput").value;
    if (!input) return;

    // Show user message
    const chatArea = document.getElementById("chatArea");
    chatArea.innerHTML += `<p><b>You:</b> ${input}</p>`;

    // Call backend
    const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    chatArea.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;

    document.getElementById("userInput").value = ""; // clear input
}