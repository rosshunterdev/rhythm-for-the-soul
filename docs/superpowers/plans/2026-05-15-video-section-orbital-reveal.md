# Video Section: Orbital Reveal + Cinematic Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a spinning orbital SVG reveal, ambient video glow, and placeholder pull-quote to the video section of the homepage to strengthen the first-scroll emotional hook.

**Architecture:** All changes are isolated to `src/pages/index.astro` — the `.video-reel` section HTML, its scoped `<style>` block, and the existing homepage `<script>` block. No new files or components. The orbital is an inline SVG positioned absolutely at the top-left of the section, clipped by the section's `overflow: hidden` so it rises into view as the user scrolls. Rotation is driven entirely by a `requestAnimationFrame` loop (no CSS keyframe animation), enabling bidirectional spin based on scroll direction and velocity.

**Tech Stack:** Astro, Tailwind CSS v4, vanilla JS (rAF), inline SVG

---

## File Map

| File | Change |
|------|--------|
| `src/pages/index.astro` HTML | Add orbital SVG before `.video-reel-inner`; add `poster` attr to `<video>`; add `.video-quote` figure after `.video-reel-wrap` |
| `src/pages/index.astro` `<style>` | Update `.video-reel` (position/overflow/isolation); add `.video-reel-inner` stacking; update `.video-reel-wrap` box-shadow; add `.orbital` rules; add `.video-quote*` rules |
| `src/pages/index.astro` `<script>` | Append rAF bidirectional spin IIFE |

---

## Task 1: Poster image + ambient glow

**Files:**
- Modify: `src/pages/index.astro` (HTML ~line 122, style ~line 816)

- [ ] **Step 1: Add poster attribute to the video element**

In the HTML section of `index.astro`, find the `<video>` element (~line 122) and add `poster="/images/video-screenshot.png"`:

```html
<video
  class="video-reel-player"
  src="/RFTS%20music%20video.mp4"
  poster="/images/video-screenshot.png"
  controls
  preload="metadata"
  playsinline
>
```

- [ ] **Step 2: Add amber ambient glow to `.video-reel-wrap`**

In the `<style>` block, find `.video-reel-wrap` (~line 816) and replace the existing `box-shadow` with the version that includes the amber bloom:

```css
.video-reel-wrap {
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(196, 168, 130, 0.18),
    0 0 120px 40px rgba(196, 168, 130, 0.09),
    0 24px 80px rgba(0, 0, 0, 0.50),
    0 6px 24px rgba(0, 0, 0, 0.30);
}
```

- [ ] **Step 3: Take screenshot and verify**

```bash
node screenshot.mjs
```

Expected: video player now shows the poster image (a still frame from the video) instead of a black rectangle. A faint warm amber glow is visible around the player edges. If the screenshot path needs a label use `video-poster-glow`.

- [ ] **Step 4: Suggested commit (user runs this)**

```
git add src/pages/index.astro
git commit -m "feat: add video poster image and ambient amber glow"
```

---

## Task 2: Orbital SVG element + positioning

**Files:**
- Modify: `src/pages/index.astro` (HTML ~line 114, style ~line 763)

- [ ] **Step 1: Update `.video-reel` CSS to create stacking context**

Find `.video-reel` in the `<style>` block and add `position: relative`, `overflow: hidden`, and `isolation: isolate`:

```css
.video-reel {
  background: #2E3141;
  padding: 5rem 0 6rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
```

- [ ] **Step 2: Give `.video-reel-inner` a stacking layer above the orbital**

Find `.video-reel-inner` in the `<style>` block. Add `position: relative` and `z-index: 1`:

```css
.video-reel-inner {
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 3: Add the orbital SVG to the HTML**

Immediately inside `<section class="video-reel" ...>`, before `<div class="video-reel-inner">`, insert this inline SVG. The dots are computed to lie exactly on each ring radius:

```html
<svg
  class="orbital"
  viewBox="0 0 400 400"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <!-- Rings: radii 60, 100, 145, 190 -->
  <circle cx="200" cy="200" r="60"  fill="none" stroke="#C4A882" stroke-width="1.2"/>
  <circle cx="200" cy="200" r="100" fill="none" stroke="#C4A882" stroke-width="1.2"/>
  <circle cx="200" cy="200" r="145" fill="none" stroke="#C4A882" stroke-width="1.5"/>
  <circle cx="200" cy="200" r="190" fill="none" stroke="#C4A882" stroke-width="2.5"/>

  <!-- Center dot -->
  <circle cx="200" cy="200" r="7" fill="#C4A882"/>

  <!-- Ring 1 dots (r=60): θ=-90°, θ=30° -->
  <circle cx="200" cy="140" r="4.5" fill="#C4A882"/>
  <circle cx="252" cy="230" r="4"   fill="#C4A882"/>

  <!-- Ring 2 dots (r=100): θ=-90°, θ=150°, θ=45° -->
  <circle cx="200" cy="100" r="5"   fill="#C4A882"/>
  <circle cx="113" cy="250" r="4.5" fill="#C4A882"/>
  <circle cx="271" cy="271" r="4"   fill="#C4A882"/>

  <!-- Ring 3 dots (r=145): θ=-60°, θ=10°, θ=120°, θ=190° -->
  <circle cx="273" cy="74"  r="5"   fill="#C4A882"/>
  <circle cx="343" cy="225" r="4.5" fill="#C4A882"/>
  <circle cx="128" cy="326" r="4.5" fill="#C4A882"/>
  <circle cx="57"  cy="175" r="4"   fill="#C4A882"/>

  <!-- Ring 4 dots (r=190): 8 evenly spaced at 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315° -->
  <circle cx="390" cy="200" r="5.5" fill="#C4A882"/>
  <circle cx="334" cy="334" r="5"   fill="#C4A882"/>
  <circle cx="200" cy="390" r="5.5" fill="#C4A882"/>
  <circle cx="66"  cy="334" r="5"   fill="#C4A882"/>
  <circle cx="10"  cy="200" r="5.5" fill="#C4A882"/>
  <circle cx="66"  cy="66"  r="5"   fill="#C4A882"/>
  <circle cx="200" cy="10"  r="5.5" fill="#C4A882"/>
  <circle cx="334" cy="66"  r="5"   fill="#C4A882"/>
</svg>
```

- [ ] **Step 4: Add `.orbital` CSS**

In the `<style>` block, add this rule (place it in the Video reel section near the other `.video-reel-*` rules):

```css
.orbital {
  position: absolute;
  top: -160px;
  left: -80px;
  width: 440px;
  height: 440px;
  opacity: 0.32;
  z-index: 0;
  pointer-events: none;
  /* transform set by rAF script — no CSS animation */
}

@media (prefers-reduced-motion: reduce) {
  .orbital { display: none; }
}
```

- [ ] **Step 5: Take screenshot and verify**

```bash
node screenshot.mjs
```

Expected: the lower arc of the orbital rings is visible in the top-left of the video section — a partial amber circle, clipped at the top. The heading and video player sit above/in front of the orbital with no z-index conflicts. Label the screenshot `orbital-clip`.

- [ ] **Step 6: Suggested commit (user runs this)**

```
git add src/pages/index.astro
git commit -m "feat: add orbital SVG with scroll-reveal clip positioning"
```

---

## Task 3: Pull-quote

**Files:**
- Modify: `src/pages/index.astro` (HTML ~line 131, style block)

- [ ] **Step 1: Add pull-quote markup after the video wrap**

In the HTML, find the closing `</div>` of `.video-reel-wrap` (~line 131). Insert the figure immediately after it, still inside `.video-reel-inner`:

```html
      </div><!-- /.video-reel-wrap -->

      <figure class="video-quote reveal reveal-delay-2">
        <blockquote class="video-quote-text">
          &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&rdquo;
        </blockquote>
        <figcaption class="video-quote-attr">
          Lorem Ipsum &middot; Placeholder, Organisation Name
        </figcaption>
      </figure>
```

- [ ] **Step 2: Add pull-quote CSS**

In the `<style>` block, add these rules after the existing `.video-reel-*` rules:

```css
/* ── Pull-quote ─────────────────────────────────────────── */
.video-quote {
  position: relative;
  margin: 2.5rem auto 0;
  padding: 2rem 1rem 0;
  text-align: center;
  max-width: 40rem;
}

.video-quote::before {
  content: '\201C';
  font-family: 'Fraunces', Georgia, serif;
  font-size: 8rem;
  line-height: 1;
  color: rgba(196, 168, 130, 0.08);
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  user-select: none;
}

.video-quote-text {
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(1.25rem, 2.5vw, 1.6rem);
  font-style: italic;
  font-variation-settings: 'opsz' 72, 'wght' 400;
  color: #C4A882;
  line-height: 1.4;
  margin: 0;
}

.video-quote-attr {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  color: rgba(245, 240, 232, 0.45);
  margin-top: 0.75rem;
  letter-spacing: 0.02em;
}
```

- [ ] **Step 3: Take screenshot and verify**

```bash
node screenshot.mjs
```

Expected: pull-quote appears below the video in clay/amber italic Fraunces. Attribution is small and muted. Faint decorative quotation mark sits behind the text. Label the screenshot `pull-quote`. If the `::before` quote mark isn't visible, confirm `.video-quote` has `position: relative` and the `z-index` stack is correct.

- [ ] **Step 4: Suggested commit (user runs this)**

```
git add src/pages/index.astro
git commit -m "feat: add pull-quote below video with decorative styling"
```

---

## Task 4: rAF bidirectional spin

**Files:**
- Modify: `src/pages/index.astro` (existing `<script>` block at ~line 839)

- [ ] **Step 1: Append the rAF IIFE to the existing homepage script block**

Find the closing `</script>` tag at the bottom of `index.astro` (~line 852). Insert the following immediately before it:

```js
  // Orbital: rAF-driven bidirectional spin
  // scroll down → clockwise, scroll up → counterclockwise, idle → slow clockwise
  ;(function () {
    const orbital = document.querySelector('.orbital');
    if (!orbital || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const BASE_VEL  = 0.04;   // deg/frame at idle (~80s per rotation at 60fps)
    const MAX_VEL   = 8;      // deg/frame cap at peak scroll speed
    const LERP      = 0.06;   // easing factor toward target velocity

    let angle          = 0;
    let currentVel     = BASE_VEL;
    let targetVel      = BASE_VEL;
    let lastScrollY    = window.scrollY;
    let lastScrollTime = performance.now();
    let resetTimer     = null;

    function tick() {
      currentVel += (targetVel - currentVel) * LERP;
      angle      += currentVel;
      orbital.style.transform = `rotate(${angle}deg)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    window.addEventListener('scroll', () => {
      const now  = performance.now();
      const dt   = now - lastScrollTime || 1;
      const dy   = window.scrollY - lastScrollY;          // signed: + down, - up
      const dir  = dy >= 0 ? 1 : -1;
      const mag  = Math.abs(dy) / dt;                     // px/ms magnitude

      targetVel = dir * Math.min(MAX_VEL, BASE_VEL + mag * 4);

      lastScrollY    = window.scrollY;
      lastScrollTime = now;

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { targetVel = BASE_VEL; }, 600);
    }, { passive: true });
  })();
```

- [ ] **Step 2: Open the dev server and test manually**

Navigate to `http://localhost:4321` in the browser.

- **Idle:** orbital rotates slowly clockwise — barely perceptible
- **Scroll down (fast):** orbital visibly spins up clockwise
- **Scroll up:** orbital reverses to counterclockwise
- **Release scroll:** orbital decelerates and eases back to slow clockwise over ~600ms

If the spin doesn't feel right, tune `BASE_VEL` (idle speed), `MAX_VEL` (peak speed cap), or the `mag * 4` multiplier (how aggressively scroll velocity maps to spin speed).

- [ ] **Step 3: Verify `prefers-reduced-motion` in DevTools**

In browser DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Confirm the orbital is hidden (`display: none` from the CSS rule added in Task 2). The rest of the section should be unaffected.

- [ ] **Step 4: Take screenshot**

```bash
node screenshot.mjs
```

Screenshot captures the static state — can't show the spin in a still. Label it `orbital-final`. Confirm overall composition looks correct: orbital arc bottom-left, heading centred, video with poster and glow, pull-quote below.

- [ ] **Step 5: Suggested commit (user runs this)**

```
git add src/pages/index.astro
git commit -m "feat: add rAF bidirectional orbital spin driven by scroll velocity"
```

---

## Task 5: Final verification

**Files:** None — verification only

- [ ] **Step 1: Check mobile layout**

In browser DevTools, switch to a 375px width viewport. Confirm:
- The orbital arc is clipped as expected and doesn't cause horizontal overflow on the page
- The pull-quote wraps correctly and stays readable
- The video poster shows correctly at mobile width

If the orbital causes horizontal overflow at mobile, add to `.video-reel` in the style block:
```css
@media (max-width: 639px) {
  .orbital { width: 280px; height: 280px; top: -100px; left: -60px; }
}
```

- [ ] **Step 2: Take final labeled screenshot**

```bash
node screenshot.mjs
```

Label `video-section-complete`. Compare against the design goals:
1. Orbital arc visible at section entry ✓
2. Amber glow around video player ✓
3. Poster image visible before play ✓
4. Pull-quote styled in Fraunces italic clay ✓
5. No visual regressions in the sections above or below ✓

- [ ] **Step 3: Suggested final commit (user runs this)**

```
git add src/pages/index.astro
git commit -m "feat: video section orbital reveal, cinematic glow, and pull-quote"
```
