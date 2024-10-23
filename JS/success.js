document.addEventListener('DOMContentLoaded', function() {
    const acceptLoanBtn = document.getElementById('accept-loan');

    if (acceptLoanBtn) { // Verifica que el botón exista
        acceptLoanBtn.addEventListener('click', function() {
            // Create overlay container
            const overlay = document.createElement('div');
            overlay.id = 'message-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;`;

            // Create message container
            const messageContainer = document.createElement('div');
            messageContainer.style.cssText = `
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                max-width: 80%;
                text-align: center;`;

            // Create message text
            const messageText = document.createElement('p');
            messageText.textContent = 'This is your overlay message!';
            messageText.style.cssText = `
                margin: 0;
                font-size: 18px;
                color: #333;`;

            // Create close button
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.style.cssText = `
                margin-top: 15px;
                padding: 8px 16px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;`;

            // Add event listener to close button
            closeButton.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });

            // Assemble the overlay
            messageContainer.appendChild(messageText);
            messageContainer.appendChild(closeButton);
            overlay.appendChild(messageContainer);

            // Add the overlay to the body
            document.body.appendChild(overlay);
        });
    } else {
        console.error('El botón con ID "accept-loan" no se encontró.');
    }
});
