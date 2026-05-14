# Design Spec: Video Section — Orbital Reveal + Cinematic Enhancement

**Date:** 2026-05-15
**Status:** Approved
**Scope:** `src/pages/index.astro` — `.video-reel` section and its `<style>` block only

---

## Goal

Strengthen the emotional hook of the first scroll destination (the video section). The user should feel the energy and craft of the brand the moment they scroll past the hero. Three enhancements work together: a scroll-revealed spinning orbital element, a cinematic video presentation, and a pull-quote that closes the emotional loop.

---

## Part 1 — Spinning Orbital Element

### What it is

An inline SVG (not the PNG asset — transparent background so it composites cleanly) recreating the concentric orbital ring design from `/public/images/screenshot-spinning-icon.png`.

### SVG structure

- `viewBox="0 0 400 400"` — centred on `cx="200" cy="200"`
- 4 concentric rings at radii ~60, ~100, ~145, ~190px
- Outer ring: stroke-width ~2.5px; inner rings: ~1–1.5px
- Small filled circles (r ~4–5px) scattered on the rings — roughly 8–12 dots total, distributed unevenly for an orbital/orrery feel
- Filled center dot r ~8px
- All strokes and fills: `#C4A882` (clay token — `var(--color-clay)`)
- No background fill — fully transparent

### Positioning

```
.video-reel {
  position: relative;
  overflow: hidden;   /* clips the top ~40% of orbital at section entry */
}

.orbital {
  position: absolute;
  top: -160px;
  left: -80px;
  width: 440px;
  height: 440px;
  opacity: 0.32;
  z-index: 0;         /* behind heading, video, quote */
  pointer-events: none;
}
```

As the `.video-reel` section scrolls up into the viewport, the lower arc of the orbital enters first, then the full circle reveals — creating a scroll-driven emergence effect without JS.

### Animation

No CSS keyframe animation. Rotation is driven entirely by the `requestAnimationFrame` loop in Part 4, which sets `transform: rotate(Ndeg)` directly on the element. This allows smooth bidirectional control (clockwise on scroll down, counterclockwise on scroll up) without the snap that occurs when toggling CSS `animation-direction` mid-animation.

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .orbital { display: none; }
}
```

The rAF loop also guards with `matchMedia('(prefers-reduced-motion: reduce)')` and exits early if set.

---

## Part 2 — Cinematic Video

### Poster image

Add `poster="/images/video-screenshot.png"` to the `<video>` element. Eliminates the black void shown before the user hits play.

### Ambient glow

Add an additional layered `box-shadow` entry to `.video-reel-wrap` — a large diffuse amber bloom at low opacity, sitting alongside the existing dark drop-shadows:

```css
box-shadow:
  0 0 0 1px rgba(196, 168, 130, 0.18),
  0 0 120px 40px rgba(196, 168, 130, 0.09),   /* amber glow — new */
  0 24px 80px rgba(0, 0, 0, 0.50),
  0 6px 24px rgba(0, 0, 0, 0.30);
```

No new elements or pseudo-elements needed — just an additional shadow layer.

---

## Part 3 — Pull-Quote

### Content

Placeholder text until a real quote is confirmed with the client:

> "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

Attribution: **Lorem Ipsum** · Placeholder, Organisation Name

The quote slot is deliberately short — one sentence maximum — so the replacement copy fits the layout without adjustment.

### Placement

Directly below `.video-reel-wrap`, inside `.video-reel-inner`. Full width of the `56rem` container, centred.

### Markup

```html
<figure class="video-quote reveal reveal-delay-2">
  <blockquote class="video-quote-text">
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  </blockquote>
  <figcaption class="video-quote-attr">
    Lorem Ipsum · Placeholder, Organisation Name
  </figcaption>
</figure>
```

### Styling

- `.video-quote-text`: Fraunces italic, `clamp(1.25rem, 2.5vw, 1.6rem)`, `#C4A882` (clay), centred, no margin before/after
- `.video-quote-attr`: DM Sans, `0.8rem`, `rgba(245,240,232,0.45)`, centred, `margin-top: 0.75rem`
- Decorative large `"` behind the text: `::before` pseudo, Fraunces, `8rem`, `rgba(196,168,130,0.08)`, `position: absolute`, centred above text
- `.video-quote`: `position: relative`, `margin-top: 2.5rem`, `padding: 2rem 1rem 0`

---

## Part 4 — rAF-Driven Bidirectional Spin

### Behaviour

- **Idle:** orbital spins clockwise at a slow base rate (~0.04 deg/frame ≈ one rotation per 80s at 60fps)
- **Scroll down:** spin accelerates clockwise, proportional to scroll velocity
- **Scroll up:** spin reverses to counterclockwise, proportional to scroll velocity
- **Scroll stops:** target velocity lerps back to the base clockwise rate over ~600ms (feels like natural deceleration, not a snap)

### Implementation

Appended to the existing homepage `<script>` block:

```js
(function () {
  const orbital = document.querySelector('.orbital');
  if (!orbital || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const BASE_DEG_PER_FRAME = 0.04;   // idle clockwise speed
  const MAX_DEG_PER_FRAME  = 8;      // cap at high scroll velocity
  const LERP_FACTOR        = 0.06;   // how quickly velocity eases toward target

  let angle           = 0;
  let currentVel      = BASE_DEG_PER_FRAME;
  let targetVel       = BASE_DEG_PER_FRAME;
  let lastScrollY     = window.scrollY;
  let lastScrollTime  = performance.now();
  let resetTimer      = null;

  function tick() {
    // Lerp current velocity toward target
    currentVel += (targetVel - currentVel) * LERP_FACTOR;
    angle += currentVel;
    orbital.style.transform = `rotate(${angle}deg)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  window.addEventListener('scroll', () => {
    const now = performance.now();
    const dt  = now - lastScrollTime || 1;
    const dy  = window.scrollY - lastScrollY;           // signed: + = down, - = up
    const direction = dy >= 0 ? 1 : -1;
    const velocity  = Math.abs(dy) / dt;               // px/ms magnitude

    // Scale velocity to deg/frame, clamp, apply direction
    targetVel = direction * Math.min(MAX_DEG_PER_FRAME, BASE_DEG_PER_FRAME + velocity * 4);

    lastScrollY    = window.scrollY;
    lastScrollTime = now;

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      targetVel = BASE_DEG_PER_FRAME;   // ease back to idle clockwise
    }, 600);
  }, { passive: true });
})();
```

### Notes

- No CSS `animation` on `.orbital` — rotation is 100% JS-driven via `style.transform`
- `LERP_FACTOR` of `0.06` gives a smooth ease without feeling sluggish — tune if needed
- Bidirectional: scroll up reverses the spin; returning to idle always restores clockwise
- Wrapped in IIFE — no global scope pollution
- `prefers-reduced-motion` guard exits early; CSS also hides the element entirely as a fallback

---

## Files Changed

| File | Change |
|------|--------|
| `src/pages/index.astro` | Add `.orbital` SVG, poster attr to `<video>`, ambient glow to `.video-reel-wrap`, `.video-quote` figure, scroll-velocity JS, associated CSS |

No other files are touched.

---

## Out of Scope

- Changes to any other page section or route
- Changes to the heading copy (`video-reel-heading`, `video-reel-sub`)
- Logo or header changes
- The known issues from the handover (Meet Chewy colour, hero scroll cue) — separate task

---

## Success Criteria

1. Orbital arc is visible as soon as the video section enters the viewport; full circle is visible once the section is fully in view
2. Orbital spins clockwise at base rate when idle; accelerates clockwise on scroll down; reverses counterclockwise on scroll up; eases back to base clockwise on scroll stop
3. Video shows the poster screenshot before play — no black frame
4. Warm amber glow is visible around the video player
5. Pull-quote appears below the video with a reveal animation
6. `prefers-reduced-motion: reduce` stops the orbital animation entirely
7. No regressions on mobile layout
