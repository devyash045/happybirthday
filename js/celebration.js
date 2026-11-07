/**
 * PAGE 10: celebration.js — Grand Interactive Fireworks, Confetti & Balloon Fiesta Engine
 * Features:
 * - Interactive Sky Clicks (Tap anywhere to explode fireworks/hearts)
 * - Multi-Type Fireworks (Heart bursts, Golden Willows, Double Rings, Chrysanthemums)
 * - Click-to-Pop 3D Balloons with floating love tags
 * - Interactive Mystery Birthday Box
 * - Celebration Deck: Mega Barrage, Heart Shower, Balloon Fiesta & Fanfare
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const balloonCluster = document.getElementById('balloon-cluster');
  const diyaCluster = document.getElementById('diya-cluster');
  const btnCelebrate = document.getElementById('btn-celebrate');
  const btnBarrage = document.getElementById('btn-fireworks-barrage');
  const btnHeartShower = document.getElementById('btn-heart-shower');
  const btnBalloonFiesta = document.getElementById('btn-balloon-fiesta');
  const btnDiyaRoshni = document.getElementById('btn-diya-roshni');
  const mysteryGift = document.getElementById('mystery-gift-box');
  const giftPopup = document.getElementById('gift-message-popup');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let rockets = [];
  let sparks = [];
  let confetti = [];
  let animId = null;
  let autoTimer = null;
  let confettiTimer = null;

  const colors = ['#f4d06f', '#f2a7cb', '#e63956', '#bba6e6', '#ffffff', '#ffd700', '#ff6b8b'];

  // ==========================================================================
  // 1. Particle Constructors
  // ==========================================================================

  // Rocket
  class Rocket {
    constructor(startX, startY, targetX, targetY, type = 'random') {
      this.x = startX !== undefined ? startX : Math.random() * (width - 240) + 120;
      this.y = startY !== undefined ? startY : height;
      this.targetX = targetX !== undefined ? targetX : this.x + (Math.random() - 0.5) * 120;
      this.targetY = targetY !== undefined ? targetY : Math.random() * (height * 0.45) + height * 0.12;

      const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
      const speed = Math.random() * 3 + 8.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.type = type === 'random' ? (Math.random() > 0.4 ? (Math.random() > 0.5 ? 'heart' : 'willow') : 'standard') : type;
      this.exploded = false;
      this.trail = [];
    }

    update() {
      this.trail.push({ x: this.x, y: this.y, alpha: 1 });
      if (this.trail.length > 7) this.trail.shift();

      this.x += this.vx;
      this.y += this.vy;

      // When reaching near target
      if (this.vy < 0 && this.y <= this.targetY) {
        this.exploded = true;
        createFireworkExplosion(this.x, this.y, this.color, this.type);
      }
    }

    draw() {
      // Draw smoke / spark trail
      for (let i = 0; i < this.trail.length; i++) {
        const pt = this.trail[i];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, (i + 1) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = (i + 1) / this.trail.length * 0.6;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Spark Particle
  class Spark {
    constructor(x, y, color, vx, vy, isWillow = false) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
      this.isWillow = isWillow;
      this.alpha = 1;
      this.decay = isWillow ? Math.random() * 0.012 + 0.008 : Math.random() * 0.022 + 0.015;
      this.gravity = isWillow ? 0.08 : 0.055;
      this.size = isWillow ? Math.random() * 2.2 + 1.2 : Math.random() * 2.6 + 1.2;
      this.drag = isWillow ? 0.985 : 0.97;
    }

    update() {
      this.vx *= this.drag;
      this.vy *= this.drag;
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.isWillow ? 10 : 7;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  // Confetti Particle
  class ConfettiPiece {
    constructor(sourceX, sourceY, isCannon = false) {
      this.x = sourceX !== undefined ? sourceX : Math.random() * width;
      this.y = sourceY !== undefined ? sourceY : -20;
      this.size = Math.random() * 11 + 6;
      this.color = colors[Math.floor(Math.random() * colors.length)];

      if (isCannon) {
        const angle = sourceX < width / 2 ? (Math.random() * 0.35 + 0.25) * -Math.PI : (Math.random() * 0.35 + 0.4) * -Math.PI;
        const force = Math.random() * 8 + 10;
        this.vx = Math.cos(angle) * force;
        this.vy = Math.sin(angle) * force;
      } else {
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 2.5 + 1.5;
      }

      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 8;
      this.isHeart = Math.random() > 0.6;
      this.gravity = 0.12;
    }

    update() {
      this.vx *= 0.98;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;

      if (this.isHeart) {
        ctx.font = `${this.size * 1.3}px sans-serif`;
        ctx.fillText('💖', 0, 0);
      } else {
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size * 0.6);
      }
      ctx.restore();
    }
  }

  // ==========================================================================
  // 2. Explosion Physics & Patterns
  // ==========================================================================
  function createFireworkExplosion(x, y, color, type = 'standard') {
    if (window.playChime) {
      window.playChime(440 + Math.random() * 500);
    }

    if (type === 'heart') {
      // Parametric Heart Formula: x = 16 sin^3(t), y = -(13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t))
      const count = 55;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const speed = 0.28;
        sparks.push(new Spark(x, y, '#ff5e88', hx * speed, hy * speed, false));
      }
    } else if (type === 'willow') {
      // Golden Cascading Willow
      const count = 65;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        sparks.push(new Spark(x, y, '#ffd700', Math.cos(angle) * speed, Math.sin(angle) * speed, true));
      }
    } else {
      // Multi-Ring Chrysanthemum
      const count = 60;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        sparks.push(new Spark(x, y, color, Math.cos(angle) * speed, Math.sin(angle) * speed, false));
      }
    }
  }

  // ==========================================================================
  // 3. Interactive Sky Clicks / Taps (Desktop + Mobile Touch)
  // ==========================================================================
  function handleSkyBurst(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    const chosenType = Math.random() > 0.4 ? 'heart' : (Math.random() > 0.5 ? 'willow' : 'standard');
    createFireworkExplosion(clickX, clickY, chosenColor, chosenType);

    if (window.playChime) {
      window.playChime(880 + Math.random() * 200);
    }
  }

  canvas.addEventListener('click', (e) => {
    handleSkyBurst(e.clientX, e.clientY);
  });

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      handleSkyBurst(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // ==========================================================================
  // 4. Click-to-Pop 3D Interactive Balloons
  // ==========================================================================
  const loveTags = [
    "Love You! 💖",
    "My Pari ✨",
    "Wifeee Jiii 👑",
    "Meri Laxmi 🌟",
    "Cutie Pie 🧸",
    "Best Smile 🥰",
    "Queen of My Heart 🌹",
    "Forever Yours 🤍"
  ];

  function spawnBalloon() {
    if (!balloonCluster) return;

    const b = document.createElement('div');
    b.className = 'balloon';

    const balloonColors = [
      ['#ff4b72', '#85002a'],
      ['#f4d06f', '#8a6400'],
      ['#bba6e6', '#3b226e'],
      ['#f2a7cb', '#8c225b'],
      ['#ffffff', '#827e8a']
    ];
    const pick = balloonColors[Math.floor(Math.random() * balloonColors.length)];

    b.style.left = `${Math.random() * 82 + 8}%`;
    b.style.background = `radial-gradient(circle at 35% 30%, ${pick[0]}, ${pick[1]})`;
    b.style.animationDuration = `${Math.random() * 4 + 7.5}s`;

    // String
    const stringEl = document.createElement('div');
    stringEl.className = 'balloon-string';
    b.appendChild(stringEl);

    // Click to POP
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      popBalloon(b, e.clientX, e.clientY);
    });

    balloonCluster.appendChild(b);

    // Auto-remove when floated away
    setTimeout(() => {
      if (b.parentNode) b.parentNode.removeChild(b);
    }, 12000);
  }

  function popBalloon(balloonEl, x, y) {
    if (balloonEl.popped) return;
    balloonEl.popped = true;

    // Popping chime
    if (window.playChime) window.playChime(1046.5);

    // Create explosion sparks at balloon position
    createFireworkExplosion(x, y, '#f4d06f', 'heart');

    // Floating love tag
    const tag = document.createElement('div');
    tag.className = 'pop-tag';
    tag.textContent = loveTags[Math.floor(Math.random() * loveTags.length)];
    tag.style.left = `${x}px`;
    tag.style.top = `${y}px`;
    document.body.appendChild(tag);

    setTimeout(() => {
      if (tag.parentNode) tag.parentNode.removeChild(tag);
    }, 1200);

    // Remove balloon immediately
    if (balloonEl.parentNode) balloonEl.parentNode.removeChild(balloonEl);
  }

  // ==========================================================================
  // 5. Dual Confetti Cannon Blasts
  // ==========================================================================
  function fireConfettiCannons() {
    for (let i = 0; i < 24; i++) {
      confetti.push(new ConfettiPiece(40, height - 20, true));
      confetti.push(new ConfettiPiece(width - 40, height - 20, true));
    }
  }

  // ==========================================================================
  // 5B. Traditional Diwali Diyas & Golden Anar Fountain
  // ==========================================================================
  const diwaliLoveTags = [
    "Meri Personal Laxmi 🪔",
    "Happy Diwali & Birthday! ✨",
    "Aap Hi Mere Ghar Ki Roshni Ho 💖",
    "May Your Life Always Shine Bright 🌟",
    "Happy Birthday Pari! 🤍"
  ];

  function spawnDiyas() {
    if (!diyaCluster) return;
    diyaCluster.innerHTML = '';
    const diyaCount = 8;
    for (let i = 0; i < diyaCount; i++) {
      const d = document.createElement('div');
      d.className = 'diya';

      const isLeftOrRight = Math.random() > 0.5;
      d.style.left = isLeftOrRight ? `${Math.random() * 20 + 3}%` : `${Math.random() * 20 + 77}%`;
      d.style.bottom = `${Math.random() * 60 + 15}px`;
      d.style.animationDelay = `${(i * 0.8).toFixed(1)}s`;

      d.innerHTML = `
        <div class="diya-flame"></div>
        <div class="diya-base"></div>
      `;

      d.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.playChime) window.playChime(1174.66);

        createFireworkExplosion(e.clientX, e.clientY - 20, '#ffd700', 'willow');

        const tag = document.createElement('div');
        tag.className = 'pop-tag';
        tag.textContent = diwaliLoveTags[Math.floor(Math.random() * diwaliLoveTags.length)];
        tag.style.left = `${e.clientX}px`;
        tag.style.top = `${e.clientY}px`;
        document.body.appendChild(tag);

        setTimeout(() => {
          if (tag.parentNode) tag.parentNode.removeChild(tag);
        }, 1400);
      });

      diyaCluster.appendChild(d);
    }
  }

  function createAnarFountain(x, y) {
    const originX = x !== undefined ? x : width / 2;
    const originY = y !== undefined ? y : height - 10;

    let frames = 0;
    const anarInterval = setInterval(() => {
      frames++;
      for (let i = 0; i < 7; i++) {
        const angle = (Math.random() * 0.4 + 0.3) * -Math.PI;
        const speed = Math.random() * 8 + 6;
        const sparkColor = Math.random() > 0.3 ? '#ffd700' : '#ffffff';
        sparks.push(new Spark(originX + (Math.random() - 0.5) * 20, originY, sparkColor, Math.cos(angle) * speed, Math.sin(angle) * speed, true));
      }
      if (frames > 45) clearInterval(anarInterval);
    }, 45);
  }

  // ==========================================================================
  // 6. Interactive Mystery Birthday Box on Card
  // ==========================================================================
  if (mysteryGift) {
    mysteryGift.addEventListener('click', () => {
      mysteryGift.classList.toggle('opened');
      if (window.playChime) window.playChime(784);

      if (giftPopup) {
        giftPopup.style.display = mysteryGift.classList.contains('opened') ? 'block' : 'none';
        if (mysteryGift.classList.contains('opened')) {
          fireConfettiCannons();
        }
      }
    });
  }

  // ==========================================================================
  // 7. Celebration Engine & Modes
  // ==========================================================================
  function startCelebration() {
    // Triumphant Fanfare Chords
    if (window.playChime) {
      window.playChime(523.25);
      setTimeout(() => window.playChime(659.25), 160);
      setTimeout(() => window.playChime(783.99), 320);
      setTimeout(() => window.playChime(1046.50), 480);
      setTimeout(() => window.playChime(1318.51), 700);
    }

    // Launch Rockets
    for (let i = 0; i < 4; i++) rockets.push(new Rocket());
    fireConfettiCannons();
    spawnDiyas();

    // Spawning Loops
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (rockets.length < 5) rockets.push(new Rocket());
      if (Math.random() > 0.4) spawnBalloon();
    }, 550);

    clearInterval(confettiTimer);
    confettiTimer = setInterval(fireConfettiCannons, 2800);

    if (!animId) animate();
  }

  // Main Canvas Render Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
      rockets[i].update();
      rockets[i].draw();
      if (rockets[i].exploded) rockets.splice(i, 1);
    }

    // Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      sparks[i].draw();
      if (sparks[i].alpha <= 0) sparks.splice(i, 1);
    }

    // Confetti
    for (let i = confetti.length - 1; i >= 0; i--) {
      confetti[i].update();
      confetti[i].draw();
      if (confetti[i].y > height + 40) confetti.splice(i, 1);
    }

    animId = requestAnimationFrame(animate);
  }

  // Button Action Handlers
  if (btnCelebrate) {
    btnCelebrate.addEventListener('click', startCelebration);
  }

  if (btnBarrage) {
    btnBarrage.addEventListener('click', () => {
      if (window.playChime) window.playChime(987.77);
      for (let i = 0; i < 10; i++) {
        setTimeout(() => rockets.push(new Rocket()), i * 120);
      }
      fireConfettiCannons();
    });
  }

  if (btnHeartShower) {
    btnHeartShower.addEventListener('click', () => {
      for (let i = 0; i < 6; i++) {
        const x = (i + 1) * (width / 7);
        const y = Math.random() * (height * 0.4) + 120;
        createFireworkExplosion(x, y, '#ff4b72', 'heart');
      }
      for (let i = 0; i < 50; i++) {
        confetti.push(new ConfettiPiece());
      }
    });
  }

  if (btnBalloonFiesta) {
    btnBalloonFiesta.addEventListener('click', () => {
      for (let i = 0; i < 12; i++) {
        setTimeout(spawnBalloon, i * 150);
      }
      fireConfettiCannons();
    });
  }

  if (btnDiyaRoshni) {
    btnDiyaRoshni.addEventListener('click', () => {
      if (window.playChime) {
        window.playChime(880);
        setTimeout(() => window.playChime(1174.66), 250);
      }
      createAnarFountain(width / 2, height - 10);
      createAnarFountain(width * 0.2, height - 10);
      createAnarFountain(width * 0.8, height - 10);
      spawnDiyas();
      createFireworkExplosion(width / 2, height * 0.35, '#ffd700', 'willow');
    });
  }

  // Start immediately upon loading
  setTimeout(startCelebration, 500);
});
