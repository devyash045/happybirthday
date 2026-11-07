/**
 * PAGE 2: loading.js — "Preparing Her Universe"
 * Sequential dynamic text animation, adaptive progress line & smooth transition to hero.html
 */

document.addEventListener('DOMContentLoaded', () => {
  const loadingText = document.getElementById('loading-text');
  const progressFill = document.getElementById('progress-fill');
  const progressPct = document.getElementById('progress-pct');
  const skipBtn = document.getElementById('skip-btn');

  const steps = [
    { text: "Collecting beautiful moments...", progress: 20, duration: 1100 },
    { text: "Loading happiness...", progress: 45, duration: 1200 },
    { text: "Preparing something special...", progress: 70, duration: 1200 },
    { text: "Gathering all the love...", progress: 90, duration: 1100 },
    { text: "Almost ready ✨", progress: 100, duration: 1000 }
  ];

  let currentStep = 0;

  function runStep() {
    if (currentStep >= steps.length) {
      completeLoading();
      return;
    }

    const item = steps[currentStep];

    // Fade out old text
    loadingText.classList.remove('visible');

    setTimeout(() => {
      // Update text and progress
      loadingText.textContent = item.text;
      loadingText.classList.add('visible');
      progressFill.style.width = item.progress + '%';
      progressPct.textContent = item.progress + '%';

      if (window.playChime) {
        window.playChime(600 + currentStep * 90);
      }

      currentStep++;
      setTimeout(runStep, item.duration);
    }, 280);
  }

  function completeLoading() {
    if (window.playChime) window.playChime(987.77); // B5 note

    const loaderCard = document.querySelector('.loader-card');
    if (loaderCard) {
      loaderCard.style.transition = 'all 0.7s ease';
      loaderCard.style.transform = 'scale(1.05)';
      loaderCard.style.boxShadow = '0 0 70px rgba(244, 208, 111, 0.7)';
    }

    document.body.classList.add('fade-out-scene');
    setTimeout(() => {
      window.location.href = 'hero.html';
    }, 650);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      completeLoading();
    });
  }

  // Start sequence
  runStep();
});

