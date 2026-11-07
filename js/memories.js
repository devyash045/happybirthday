/**
 * PAGE 4: memories.js — Interactive Constellation & 3D Storybook Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const chapters = window.BIRTHDAY_CONFIG ? window.BIRTHDAY_CONFIG.memoryChapters : [];
  if (!chapters || chapters.length === 0) return;

  let currentIdx = 0;

  // DOM Elements
  const track = document.getElementById('constellation-track');
  const bookEl = document.getElementById('storybook');
  const chapterBadge = document.getElementById('chapter-badge');
  const chapterDate = document.getElementById('chapter-date');
  const chapterTitle = document.getElementById('chapter-title');
  const chapterSubtitle = document.getElementById('chapter-subtitle');
  const chapterDetail = document.getElementById('chapter-detail');
  const artIcon = document.getElementById('art-icon');
  const artText = document.getElementById('art-text');
  const accountabilityBox = document.getElementById('accountability-box');
  const chapterQuote = document.getElementById('chapter-quote');
  const prevBtn = document.getElementById('prev-chapter-btn');
  const nextBtn = document.getElementById('next-chapter-btn');
  const pageTracker = document.getElementById('page-tracker');

  // Build Constellation Stars Nodes
  function buildConstellationTrack() {
    if (!track) return;
    track.innerHTML = '';

    chapters.forEach((ch, idx) => {
      const btn = document.createElement('button');
      btn.className = `star-node ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('aria-label', `Chapter ${idx + 1}: ${ch.title}`);
      btn.setAttribute('data-index', idx);
      btn.innerHTML = `
        <span aria-hidden="true">${ch.icon}</span>
        <span class="star-node-label">Ch. ${idx + 1}</span>
      `;

      btn.addEventListener('click', () => {
        goToChapter(idx);
      });

      track.appendChild(btn);
    });
  }

  // Render Current Chapter
  function renderChapter(idx) {
    const ch = chapters[idx];
    if (!ch) return;

    // Trigger subtle 3D flip effect on book
    if (bookEl) {
      bookEl.style.transform = 'rotateY(10deg) scale(0.98)';
      setTimeout(() => {
        bookEl.style.transform = 'rotateY(0deg) scale(1)';
      }, 250);
    }

    if (chapterBadge) chapterBadge.textContent = `Chapter ${ch.id} of ${chapters.length}`;
    if (chapterDate) chapterDate.textContent = ch.date;
    if (chapterTitle) chapterTitle.textContent = ch.title;
    if (chapterSubtitle) chapterSubtitle.textContent = ch.subtitle;
    if (chapterDetail) chapterDetail.textContent = ch.detail;
    if (artIcon) artIcon.textContent = ch.icon;
    if (artText) artText.textContent = ch.summary;
    if (chapterQuote) chapterQuote.textContent = `“${ch.quote}”`;

    // Special Accountability Section for Chapter 5
    if (accountabilityBox) {
      if (ch.accountability) {
        accountabilityBox.style.display = 'block';
        const listEl = document.getElementById('accountability-list');
        if (listEl) {
          listEl.innerHTML = ch.accountability.points
            .map(pt => `<li><span>✦</span><span>${pt}</span></li>`)
            .join('');
        }
      } else {
        accountabilityBox.style.display = 'none';
      }
    }

    // Update constellation active node
    const nodes = document.querySelectorAll('.star-node');
    nodes.forEach((n, i) => {
      if (i === idx) {
        n.classList.add('active');
        n.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        n.classList.remove('active');
      }
    });

    // Update Pagination Buttons
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === chapters.length - 1;
    if (pageTracker) pageTracker.textContent = `${idx + 1} / ${chapters.length}`;
  }

  function goToChapter(idx) {
    if (idx < 0 || idx >= chapters.length || idx === currentIdx) return;
    currentIdx = idx;
    if (window.playChime) window.playChime(640 + idx * 75);
    renderChapter(currentIdx);
  }

  // Event Listeners for Prev/Next
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToChapter(currentIdx - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToChapter(currentIdx + 1);
    });
  }

  // Keyboard navigation (Left / Right Arrow)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToChapter(currentIdx - 1);
    if (e.key === 'ArrowRight') goToChapter(currentIdx + 1);
  });

  // Initialize
  buildConstellationTrack();
  renderChapter(0);
});

