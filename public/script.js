document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    function appendMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
    }

    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            appendMessage(messageText, 'sent');
            messageInput.value = '';

            // In a real application, you would send this message to your Node.js backend
            // For now, let's simulate a reply
            setTimeout(() => {
                appendMessage("Echo: " + messageText, 'received');
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Simulate some initial messages
    appendMessage("Hello there!", 'received');
    appendMessage("Hi! How can I help you?", 'sent');
});