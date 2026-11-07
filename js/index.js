/**
 * PAGE 1: index.js — "A Little Surprise For My Wifeee Jiii"
 * Interactive entrance logic, playful dodge button & transition
 */

document.addEventListener('DOMContentLoaded', () => {
  const btnOpen = document.getElementById('btn-open-surprise');
  const btnDodge = document.getElementById('btn-dodge');
  const funnyBubble = document.getElementById('funny-bubble');
  const dodgeContainer = document.querySelector('.dodge-container');

  const funnyMessages = [
    "Please 🥺",
    "Trust me...",
    "At least try 👀",
    "You'll love it 💖",
    "Wifeee Jiii please maan jao na 🥺",
    "No ka option allowed nahi hai! 🙈",
    "Meri Pari, bas ek baar dekho ✨",
    "Aapke liye hi banaya hai poora universe! 🌹"
  ];
  let messageIndex = 0;
  let dodgeCount = 0;

  // Function to move the dodge button safely
  function dodgeButton(e) {
    if (e && e.type === 'touchstart') {
      e.preventDefault(); // Prevent accidental tap click on mobile
    }

    dodgeCount++;
    if (window.playChime) {
      window.playChime(520 + Math.min(dodgeCount * 60, 600));
    }

    // Show funny bubble
    funnyBubble.textContent = funnyMessages[messageIndex];
    funnyBubble.classList.add('visible');
    messageIndex = (messageIndex + 1) % funnyMessages.length;

    // Calculate a safe randomized jump range (stay away from primary button)
    const containerRect = dodgeContainer.getBoundingClientRect();
    const isMobile = window.innerWidth < 640;

    let maxX = isMobile ? 80 : 160;
    let maxY = isMobile ? 50 : 80;

    // Pick random offsets
    let randomX = (Math.random() - 0.5) * maxX * 2;
    let randomY = (Math.random() - 0.5) * maxY * 2;

    // Apply smooth transform jump
    btnDodge.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.96)`;

    clearTimeout(btnDodge.bubbleTimer);
    btnDodge.bubbleTimer = setTimeout(() => {
      funnyBubble.classList.remove('visible');
    }, 2400);
  }

  // Desktop hover / mouseenter dodge
  if (btnDodge) {
    btnDodge.addEventListener('mouseenter', dodgeButton);
    btnDodge.addEventListener('touchstart', dodgeButton, { passive: false });
    btnDodge.addEventListener('click', (e) => {
      e.preventDefault();
      dodgeButton(e);
    });
  }

  // Primary button click -> trigger cinematic transition to loading.html
  if (btnOpen) {
    btnOpen.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.playChime) window.playChime(880);

      const entranceCard = document.querySelector('.entrance-card');
      if (entranceCard) {
        entranceCard.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        entranceCard.style.transform = 'scale(1.04)';
        entranceCard.style.boxShadow = '0 0 80px rgba(242, 167, 203, 0.8), 0 0 120px rgba(187, 166, 230, 0.6)';
      }

      document.body.classList.add('fade-out-scene');
      setTimeout(() => {
        window.location.href = 'loading.html';
      }, 700);
    });
  }
});

