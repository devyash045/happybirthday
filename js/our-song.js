/**
 * PAGE 6: our-song.js — Dual Track Vinyl Player (Aaj Se Teri + Bade Achhe Lagte Hain)
 * Features:
 * - Dual track switching (Track 1: "Aaj Se Teri", Track 2: "Bade Achhe Lagte Hain")
 * - Dynamic vinyl center label and color theme transitions (Rose & Gold)
 * - Real audio playback for assets/audio/aajseteri.mp3 & badeachelgtehai.mp3
 * - Audio visualizer waveform animation
 * - Graceful fallback to synthesized acoustic melody if needed
 * - Personal voice note player unlocking
 */

document.addEventListener('DOMContentLoaded', () => {
  const audioConfig = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.audio) ? window.BIRTHDAY_CONFIG.audio : {
    primarySong: {
      id: "aaj-se-teri",
      title: "Aaj Se Teri",
      artist: "Originally by Arijit Singh • Sung with love by Yash",
      path: "assets/audio/aajseteri.mp3",
      label1: "AAJ SE TERI",
      label2: "FOR PARI",
      theme: "rose",
      tagline: "“Aaj se teri saari galiyan meri ho gayi... Meri Pari.”"
    },
    complimentarySong: {
      id: "bade-achhe-lagte-hain",
      title: "Bade Achhe Lagte Hain",
      artist: "A Special Complimentary Melody • For My Wifeee Jiii",
      path: "assets/audio/badeachelgtehai.mp3",
      label1: "BADE ACHHE LAGTE HAIN",
      label2: "FOR WIFEEE JIII",
      theme: "gold",
      tagline: "“Yeh Dharti, Yeh Nadiya, Yeh Raina... Aur Tum.”"
    },
    voiceNoteRecording: "assets/audio/my-voice-note.mp3"
  };

  // DOM Elements - Song Player
  const playerCard = document.getElementById('player-card');
  const vinylDisc = document.getElementById('vinyl-disc');
  const vinylLabelTitle = document.getElementById('vinyl-label-title');
  const vinylLabelSub = document.getElementById('vinyl-label-sub');
  const songTitleEl = document.getElementById('song-title');
  const songArtistEl = document.getElementById('song-artist');
  const songTaglineEl = document.getElementById('song-tagline');

  const tabSong1 = document.getElementById('tab-song-1');
  const tabSong2 = document.getElementById('tab-song-2');

  const btnPlay = document.getElementById('btn-play-song');
  const btnReplay = document.getElementById('btn-replay-song');
  const progressTrack = document.getElementById('progress-track');
  const progressCurrent = document.getElementById('progress-current');
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  const volumeSlider = document.getElementById('volume-slider');
  const audioNotice = document.getElementById('audio-notice');
  const waveformContainer = document.getElementById('waveform-box');
  const btnUnlockVoice = document.getElementById('btn-unlock-voice');

  // DOM Elements - Voice Note
  const voiceNoteCard = document.getElementById('voice-note-card');
  const btnPlayVoice = document.getElementById('btn-play-voice');
  const voiceProgressCurrent = document.getElementById('voice-progress-current');
  const voiceTimeCurrent = document.getElementById('voice-time-current');

  // Build Waveform Bars
  if (waveformContainer) {
    waveformContainer.innerHTML = '';
    const barCount = 38;
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      bar.style.animationDelay = `${(i * 0.05).toFixed(2)}s`;
      waveformContainer.appendChild(bar);
    }
  }

  // Active track state
  let currentTrackKey = 'primary';
  let activeSongData = audioConfig.primarySong;

  // Audio Instances
  const songAudio = new Audio(activeSongData.path);
  const voiceAudio = new Audio(audioConfig.voiceNoteRecording);

  let isSongPlaying = false;
  let isVoicePlaying = false;
  let isSynthPreview = false;
  let synthTimer = null;
  let previewProgress = 0;

  // Track Switching Function
  function switchTrack(trackKey, autoPlay = true) {
    if (currentTrackKey === trackKey && isSongPlaying) return;

    // Stop current playback
    stopSong();

    currentTrackKey = trackKey;
    activeSongData = trackKey === 'primary' ? audioConfig.primarySong : audioConfig.complimentarySong;

    // Update Tabs
    if (trackKey === 'primary') {
      tabSong1.classList.add('active');
      tabSong1.setAttribute('aria-selected', 'true');
      tabSong2.classList.remove('active');
      tabSong2.setAttribute('aria-selected', 'false');
    } else {
      tabSong2.classList.add('active');
      tabSong2.setAttribute('aria-selected', 'true');
      tabSong1.classList.remove('active');
      tabSong1.setAttribute('aria-selected', 'false');
    }

    // Update Vinyl visuals & text
    if (activeSongData.theme === 'gold') {
      vinylDisc.classList.remove('theme-rose');
      vinylDisc.classList.add('theme-gold');
    } else {
      vinylDisc.classList.remove('theme-gold');
      vinylDisc.classList.add('theme-rose');
    }

    if (vinylLabelTitle) vinylLabelTitle.textContent = activeSongData.label1;
    if (vinylLabelSub) vinylLabelSub.textContent = activeSongData.label2;
    if (songTitleEl) songTitleEl.textContent = activeSongData.title;
    if (songArtistEl) songArtistEl.textContent = activeSongData.artist;
    if (songTaglineEl) songTaglineEl.textContent = activeSongData.tagline;

    // Reset scrubber & time
    if (progressCurrent) progressCurrent.style.width = '0%';
    if (timeCurrent) timeCurrent.textContent = '00:00';
    if (audioNotice) audioNotice.style.display = 'none';

    // Load new audio path
    isSynthPreview = false;
    songAudio.src = activeSongData.path;
    songAudio.load();

    if (window.playChime) window.playChime(trackKey === 'primary' ? 659.25 : 783.99);

    if (autoPlay) {
      setTimeout(() => {
        startSong();
      }, 250);
    }
  }

  if (tabSong1) tabSong1.addEventListener('click', () => switchTrack('primary'));
  if (tabSong2) tabSong2.addEventListener('click', () => switchTrack('complimentary'));

  // Handle Missing Audio gracefully with Web Audio Acoustic Melody
  songAudio.addEventListener('error', () => {
    isSynthPreview = true;
    if (audioNotice) {
      audioNotice.style.display = 'flex';
      audioNotice.innerHTML = `
        <span style="font-size: 1.4rem;">💡</span>
        <div>
          <strong>Playing Acoustic Melody Preview:</strong> File <code>${activeSongData.path}</code> is being synthesized live! ✨
        </div>
      `;
    }
    if (timeTotal) timeTotal.textContent = '01:30';
  });

  songAudio.addEventListener('loadedmetadata', () => {
    if (timeTotal) timeTotal.textContent = formatTime(songAudio.duration);
  });

  songAudio.addEventListener('timeupdate', () => {
    if (isSongPlaying && !isSynthPreview) {
      const pct = (songAudio.currentTime / (songAudio.duration || 1)) * 100;
      if (progressCurrent) progressCurrent.style.width = `${pct}%`;
      if (timeCurrent) timeCurrent.textContent = formatTime(songAudio.currentTime);
    }
  });

  songAudio.addEventListener('ended', () => {
    stopSong();
    unlockVoiceNote();
  });

  // Song Play / Pause
  function toggleSong() {
    if (isVoicePlaying) toggleVoiceNote(); // Pause voice if playing

    if (!isSongPlaying) {
      startSong();
    } else {
      stopSong();
    }
  }

  function startSong() {
    isSongPlaying = true;
    playerCard.classList.add('playing');
    vinylDisc.classList.add('playing');
    btnPlay.innerHTML = '<span aria-hidden="true">⏸</span>';

    if (!isSynthPreview) {
      const playPromise = songAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          runSynthPreview();
        });
      }
    } else {
      runSynthPreview();
    }
  }

  function stopSong() {
    isSongPlaying = false;
    playerCard.classList.remove('playing');
    vinylDisc.classList.remove('playing');
    btnPlay.innerHTML = '<span aria-hidden="true">▶</span>';

    if (!isSynthPreview) {
      songAudio.pause();
    } else {
      clearInterval(synthTimer);
    }
  }

  // Synthetic acoustic preview generator for fallback
  const melodyNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 392.00, 349.23, 329.63];
  let noteIdx = 0;

  function runSynthPreview() {
    clearInterval(synthTimer);
    synthTimer = setInterval(() => {
      if (!isSongPlaying) return;
      if (window.playChime) {
        window.playChime(melodyNotes[noteIdx]);
        noteIdx = (noteIdx + 1) % melodyNotes.length;
      }
      previewProgress += 1.1;
      if (progressCurrent) progressCurrent.style.width = `${Math.min(previewProgress, 100)}%`;
      if (timeCurrent) timeCurrent.textContent = formatTime((previewProgress / 100) * 90);

      if (previewProgress >= 100) {
        stopSong();
        previewProgress = 0;
        unlockVoiceNote();
      }
    }, 1000);
  }

  // Replay
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      if (!isSynthPreview) {
        songAudio.currentTime = 0;
      } else {
        previewProgress = 0;
      }
      startSong();
    });
  }

  // Progress Scrubber Click
  if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const pct = Math.max(0, Math.min(1, clickX / width));

      if (!isSynthPreview && songAudio.duration) {
        songAudio.currentTime = pct * songAudio.duration;
      } else {
        previewProgress = pct * 100;
        if (progressCurrent) progressCurrent.style.width = `${previewProgress}%`;
      }
    });
  }

  // Volume
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      songAudio.volume = parseFloat(e.target.value);
    });
  }

  // Unlock Voice Note Section
  function unlockVoiceNote() {
    if (voiceNoteCard) {
      voiceNoteCard.classList.add('revealed');
      voiceNoteCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (window.playChime) window.playChime(880);
    }
  }

  if (btnUnlockVoice) {
    btnUnlockVoice.addEventListener('click', (e) => {
      e.preventDefault();
      unlockVoiceNote();
    });
  }

  // Voice Note Player
  function toggleVoiceNote() {
    if (isSongPlaying) stopSong();

    if (!isVoicePlaying) {
      isVoicePlaying = true;
      btnPlayVoice.innerHTML = '<span>⏸ Pause Voice Note</span>';
      voiceAudio.play().catch(() => {
        // Fallback acoustic tone if missing
        if (window.playChime) {
          window.playChime(587.33);
          setTimeout(() => window.playChime(659.25), 400);
          setTimeout(() => window.playChime(523.25), 800);
        }
      });
    } else {
      isVoicePlaying = false;
      btnPlayVoice.innerHTML = '<span>▶ Play Voice Note</span>';
      voiceAudio.pause();
    }
  }

  voiceAudio.addEventListener('timeupdate', () => {
    if (isVoicePlaying) {
      const pct = (voiceAudio.currentTime / (voiceAudio.duration || 1)) * 100;
      if (voiceProgressCurrent) voiceProgressCurrent.style.width = `${pct}%`;
      if (voiceTimeCurrent) voiceTimeCurrent.textContent = formatTime(voiceAudio.currentTime);
    }
  });

  voiceAudio.addEventListener('ended', () => {
    isVoicePlaying = false;
    btnPlayVoice.innerHTML = '<span>▶ Play Voice Note</span>';
  });

  if (btnPlay) btnPlay.addEventListener('click', toggleSong);
  if (btnPlayVoice) btnPlayVoice.addEventListener('click', toggleVoiceNote);

  // Helper: Format seconds to MM:SS
  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // Initialize track metadata
  switchTrack('primary', false);
});
