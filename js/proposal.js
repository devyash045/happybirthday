/**
 * PAGE: proposal.js — The Re-Proposal & Velvet Ring Box Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const ringBoxWrapper = document.getElementById('ring-box-wrapper');
  const questionBox = document.getElementById('proposal-question-box');
  const btnYes = document.getElementById('btn-proposal-yes');
  const btnShyYes = document.getElementById('btn-proposal-shy');
  const shyModal = document.getElementById('shy-modal-overlay');
  const btnShyProceed = document.getElementById('btn-shy-proceed');

  let isBoxOpened = false;

  // Open Ring Box
  function openRingBox() {
    if (isBoxOpened) return;
    isBoxOpened = true;

    ringBoxWrapper.classList.add('opened');

    // Crystalline Chime
    if (window.playChime) {
      window.playChime(659.25); // E5
      setTimeout(() => window.playChime(880), 200); // A5
      setTimeout(() => window.playChime(1174.66), 450); // D6
      setTimeout(() => window.playChime(1318.51), 700); // E6
    }

    // Reveal the big proposal speech box
    setTimeout(() => {
      questionBox.classList.add('visible');
      questionBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 700);
  }

  if (ringBoxWrapper) {
    ringBoxWrapper.addEventListener('click', openRingBox);
    ringBoxWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openRingBox();
      }
    });
  }

  // Handle "A Thousand Times YES!"
  if (btnYes) {
    btnYes.addEventListener('click', (e) => {
      e.preventDefault();

      if (window.playChime) {
        window.playChime(523.25);
        setTimeout(() => window.playChime(659.25), 150);
        setTimeout(() => window.playChime(783.99), 300);
        setTimeout(() => window.playChime(1046.50), 450);
      }

      document.body.classList.add('fade-out-scene');
      setTimeout(() => {
        window.location.href = 'celebration.html';
      }, 750);
    });
  }

  // Handle Shy Yes
  if (btnShyYes) {
    btnShyYes.addEventListener('click', () => {
      if (window.playChime) window.playChime(880);
      if (shyModal) shyModal.classList.add('active');
    });
  }

  if (btnShyProceed) {
    btnShyProceed.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('fade-out-scene');
      setTimeout(() => {
        window.location.href = 'celebration.html';
      }, 650);
    });
  }
});

