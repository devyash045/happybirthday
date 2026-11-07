/**
 * PAGE 11: ending.js — Staggered Emotional Farewell & Final Secret Keepsake
 */

document.addEventListener('DOMContentLoaded', () => {
  const line1 = document.getElementById('ending-line-1');
  const line2 = document.getElementById('ending-line-2');
  const line3 = document.getElementById('ending-line-3');
  const finalBtnWrapper = document.getElementById('final-btn-wrapper');
  const btnFinalSurprise = document.getElementById('btn-final-surprise');
  const modalOverlay = document.getElementById('last-surprise-overlay');
  const btnCloseModal = document.getElementById('btn-close-last-modal');

  // Staggered reveal sequence
  setTimeout(() => {
    if (line1) line1.classList.add('revealed');
    if (window.playChime) window.playChime(523.25);
  }, 600);

  setTimeout(() => {
    if (line2) line2.classList.add('revealed');
    if (window.playChime) window.playChime(659.25);
  }, 1900);

  setTimeout(() => {
    if (line3) line3.classList.add('revealed');
    if (window.playChime) window.playChime(783.99);
  }, 3200);

  setTimeout(() => {
    if (finalBtnWrapper) {
      finalBtnWrapper.style.transition = 'opacity 1s ease, transform 1s ease';
      finalBtnWrapper.style.opacity = '1';
      finalBtnWrapper.style.transform = 'translateY(0)';
      if (window.playChime) window.playChime(1046.5);
    }
  }, 4400);

  // Final Modal Open
  function openFinalModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      if (window.playChime) {
        window.playChime(587.33);
        setTimeout(() => window.playChime(880), 200);
      }
    }
  }

  function closeFinalModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
  }

  if (btnFinalSurprise) btnFinalSurprise.addEventListener('click', openFinalModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeFinalModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeFinalModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeFinalModal();
    }
  });
});

