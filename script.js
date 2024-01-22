let webhookUrl;

function sendMessage() {
    const enteredUrl = document.getElementById("webhook-url").value.trim();

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

    try {
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
            alert("Message sent successfully!");
        })
        .catch(error => {
            console.error("Error sending message:", error);
            alert("Error sending message. Please try again.");
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
    }

    // Clear input after sending
    messageInput.value = "";
}
