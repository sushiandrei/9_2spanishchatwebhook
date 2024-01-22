let webhookUrl;

function sendMessage() {
    const enteredUrl = document.getElementById("webhook-url").value.trim();

    if (!enteredUrl) {
        displayFeedback("Webhook URL is required. Please try again.", "error");
        return;
    }

    webhookUrl = enteredUrl;

    const messageInput = document.getElementById("message");
    const appMessage = {"text": messageInput.value};
    const messageHeaders = {
        "Content-Type": "application/json; charset=UTF-8"
    };

    showLoadingSpinner();

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
        displayFeedback("Message sent successfully!", "success");
    })
    .catch(error => {
        console.error("Error sending message:", error);
        displayFeedback("Error sending message. Please try again.", "error");
    })
    .finally(() => {
        hideLoadingSpinner();
    });

    // Clear input after sending
    messageInput.value = "";
}

function displayFeedback(message, type) {
    const feedbackElement = document.getElementById("feedback-message");
    feedbackElement.textContent = message;
    feedbackElement.style.color = type === "success" ? "#28a745" : "#dc3545";
}

function showLoadingSpinner() {
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = "inline-block";
}

function hideLoadingSpinner() {
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = "none";
}
