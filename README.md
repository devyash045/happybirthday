# Muskan's Personal Cinematic Birthday Universe ✨

A production-ready, highly personalized, cinematic romantic universe built with pure HTML5, CSS3, and Vanilla JavaScript for **Muskan (Pari)** — lovingly called *Wifeee Jiii*, *Meri Dharam Patni*, and *Meri Personal Laxmi*.

---

## 🌟 Architecture Overview

The experience is built as an 11-page cinematic journey:

1. **`index.html`** — "A Little Surprise For My Wifeee Jiii": Atmospheric entrance with curiosity, floating petals, and a playful dodging "No 😶" button with speech bubbles.
2. **`loading.html`** — "Preparing Her Universe": Sequential glowing cosmic loader that gracefully transitions into the hero scene.
3. **`hero.html`** — Grand Birthday Reveal: Live digital clock & the signature `#memoryOrb` with multi-ring animation, celestial dust, and a purple-pink cosmic expansion transition.
4. **`memories.html`** — "Memories Only We Know": Interactive constellation map & 3D storybook with page-turning controls, symbolic CSS illustrations (protecting relationship privacy), and the sincere accountability reflection *"I Know I Haven't Always Been Perfect..."*.
5. **`love-letter.html`** — "A Letter For My Wifeee Jiii": Floating sealed 3D envelope with animated wax seal that unrolls a heartfelt letter.
6. **`our-song.html`** — "A Song From My Heart, Just For You": Floating vinyl disc player for *"Aaj Se Teri"* (sung by Yash) with audio visualizer waveform, controls, graceful acoustic synthesizer fallback, and an unlocked personal voice note player.
7. **`surprises.html`** — "Little Surprises For My Pari": 8 interactive gift boxes (white roses, red roses, chocolates, teddy bear, secret coupons, vows) that unwrap with custom modal reveals.
8. **`reasons.html`** — "The Girl Who Makes My World Beautiful": 12 interactive 3D flip cards honoring her smile, efforts, understanding, cute anger, and the golden royal card for *Meri Personal Laxmi*.
9. **`our-future.html`** — "A Thousand Tomorrows With You": Connected golden glowing timeline with 8 future dreams and a personal lifelong promise.
10. **`proposal.html`** — "An Eternal Question": Heartfelt romantic proposal shayari, 3D royal velvet ring box that opens to reveal a diamond ring, and an emotional proposal.
11. **`celebration.html`** — "It's Your Universe, Pari!": Grand celebratory finale featuring HTML Canvas fireworks, confetti bursts, poppable balloons, floating Diwali Diyas & Golden Anar.
12. **`ending.html`** — "My Favourite Part Of Every Tomorrow": Staggered poetic reveal under a glowing midnight moon with a final keepsake modal and replay journey option.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic tags, accessible ARIA attributes, keyboard navigation (`tabindex`, `role="button"`, `Enter`/`Space` handlers).
- **CSS3**: 3D transforms, fluid typography (`clamp()`, `min()`, `max()`), custom design system tokens, glassmorphism, responsive grid & flexbox.
- **Vanilla JavaScript**: ES6+, zero external framework dependencies, requestAnimationFrame animation loops, debounced listeners.
- **Web Audio API**: Built-in ambient harmonic chord synthesizer (instant celestial background sound with no external MP3 dependency required!), interactive crystalline chimes, and acoustic melody player.

---

## 🚀 Running Locally

You do not need Node.js, npm, or any build step to run this website.

### Option 1: Python HTTP Server (Recommended)
Open your terminal inside the `happyBirthday` directory:

```bash
cd happyBirthday
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 2: VS Code Live Server
Right-click on `index.html` inside VS Code and choose **"Open with Live Server"**.

### Option 3: Direct File Opening
Double-click `index.html` to open it directly in Safari, Chrome, or Firefox.

---

## 🎙️ Adding Personal Audio Recordings

The website has two dedicated audio spots configured in `js/config.js`:
- **Song Recording**: `assets/audio/my-singing.mp3` ("Aaj Se Teri" recorded by you)
- **Voice Message**: `assets/audio/my-voice-note.mp3` (Your personal spoken note)

### Steps to add:
1. Export your singing as an `.mp3` file and name it `my-singing.mp3`.
2. Export your spoken voice message as an `.mp3` file and name it `my-voice-note.mp3`.
3. Place both files directly into:
   ```
   happyBirthday/assets/audio/
   ```
4. Refresh `our-song.html` — the vinyl player and voice note player will automatically play your recordings!
*(Note: If the files are absent, the player displays a graceful status message and plays an acoustic synthesizer melody preview, so the experience never breaks).*

---

## ⚙️ Customizing Content & Text

All personal dates, nicknames, chapters, reasons, surprises, and dreams are centralized in one clean configuration file:

```
happyBirthday/js/config.js
```

You can open this file and edit:
- `name` / `anotherName` ("Muskan", "Pari")
- `nicknames` (*Wifeee Jiii*, *Meri Dharam Patni*, *Meri Personal Laxmi*)
- `dates` (Birthday: 8 November 2026, Anniversary: 2 April 2026)
- Memory chapters, reasons, and timeline goals

---

## 🔒 Privacy & Static Deployment Note

- **No Private Photos Included**: This website uses symbolic CSS illustrations and starlight constellations instead of private photos or chats, ensuring Muskan's privacy is respected.
- **Static Hosting Public Nature**: Note that any static website deployed to Vercel or GitHub Pages is publicly accessible to anyone who has the URL. Do not place sensitive identity documents or private personal files in the public assets directory without authentication.

---

## 🚢 Deploying to Vercel

### Method 1: Vercel CLI (Fastest)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Navigate to the `happyBirthday` directory:
   ```bash
   cd /Users/yash/Desktop/m/happyBirthday
   ```
3. Run the deployment command:
   ```bash
   vercel
   ```
4. For production:
   ```bash
   vercel --prod
   ```

### Method 2: Git Repository (GitHub / GitLab)
1. Push the `happyBirthday` directory to your GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository, set the root directory to `happyBirthday` (if within a monorepo) or root.
4. Framework Preset: **Other / None (Static)**.
5. Click **Deploy**. Vercel will deploy it in seconds with global SSL and CDN!

---

*“Out of all the stars in this universe, you will always be my favourite.”* ❤️

