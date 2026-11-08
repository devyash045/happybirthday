/**
 * PAGE 7: surprises.js — Interactive Surprise Universe & Modal Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  const surprises = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.surprises) 
    ? window.BIRTHDAY_CONFIG.surprises 
    : [];

  const grid = document.getElementById('surprises-grid');
  const modalOverlay = document.getElementById('surprise-modal-overlay');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Ensure modal is direct child of body for rock-solid fixed positioning
  if (modalOverlay && modalOverlay.parentElement !== document.body) {
    document.body.appendChild(modalOverlay);
  }

  // Build Gifts Grid
  function buildGifts() {
    if (!grid) return;
    grid.innerHTML = '';

    surprises.forEach((gift, idx) => {
      const card = document.createElement('div');
      card.className = 'gift-box-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Gift: ${gift.title}`);

      card.innerHTML = `
        <div class="gift-visual-container">
          <span class="gift-icon-display" aria-hidden="true">${gift.icon}</span>
        </div>
        <span class="gift-tag">${gift.tag}</span>
        <h2 class="gift-title">${gift.title}</h2>
        <button type="button" class="gift-prompt-btn">Unwrap Gift ✨</button>
      `;

      function triggerOpen() {
        card.classList.add('opened');
        const promptBtn = card.querySelector('.gift-prompt-btn');
        if (promptBtn) promptBtn.textContent = 'Revisit Surprise 💖';
        if (window.playChime) window.playChime(700 + idx * 60);

        // Populate Modal
        if (modalIcon) modalIcon.textContent = gift.icon;
        if (modalTitle) modalTitle.textContent = gift.revealedTitle;
        if (modalText) modalText.textContent = gift.content;

        // Reset scroll position to top
        if (modalOverlay) {
          modalOverlay.scrollTop = 0;
          const box = modalOverlay.querySelector('.surprise-modal');
          if (box) box.scrollTop = 0;
          modalOverlay.classList.add('active');
        }

        // Lock background document scroll
        document.body.classList.add('modal-open');
      }

      card.addEventListener('click', triggerOpen);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerOpen();
        }
      });

      grid.appendChild(card);
    });
  }

  // Close Modal Handlers
  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  buildGifts();
});

