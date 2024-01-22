let webhookUrl;

function sendMessage() {
    const enteredUrl = document.getElementById("webhook-url").value.trim();

    if (!enteredUrl) {
        displayFeedback("Webhook URL is required. Please try again.", "error");
        return;
    }

    webhookUrl = enteredUrl;

    const messageInput = document.getElementById("message");
    const appMessage = { "text": messageInput.value };
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
                return response.json().then(errorData => {
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log("Message sent successfully:", data);
            displayFeedback("Message sent successfully!", "success");

            // Add the sent message to the history
            addToMessageHistory(appMessage.text);
        })
        .catch(error => {
            console.error("Error sending message:", error.message);
            displayFeedback(`Error sending message: ${error.message}`, "error");
        })
        .finally(() => {
            hideLoadingSpinner();
        });

    // Clear input after sending
    messageInput.value = "";
}

function addToMessageHistory(message) {
    const historyList = document.getElementById("history-list");
    const listItem = document.createElement("li");
    listItem.textContent = message;
    historyList.appendChild(listItem);
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

function toggleDarkMode() {
    // Toggle the dark mode class on the body
    document.body.classList.toggle('dark-mode');

    // Update the user's preference in localStorage
    const updatedDarkModeStatus = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', updatedDarkModeStatus.toString());
}

function toggleFeedbackForm() {
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackButton = document.getElementById("feedback-button");

    if (feedbackForm.style.display === "none") {
        // Show the feedback form
        feedbackForm.style.display = "block";
        feedbackButton.innerText = "Hide Feedback";
    } else {
        // Hide the feedback form
        feedbackForm.style.display = "none";
        feedbackButton.innerText = "Give Feedback";
    }
}

function submitFeedback() {
    const feedbackText = document.getElementById("feedback").value;

    if (!feedbackText) {
        alert("Please enter your feedback before submitting.");
        return;
    }

    // You can send the feedback to your server or a third-party service here.
    // For demonstration purposes, let's log it to the console.
    console.log("User Feedback:", feedbackText);

    // Optionally, you can provide a confirmation message to the user.
    alert("Thank you for your feedback!");

    // Hide the feedback form after submission
    document.getElementById("feedback-form").style.display = "none";

    // Clear the feedback textarea
    document.getElementById("feedback").value = "";
}
