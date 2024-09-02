document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
    document.getElementById("user-input").value = "";

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<div><strong>Anatomy AI:</strong> ${data.response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}
