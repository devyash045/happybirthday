/**
 * MUSKAN'S PERSONAL CINEMATIC BIRTHDAY UNIVERSE
 * Global JavaScript — Ambient Canvas, Web Audio Synthesizer,
 * Rose Petal Trail, Navigation Drawer & Transitions
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Ambient Background Canvas (Stars, White & Red Rose Petals, Cosmic Dust)
  // ==========================================================================
  const canvas = document.getElementById('ambient-canvas');
  let ctx = null;
  let animFrameId = null;
  let particles = [];
  let petals = [];

  if (canvas) {
    ctx = canvas.getContext('2d');
    initAmbientAtmosphere();
  }

  function initAmbientAtmosphere() {
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 150));

    // Create background stars & cosmic dust
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 45 : 95;
    const petalCount = isMobile ? 12 : 22;

    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        color: Math.random() > 0.65 ? '#f4d06f' : (Math.random() > 0.4 ? '#f2a7cb' : '#ffffff')
      });
    }

    // Create floating white and red rose petals
    petals = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal(true));
    }

    startAtmosphereLoop();

    // Pause when tab not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
      } else {
        startAtmosphereLoop();
      }
    });
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createPetal(randomY = false) {
    const isWhite = Math.random() > 0.45; // Mix of white and red roses
    return {
      x: Math.random() * (canvas ? canvas.width : window.innerWidth),
      y: randomY ? Math.random() * (canvas ? canvas.height : window.innerHeight) : -30,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.6,
      angle: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.025,
      oscillationSpeed: Math.random() * 0.02 + 0.01,
      oscillationDist: Math.random() * 30 + 15,
      oscillationStep: Math.random() * Math.PI * 2,
      color: isWhite ? 'rgba(253, 251, 247, ' : 'rgba(230, 57, 86, ',
      opacity: Math.random() * 0.55 + 0.25,
      isWhite: isWhite
    };
  }

  function startAtmosphereLoop() {
    cancelAnimationFrame(animFrameId);

    function loop() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and twinkle stars
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.alpha += p.twinkleSpeed * p.twinkleDirection;
        if (p.alpha > 0.9) {
          p.alpha = 0.9;
          p.twinkleDirection = -1;
        } else if (p.alpha < 0.15) {
          p.alpha = 0.15;
          p.twinkleDirection = 1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw and animate floating petals
      for (let i = 0; i < petals.length; i++) {
        const petal = petals[i];
        petal.y += petal.speedY;
        petal.oscillationStep += petal.oscillationSpeed;
        petal.x += petal.speedX + Math.sin(petal.oscillationStep) * 0.4;
        petal.angle += petal.spinSpeed;

        if (petal.y > canvas.height + 40) {
          petals[i] = createPetal(false);
          continue;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.angle);
        ctx.scale(Math.cos(petal.oscillationStep * 0.5), 1);

        ctx.beginPath();
        ctx.moveTo(0, -petal.size * 0.7);
        ctx.bezierCurveTo(petal.size * 0.6, -petal.size * 0.6, petal.size * 0.8, petal.size * 0.3, 0, petal.size);
        ctx.bezierCurveTo(-petal.size * 0.8, petal.size * 0.3, -petal.size * 0.6, -petal.size * 0.6, 0, -petal.size * 0.7);
        ctx.closePath();

        ctx.fillStyle = petal.color + petal.opacity + ')';
        ctx.shadowBlur = petal.isWhite ? 8 : 12;
        ctx.shadowColor = petal.isWhite ? 'rgba(255, 255, 255, 0.4)' : 'rgba(230, 57, 86, 0.35)';
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
      animFrameId = requestAnimationFrame(loop);
    }

    loop();
  }

  // ==========================================================================
  // 2. Pure Web Audio API Ambient Synthesizer (Warm Romantic Chord Progression)
  // ==========================================================================
  let audioCtx = null;
  let isAmbientPlaying = false;
  let masterGain = null;
  let synthInterval = null;

  // F Major 9 & D minor 9 gentle ambient chord notes
  const chordProgression = [
    [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9 (F3, A3, C4, E4, G4)
    [146.83, 220.00, 261.63, 293.66, 349.23], // Dm9 (D3, A3, C4, D4, F4)
    [196.00, 246.94, 293.66, 349.23, 392.00], // G7sus (G3, B3, D4, F4, G4)
    [130.81, 196.00, 261.63, 329.63, 392.00]  // Cmaj9 (C3, G3, C4, E4, G4)
  ];
  let currentChordIndex = 0;

  function initAudioContext() {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }

  function playSoftChord(frequencies) {
    if (!audioCtx || !isAmbientPlaying) return;

    frequencies.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      // Warm tone shaping
      osc.type = idx === 0 ? 'sine' : (idx % 2 === 0 ? 'triangle' : 'sine');
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Lowpass gentle filter to simulate warm celestial strings
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650 + idx * 80, audioCtx.currentTime);

      const now = audioCtx.currentTime;
      const attack = 2.0;
      const duration = 6.5;
      const baseVol = 0.025 / frequencies.length;

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(baseVol, now + attack);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.2);
    });
  }

  function toggleAmbientSound() {
    initAudioContext();
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const soundBtns = document.querySelectorAll('#sound-toggle-btn');

    if (!isAmbientPlaying) {
      isAmbientPlaying = true;
      localStorage.setItem('muskan_ambient_sound', 'on');
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 1.5);

      soundBtns.forEach(btn => btn.classList.add('playing'));

      playSoftChord(chordProgression[currentChordIndex]);
      synthInterval = setInterval(() => {
        currentChordIndex = (currentChordIndex + 1) % chordProgression.length;
        playSoftChord(chordProgression[currentChordIndex]);
      }, 5500);
    } else {
      isAmbientPlaying = false;
      localStorage.setItem('muskan_ambient_sound', 'off');
      clearInterval(synthInterval);

      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);

      soundBtns.forEach(btn => btn.classList.remove('playing'));
    }
  }

  // Play pleasant crystalline chime for interactive clicks
  window.playChime = function (freq = 880) {
    initAudioContext();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 1.0);
  };

  // ==========================================================================
  // 3. Rose Petal Cursor Trail Effect (Desktop only, throttled)
  // ==========================================================================
  let lastPetalTime = 0;
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastPetalTime < 65) return; // limit frequency
      lastPetalTime = now;

      const petal = document.createElement('div');
      petal.className = 'rose-petal-particle';

      const isWhite = Math.random() > 0.45;
      const size = Math.random() * 10 + 8;
      petal.style.width = size + 'px';
      petal.style.height = (size * 1.3) + 'px';
      petal.style.left = e.clientX + 'px';
      petal.style.top = e.clientY + 'px';

      if (isWhite) {
        petal.style.background = 'radial-gradient(circle, #ffffff 30%, #e2daf0 100%)';
        petal.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.6)';
      } else {
        petal.style.background = 'radial-gradient(circle, #e63956 20%, #9e1b38 100%)';
        petal.style.boxShadow = '0 0 10px rgba(230, 57, 86, 0.5)';
      }

      document.body.appendChild(petal);
      setTimeout(() => {
        if (petal.parentNode) petal.parentNode.removeChild(petal);
      }, 1200);
    });
  }

  // ==========================================================================
  // 4. Quick Page Navigation Drawer Logic
  // ==========================================================================
  function setupNavigationDrawer() {
    const drawer = document.getElementById('nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const openBtn = document.getElementById('drawer-open-btn');
    const closeBtn = document.getElementById('drawer-close-btn');

    if (!drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Mark current page active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = drawer.querySelectorAll('.drawer-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // ==========================================================================
  // 5. Cinematic Page Navigation Transitions
  // ==========================================================================
  function setupTransitions() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-transition="true"], a.btn-navigate');
      if (!link) return;

      const targetUrl = link.getAttribute('href');
      if (!targetUrl || targetUrl.startsWith('#') || targetUrl.startsWith('javascript:')) return;

      e.preventDefault();
      window.playChime(640);

      document.body.classList.add('fade-out-scene');
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 550);
    });
  }

  // ==========================================================================
  // 6. Secret Easter Egg: Double-click Brand or Type "pari"
  // ==========================================================================
  function setupEasterEgg() {
    const brand = document.querySelector('.nav-brand');
    if (brand) {
      brand.addEventListener('dblclick', triggerEasterEggModal);
    }

    let buffer = '';
    window.addEventListener('keydown', (e) => {
      buffer += e.key.toLowerCase();
      if (buffer.length > 10) buffer = buffer.slice(-10);
      if (buffer.includes('pari') || buffer.includes('muskan')) {
        buffer = '';
        triggerEasterEggModal();
      }
    });
  }

  function triggerEasterEggModal() {
    window.playChime(1046.5); // High C crystalline chime
    let modal = document.getElementById('easter-egg-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'easter-egg-modal';
      modal.style.cssText = `
        position: fixed; inset: 0; z-index: 100000;
        background: rgba(6, 8, 20, 0.85); backdrop-filter: blur(16px);
        display: flex; align-items: center; justify-content: center;
        padding: 1.5rem; opacity: 0; transition: opacity 0.4s ease;
      `;
      modal.innerHTML = `
        <div style="
          max-width: 440px; width: 100%; background: linear-gradient(135deg, rgba(35, 18, 69, 0.95), rgba(18, 11, 41, 0.95));
          border: 1px solid rgba(244, 208, 111, 0.5); border-radius: 24px; padding: 2.2rem;
          text-align: center; box-shadow: 0 15px 50px rgba(0,0,0,0.8), 0 0 40px rgba(244, 208, 111, 0.3);
        ">
          <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">✨ 🤍 🌹</div>
          <h3 style="font-family: var(--font-display); font-size: 1.6rem; color: var(--champagne-gold); margin-bottom: 0.5rem;">
            A Secret Star For Pari
          </h3>
          <p style="color: var(--white-muted); font-size: 0.98rem; line-height: 1.6; margin-bottom: 1.5rem;">
            You discovered a secret cosmic star! <br>
            <strong>"In all the galaxies that ever were, you will always be Yash's most precious blessing."</strong>
          </p>
          <button id="close-easter-egg" class="btn btn-royal" style="padding: 0.6rem 1.8rem; font-size: 0.9rem;">
            Close With Love 💖
          </button>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#close-easter-egg').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => { modal.style.display = 'none'; }, 400);
      });
    }

    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
    });
  }

  // ==========================================================================
  // 7. Initialize Everything on DOMContentLoaded
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in-scene');

    // Attach ambient sound toggle listener
    const soundToggle = document.getElementById('sound-toggle-btn');
    if (soundToggle) {
      soundToggle.addEventListener('click', toggleAmbientSound);
    }

    setupNavigationDrawer();
    setupTransitions();
    setupEasterEgg();
  });

  // Helper: debounce
  function debounce(fn, ms) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), ms);
    };
  }
})();

