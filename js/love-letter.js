/**
 * PAGE 5: love-letter.js — 3D Envelope & Heartfelt Letter Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const btnOpen = document.getElementById('btn-open-letter');
  const letterPaper = document.getElementById('letter-paper');
  const letterActions = document.getElementById('letter-actions');

  let isOpen = false;

  function openEnvelope() {
    if (isOpen) return;
    isOpen = true;

    if (window.playChime) {
      window.playChime(784); // G5 chime
      setTimeout(() => window.playChime(1046.5), 350); // C6 chime
    }

    // Flap flips open
    envelope.classList.add('open');
    if (btnOpen) btnOpen.style.display = 'none';

    // Slide and reveal letter paper
    setTimeout(() => {
      letterPaper.classList.add('revealed');
      letterPaper.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });

      if (letterActions) {
        letterActions.style.display = 'flex';
      }
    }, 600);
  }

  if (envelope) envelope.addEventListener('click', openEnvelope);
  if (btnOpen) btnOpen.addEventListener('click', openEnvelope);
});

