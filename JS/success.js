document.addEventListener('DOMContentLoaded', function() {
    // Create the overlay elements
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    
    const checkContainer = document.createElement('div');
    checkContainer.className = 'check-container';
    
    const checkBackground = document.createElement('div');
    checkBackground.className = 'check-background';
    
    const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    checkmark.setAttribute('viewBox', '0 0 65 51');
    checkmark.innerHTML = '<path d="M7 25 L27.5 45.5 L58.5 7" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"></path>';
    
    const checkShadow = document.createElement('div');
    checkShadow.className = 'check-shadow';
    
    checkBackground.appendChild(checkmark);
    checkContainer.appendChild(checkBackground);
    checkContainer.appendChild(checkShadow);
    overlay.appendChild(checkContainer);
    
    document.body.appendChild(overlay);
  
    // Add click event listener to the "Aceptar préstamo" button
    document.body.addEventListener('click', function(event) {
      if (event.target && event.target.id === 'accept-loan') {
        overlay.style.display = 'flex';
        setTimeout(() => {
          overlay.classList.add('active');
        }, 10);
  
        // Hide overlay after animation
        setTimeout(() => {
          overlay.classList.remove('active');
          setTimeout(() => {
            overlay.style.display = 'none';
          }, 1000);
        }, 3000);
      }
    });
  
    // Add the necessary styles
    const style = document.createElement('style');
    style.textContent = `
      .success-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .success-overlay.active {
        opacity: 1;
      }
      .check-container {
        width: 6.25rem;
        height: 7.5rem;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;
      }
      .check-background {
        width: 100%;
        height: calc(100% - 1.25rem);
        background: linear-gradient(to bottom right, #5de593, #41d67c);
        box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
          0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
        transform: scale(0.84);
        border-radius: 50%;
        animation: animateContainer 0.75s ease-out forwards 0.75s;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
      }
      .check-background svg {
        width: 65%;
        transform: translateY(0.25rem);
        stroke-dasharray: 80;
        stroke-dashoffset: 80;
        animation: animateCheck 0.35s forwards 1.25s ease-out;
      }
      .check-shadow {
        bottom: calc(-15% - 5px);
        left: 0;
        border-radius: 50%;
        background: radial-gradient(closest-side, rgba(73, 218, 131, 1), transparent);
        animation: animateShadow 0.75s ease-out forwards 0.75s;
      }
      @keyframes animateContainer {
        0% {
          opacity: 0;
          transform: scale(0);
          box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
        }
        25% {
          opacity: 1;
          transform: scale(0.9);
          box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
        }
        43.75% {
          transform: scale(1.15);
          box-shadow: 0px 0px 0px 43.334px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
        }
        62.5% {
          transform: scale(1);
          box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 21.667px rgba(255, 255, 255, 0.25) inset;
        }
        81.25% {
          box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
        }
        100% {
          opacity: 1;
          box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
        }
      }
      @keyframes animateCheck {
        from {
          stroke-dashoffset: 80;
        }
        to {
          stroke-dashoffset: 0;
        }
      }
      @keyframes animateShadow {
        0% {
          opacity: 0;
          width: 100%;
          height: 15%;
        }
        25% {
          opacity: 0.25;
        }
        43.75% {
          width: 40%;
          height: 7%;
          opacity: 0.35;
        }
        100% {
          width: 85%;
          height: 15%;
          opacity: 0.25;
        }
      }
    `;
    document.head.appendChild(style);
  });