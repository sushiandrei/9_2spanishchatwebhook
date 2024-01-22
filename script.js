let webhookUrl; // Declare a variable to store the webhook URL

function sendMessage() {
    if (!webhookUrl) {
        // If the webhook URL is not set, prompt the user to enter it
        webhookUrl = prompt("Please enter your webhook URL:");
        if (!webhookUrl) {
            alert("Webhook URL is required. Please try again.");
            return;
        }
    }

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
