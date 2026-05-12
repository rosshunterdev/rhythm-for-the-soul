# Hero Redesign — Rhythm for the Soul

**Date:** 2026-05-12
**Status:** Approved, ready for implementation
**File scope:** `src/pages/index.astro` (hero section and its `<style>` block only)

---

## Problem

The current hero is a full-bleed photo with a left-weighted gradient vignette and text overlaid on top. Three weaknesses:

1. **Readability** — Text legibility depends entirely on the gradient. On the live photo (`group.jpg`) it is marginal.
2. **Generic feel** — The layout pattern (photo + gradient + centred-left text) is the default choice for any wellness/community brand.
3. **Insufficient typographic scale** — The heading is not large enough to carry the hero on its own if the photo underperforms.

---

## Design Decision

**Split panel: diagonal charcoal left, amber-tinted photo right.**

Selected from three layout candidates (full-bleed overlay, split panel, dark stage) and three edge/photo treatments (hard split, diagonal + amber, gradient bleed + forest tint).

---

## Layout

### Desktop (≥ 768px)

```
┌──────────────────────────────────────────────────────┐
│ CHARCOAL PANEL (58%)  ╲  PHOTO (group.jpg, 100%)     │
│                        ╲                              │
│  [pill] Booking now     ╲  [warm amber overlay]       │
│                          ╲                            │
│  Rhythm                   ╲                           │
│  for everyone              ╲                          │
│  ──────                                               │
│  Sub-text                                             │
│  [Explore Programmes]  [Get in Touch]                 │
│  Led by "Chewy" · 10+ years                          │
│                          ↓ Meet Chewy                 │
└──────────────────────────────────────────────────────┘
```

- The hero is `position: relative; height: 100svh; min-height: 600px; overflow: hidden`.
- Photo is `position: absolute; inset: 0` — full-bleed behind everything.
- Charcoal panel is `position: absolute; top: 0; left: 0; bottom: 0; width: 58%` with `clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%)` (parallelogram — right edge cuts diagonally left-to-right from top to bottom).
- Content (`hero-inner` / `hero-content`) is a **sibling** of the panel, not a child — placing it inside the panel would clip it along with the panel's `clip-path`. Content uses `position: relative; z-index: 2` (above panel at `z-index: 1`) and `max-width: 52%` to keep text clear of the diagonal edge.

### Mobile (< 768px)

```
┌────────────────────────────┐
│  PHOTO STRIP (45svh)       │
│  [amber overlay]           │
│  [bottom-fade to charcoal] │
├────────────────────────────┤
│  CHARCOAL BLOCK            │
│  [pill]                    │
│  Rhythm / for everyone     │
│  ──────                    │
│  Sub-text                  │
│  [Explore Programmes]      │
│  [Get in Touch]            │
│  Led by "Chewy"...         │
└────────────────────────────┘
```

- Hero wrapper changes to `height: auto` on mobile (not `100svh`) — content dictates height in the stacked layout.
- No diagonal clip on mobile. Panel is full-width below the photo strip.
- Photo strip: `height: 45svh; min-height: 220px`. Bottom of photo fades to charcoal via a `linear-gradient(to bottom, transparent, #2E3141)` overlay so the join is seamless.
- Charcoal block: `padding: 2.5rem 1.25rem 3rem`.

---

## Visual Treatment

### Charcoal panel

| Property | Value |
|---|---|
| Background | `#2E3141` |
| Noise texture | `feTurbulence` SVG filter, `opacity: 0.035` — barely visible, stops the panel feeling flat |
| Diagonal edge softener | Thin `linear-gradient(to right, transparent, rgba(196,168,130,0.06))` on the rightmost 20% of the panel — blurs the cut slightly |
| clip-path | `polygon(0 0, 100% 0, 85% 100%, 0 100%)` |

### Photo

| Property | Value |
|---|---|
| Source | `/images/group.jpg` |
| Amber/clay overlay | `linear-gradient(140deg, rgba(196,168,130,0.38) 0%, rgba(196,168,130,0.18) 45%, rgba(122,171,126,0.12) 100%)` — ties golden photo light to brand clay token |
| Right-edge darkening | `linear-gradient(to right, transparent 30%, rgba(46,49,65,0.3) 100%)` — adds depth, prevents photo feeling cut-off |

---

## Typography

### Heading

```
font-family: 'Fraunces', serif
font-variation-settings: 'opsz' 144, 'wght' 700
font-size: clamp(3.5rem, 5.5vw, 5.25rem)   ← up from current clamp(64px, 8.5vw, 112px)
line-height: 0.9
color: #F5F0E8
letter-spacing: -0.03em
```

"for everyone" (the `<em>`):
```
font-style: italic
font-variation-settings: 'opsz' 144, 'wght' 300, 'SOFT' 50
color: #C4A882   ← clay token
display: block
margin-top: 0.08em
```

Note: The heading is smaller in absolute px than the old `clamp(64px, 8.5vw, 112px)`, but the old value was sized for a full-viewport-width layout. The new heading fills a content column of ~52% viewport width — at 1280px that is ~665px, and a 70px heading over 665px is proportionally more dominant than 112px over the full 1280px. The visual weight is greater in context. The new values also use `rem` correctly (the old `px` clamp bypassed user font scaling).

### Green rule

A `2px` horizontal bar (`width: 2.25rem; background: #4A7C59; border-radius: 1px`) sits between the heading and the sub-text. This is the primary "handcrafted" accent — small but grounds the layout.

### Sub-text

```
font-size: 0.9375rem   (15px)
line-height: 1.65
color: rgba(245, 240, 232, 0.72)
max-width: 28rem
```

### Availability pill

Unchanged from current — the glassmorphism pill with pulsing dot reads well on charcoal.

### Attribution line

```
font-size: 0.775rem
color: rgba(245, 240, 232, 0.42)
```

Strong name: `rgba(245, 240, 232, 0.82); font-weight: 600`

---

## Interactive States

| Element | Hover | Focus-visible | Active |
|---|---|---|---|
| Explore Programmes (fill) | `background: #3A5E48; transform: translateY(-1px); box-shadow increase` | `outline: 2px solid #4A7C59` (global rule) | `transform: translateY(0)` |
| Get in Touch (outline) | `border-color: rgba(245,240,232,0.75); background: rgba(245,240,232,0.08)` | same global outline | — |
| Scroll cue | `color: #F5F0E8` | same global outline | — |

Arrow SVG inside fill button: `transition: transform 0.2s ease` → `translateX(3px)` on parent hover.

---

## Animations

Keep both existing animations, scoped to their elements:

- `hero-zoom`: background photo scales `1.08 → 1.0` over 18s (keep — applies to photo layer now)
- `hero-fade-in`: content fades up (`opacity 0 → 1, translateY 16px → 0`) over 1s with 0.3s delay
- `hero-pulse`: pill dot pulsing glow
- `hero-bob`: scroll cue chevron bob
- `@media (prefers-reduced-motion: reduce)`: all animations suppressed

---

## Scroll-transparency behaviour

The homepage `<script>` block overrides the header threshold to 80px so the nav stays transparent over the hero. This logic is unchanged — the hero is still full-viewport-height so the override still makes sense.

The header nav text logic (`cream` when transparent, `charcoal` when scrolled) in `Header.astro` is unchanged.

---

## What Is Not Changing

- All content (copy, CTAs, attribution) — identical
- All sections below the hero — untouched
- `Header.astro` — untouched
- `global.css` — untouched
- All other pages — untouched

---

## Files Touched

| File | Change |
|---|---|
| `src/pages/index.astro` | Replace `.hero` CSS block and hero HTML structure |

No new components, no new files, no new routes.

---

## Screenshot Workflow

After every visual change: `node screenshot.mjs`. Do not mark complete without reviewing output PNG.
