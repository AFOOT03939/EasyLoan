document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatBody = document.getElementById('chatBody');

    chatButton.addEventListener('click', function() {
        chatWindow.classList.toggle('show');
        chatButton.classList.toggle('rotate');
    });

    sendMessage.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message) {
            const messageElement = document.createElement('p');
            messageElement.textContent = `Tú: ${message}`;
            chatBody.appendChild(messageElement);
            messageInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });
});