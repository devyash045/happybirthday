/**
 * PAGE 9: our-future.js — Cinematic Future-Dream Timeline Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const dreams = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.futureDreams) 
    ? window.BIRTHDAY_CONFIG.futureDreams 
    : [];

  const timelineTrack = document.getElementById('timeline-track');

  function buildTimeline() {
    if (!timelineTrack) return;
    timelineTrack.innerHTML = '';

    dreams.forEach((item, idx) => {
      const el = document.createElement('article');
      el.className = 'timeline-item';
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `${item.title}: ${item.description}`);

      el.innerHTML = `
        <div class="timeline-node" aria-hidden="true">${item.icon}</div>
        <div class="timeline-card">
          <span class="timeline-phase">${item.year}</span>
          <h2 class="timeline-title">${item.title}</h2>
          <p class="timeline-desc">${item.description}</p>
          <div class="timeline-scene">
            <span>✨</span> ${item.scene}
          </div>
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        if (window.playChime) window.playChime(600 + (idx % 6) * 70);
      });

      timelineTrack.appendChild(el);
    });
  }

  buildTimeline();
});

