/**
 * PAGE 8: reasons.js — Interactive 3D Reason Cards Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const reasons = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.reasons) 
    ? window.BIRTHDAY_CONFIG.reasons 
    : [];

  const grid = document.getElementById('reasons-grid');

  function buildReasons() {
    if (!grid) return;
    grid.innerHTML = '';

    reasons.forEach((r, idx) => {
      const container = document.createElement('div');
      container.className = 'reason-card-container';

      const card = document.createElement('div');
      card.className = `reason-card ${r.isRoyal ? 'royal' : ''}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Quality: ${r.title}. Click to reveal why.`);

      card.innerHTML = `
        <div class="card-face card-front">
          <span class="card-badge">${r.badge}</span>
          <div class="card-icon" aria-hidden="true">${r.icon}</div>
          <h2 class="card-title">${r.title}</h2>
          <span class="flip-prompt">Turn card ↻</span>
        </div>
        <div class="card-face card-back">
          <span class="back-trait-badge">${r.trait}</span>
          <p class="back-description">${r.description}</p>
          <span class="flip-back-prompt">Tap to flip back</span>
        </div>
      `;

      function toggleFlip() {
        card.classList.toggle('flipped');
        if (window.playChime) window.playChime(640 + (idx % 8) * 60);
      }

      card.addEventListener('click', toggleFlip);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFlip();
        }
      });

      container.appendChild(card);
      grid.appendChild(container);
    });
  }

  buildReasons();
});

