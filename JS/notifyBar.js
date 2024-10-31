document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('notificationBtn');
    const chatButton2 = document.getElementById('notificationBtn2');
    const chatWindow = document.getElementById('notificationBar');

    chatButton.addEventListener('click', function() {
        chatWindow.classList.toggle('show');
        chatButton.classList.toggle('rotate');
    });
    chatButton2.addEventListener('click', function() {
        chatWindow.classList.toggle('show');
        chatButton.classList.toggle('rotate');
    });
});