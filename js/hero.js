/**
 * PAGE 3: hero.js — Grand Birthday Reveal & The Signature Memory Orb Transition
 * With 3D Perspective Tilt, Gravitational Convergence Vortex & Shockwave Expansion
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Digital Clock
  const clockTime = document.getElementById('live-clock-time');
  const clockDate = document.getElementById('live-clock-date');

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (clockTime) clockTime.textContent = `${hours}:${minutes}:${seconds}`;

    if (clockDate) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      clockDate.textContent = now.toLocaleDateString('en-GB', options);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  // 2. The Signature Memory Orb Setup
  const orbContainer = document.getElementById('orb-container');
  const memoryOrb = document.getElementById('memoryOrb');
  const orbPrimaryText = document.getElementById('orb-primary-text');
  const orbSecondaryText = document.getElementById('orb-secondary-text');
  const heroContent = document.querySelector('.hero-content');
  const clockBadge = document.querySelector('.live-clock-badge');
  const heroFooter = document.querySelector('.hero-footer-msg');
  const flashOverlay = document.getElementById('cosmic-flash-overlay');
  const vortexCanvas = document.getElementById('orb-vortex-canvas');

  // Shockwave elements
  const shockwave1 = document.querySelector('.orb-shockwave.wave-1');
  const shockwave2 = document.querySelector('.orb-shockwave.wave-2');
  const shockwave3 = document.querySelector('.orb-shockwave.wave-3');

  // 3. Interactive 3D Cursor Parallax Tilt for Memory Orb
  if (orbContainer && memoryOrb && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      if (isTriggered) return;
      const rect = orbContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const tiltX = -deltaY * 18; // Max 18 deg tilt
      const tiltY = deltaX * 18;

      memoryOrb.style.setProperty('--orb-tilt-x', `${tiltX.toFixed(2)}deg`);
      memoryOrb.style.setProperty('--orb-tilt-y', `${tiltY.toFixed(2)}deg`);
    });

    orbContainer.addEventListener('mouseleave', () => {
      if (isTriggered) return;
      memoryOrb.style.setProperty('--orb-tilt-x', '0deg');
      memoryOrb.style.setProperty('--orb-tilt-y', '0deg');
    });
  }

  // 4. Gravitational Convergence Vortex Particle Engine
  let vortexCtx = null;
  let vortexParticles = [];
  let vortexAnimId = null;
  let isVortexActive = false;

  if (vortexCanvas) {
    vortexCtx = vortexCanvas.getContext('2d');
    resizeVortexCanvas();
    window.addEventListener('resize', resizeVortexCanvas);
  }

  function resizeVortexCanvas() {
    if (!vortexCanvas) return;
    vortexCanvas.width = window.innerWidth;
    vortexCanvas.height = window.innerHeight;
  }

  function startGravitationalVortex() {
    if (!vortexCtx || !vortexCanvas) return;
    isVortexActive = true;
    resizeVortexCanvas();

    const centerX = vortexCanvas.width / 2;
    const centerY = vortexCanvas.height / 2;
    const particleCount = 140;
    vortexParticles = [];

    const vortexColors = ['#f4d06f', '#f2a7cb', '#ffffff', '#bba6e6', '#ffd700'];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (Math.max(vortexCanvas.width, vortexCanvas.height) * 0.7) + 160;
      vortexParticles.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        angle: angle,
        dist: dist,
        speed: Math.random() * 3.5 + 2.5,
        angularSpeed: (Math.random() * 0.04 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
        radius: Math.random() * 2.8 + 1,
        color: vortexColors[Math.floor(Math.random() * vortexColors.length)],
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    function renderVortex() {
      if (!isVortexActive) return;
      vortexCtx.clearRect(0, 0, vortexCanvas.width, vortexCanvas.height);

      for (let i = 0; i < vortexParticles.length; i++) {
        const p = vortexParticles[i];

        // Accelerate spiraling toward the orb center
        p.dist -= p.speed;
        p.speed += 0.12; // Gravitational acceleration!
        p.angle += p.angularSpeed;

        p.x = centerX + Math.cos(p.angle) * p.dist;
        p.y = centerY + Math.sin(p.angle) * p.dist;

        if (p.dist <= 15) {
          // Reached the orb core
          p.dist = Math.random() * 200 + 400;
          p.speed = 2;
        }

        vortexCtx.beginPath();
        vortexCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        vortexCtx.fillStyle = p.color;
        vortexCtx.shadowBlur = 10;
        vortexCtx.shadowColor = p.color;
        vortexCtx.globalAlpha = p.alpha;
        vortexCtx.fill();
        vortexCtx.shadowBlur = 0;
      }

      vortexAnimId = requestAnimationFrame(renderVortex);
    }

    renderVortex();
  }

  // 5. Signature Grand Orb Expansion & Transition Sequence
  let isTriggered = false;

  function triggerOrbTransition() {
    if (isTriggered) return;
    isTriggered = true;

    // A. Celestial Riser Synthesizer Fanfare
    if (window.playChime) {
      window.playChime(392.00); // G4
      setTimeout(() => window.playChime(523.25), 150); // C5
      setTimeout(() => window.playChime(659.25), 300); // E5
      setTimeout(() => window.playChime(783.99), 450); // G5
      setTimeout(() => window.playChime(1046.50), 650); // C6
      setTimeout(() => window.playChime(1318.51), 850); // E6
      setTimeout(() => window.playChime(1567.98), 1100); // G6
    }

    // B. Intense Vibration & Gyro Ring Acceleration
    memoryOrb.classList.add('orb-vibrating');
    memoryOrb.classList.add('orb-accelerating');

    // C. Fire Expanding Shockwaves
    if (shockwave1) shockwave1.classList.add('fire-1');
    if (shockwave2) shockwave2.classList.add('fire-2');
    if (shockwave3) shockwave3.classList.add('fire-3');

    // D. Start Gravitational Singularity Vortex (Stars rushing into the orb!)
    startGravitationalVortex();

    // E. Dynamic Label Update
    if (orbPrimaryText) {
      orbPrimaryText.innerHTML = `<span>Opening Your Universe...</span> <span style="animation: spinCorona 2s linear infinite;">✨</span>`;
    }
    if (orbSecondaryText) {
      orbSecondaryText.textContent = "Hold on tight, Pari...";
    }

    // F. Fade out surrounding text smoothly
    setTimeout(() => {
      if (heroContent) {
        heroContent.style.transition = 'all 0.6s ease';
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(-30px) scale(0.95)';
      }
      if (clockBadge) clockBadge.style.opacity = '0';
      if (heroFooter) heroFooter.style.opacity = '0';
    }, 350);

    // G. Hyperspace Cosmic Warp Expansion
    setTimeout(() => {
      memoryOrb.classList.remove('orb-vibrating');
      memoryOrb.classList.add('orb-expanding');
    }, 850);

    // H. Soft Cosmic Pink-Purple Flash Overlay with Poetic Text
    setTimeout(() => {
      if (flashOverlay) {
        flashOverlay.classList.add('active');
      }
    }, 1350);

    // I. Smooth Navigation to memories.html
    setTimeout(() => {
      window.location.href = 'memories.html';
    }, 2800);
  }

  if (orbContainer) {
    orbContainer.addEventListener('click', triggerOrbTransition);
    orbContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerOrbTransition();
      }
    });
  }
});
