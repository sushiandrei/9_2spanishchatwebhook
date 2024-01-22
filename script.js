const webhookInput = document.getElementById("webhook-url");
let webhookUrl;

function sendMessage() {
    const enteredUrl = webhookInput.value.trim();

    if (!enteredUrl) {
        alert("Webhook URL is required. Please try again.");
        return;
    }

    webhookUrl = enteredUrl;

    const messageInput = document.getElementById("message");
    const appMessage = {"text": messageInput.value};
    const messageHeaders = {
        "Content-Type": "application/json; charset=UTF-8"
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: messageHeaders,
        body: JSON.stringify(appMessage)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Message sent successfully:", data);
    })
    .catch(error => {
        console.error("Error sending message:", error);
    });

    // Clear input after sending
    messageInput.value = "";
}
