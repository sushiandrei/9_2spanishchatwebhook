function sendMessage() {
    const url = "https://chat.googleapis.com/v1/spaces/AAAA-M9tWic/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=ogt9MD99FGOVi8eWM8hgs7aHD_HSoc2xlGoUgC-GX08";
    const messageInput = document.getElementById("message");
    const appMessage = {"text": messageInput.value};

    const messageHeaders = {
        "Content-Type": "application/json; charset=UTF-8"
    };

    fetch(url, {
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
