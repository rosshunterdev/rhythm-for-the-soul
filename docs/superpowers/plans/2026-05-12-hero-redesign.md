# Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the full-bleed gradient-vignette hero with a diagonal split-panel layout — charcoal left panel with text, amber-tinted photo right — for stronger legibility and a more distinctive, handcrafted feel.

**Architecture:** All changes are confined to `src/pages/index.astro`. The hero HTML gains two new background layers (`hero-photo`, `hero-panel`) and a typographic accent (`hero-rule`). The entire hero CSS block is replaced. No new files, components, or routes.

**Tech Stack:** Astro, Tailwind CSS v4 (utility classes used in other sections — hero uses custom CSS only), Fraunces variable font (already loaded), DM Sans (already loaded).

**Spec:** `docs/superpowers/specs/2026-05-12-hero-redesign.md`

---

### Task 1: Replace hero HTML structure

**Files:**
- Modify: `src/pages/index.astro:69-127`

Read the current file to confirm line numbers before editing.

- [ ] **Step 1: Read the hero HTML section**

```
Read src/pages/index.astro lines 69–127
```

Confirm you can see the `<section class="hero">` opening tag and the `</section>` closing tag (just before the `<!-- ── Meet Chewy -->` comment).

- [ ] **Step 2: Replace the hero section HTML**

Find this exact block (the full hero section):

```astro
  <!-- ── Hero ───────────────────────────────────────────── -->
  <section class="hero" aria-label="Introduction">

    <!-- Background image — separate layer for the zoom animation -->
    <div class="hero-bg" aria-hidden="true"></div>

    <!-- Left-weighted vignette + thin bottom fade -->
    <div class="hero-vignette" aria-hidden="true"></div>
    <div class="hero-bottom-fade" aria-hidden="true"></div>

    <div class="hero-inner">
      <div class="hero-content">

        <!-- Availability pill -->
        <p class="hero-pill">
          <span class="hero-pill-dot" aria-hidden="true"></span>
          Booking now — Auckland &amp; North Shore
        </p>

        <h1 class="display-heading">
          Rhythm
          <em class="display-accent">for everyone</em>
        </h1>

        <p class="sub-head">
          Drumming workshops, music therapy, laughter yoga and fire shows — for
          schools, rest homes, disability services and corporate events.
        </p>

        <div class="ctas">
          <a href="/drumbeat" class="cta-fill">
            Explore Programmes
            <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="/contact" class="cta-outline">Get in Touch</a>
        </div>

        <p class="hero-attribution">
          Led by <span class="hero-attribution-name">Julian &ldquo;Chewy&rdquo;</span>
          <span class="hero-attribution-sep" aria-hidden="true">·</span>
          <span class="hero-attribution-loc">10+ years on the North Shore</span>
        </p>

      </div>
    </div>

    <!-- Scroll cue -->
    <a href="#meet-chewy" class="hero-scroll" aria-label="Scroll to meet Chewy">
      <span class="hero-scroll-label">Meet Chewy</span>
      <span class="hero-scroll-chevron" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </a>

  </section>
```

Replace it with:

```astro
  <!-- ── Hero ───────────────────────────────────────────── -->
  <section class="hero" aria-label="Introduction">

    <!-- Photo layer: full-bleed, amber overlay via ::before/::after -->
    <div class="hero-photo" aria-hidden="true"></div>

    <!-- Charcoal panel: diagonal clip-path, sibling of content -->
    <div class="hero-panel" aria-hidden="true"></div>

    <!-- Content: z-index above panel, max-width keeps text clear of diagonal -->
    <div class="hero-inner">
      <div class="hero-content">

        <p class="hero-pill">
          <span class="hero-pill-dot" aria-hidden="true"></span>
          Booking now — Auckland &amp; North Shore
        </p>

        <h1 class="display-heading">
          Rhythm
          <em class="display-accent">for everyone</em>
        </h1>

        <div class="hero-rule" aria-hidden="true"></div>

        <p class="sub-head">
          Drumming workshops, music therapy, laughter yoga and fire shows — for
          schools, rest homes, disability services and corporate events.
        </p>

        <div class="ctas">
          <a href="/drumbeat" class="cta-fill">
            Explore Programmes
            <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="/contact" class="cta-outline">Get in Touch</a>
        </div>

        <p class="hero-attribution">
          Led by <span class="hero-attribution-name">Julian &ldquo;Chewy&rdquo;</span>
          <span class="hero-attribution-sep" aria-hidden="true">·</span>
          <span class="hero-attribution-loc">10+ years on the North Shore</span>
        </p>

      </div>
    </div>

    <a href="#meet-chewy" class="hero-scroll" aria-label="Scroll to meet Chewy">
      <span class="hero-scroll-label">Meet Chewy</span>
      <span class="hero-scroll-chevron" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </a>

  </section>
```

**What changed:** `hero-bg` → `hero-photo`; removed `hero-vignette` and `hero-bottom-fade`; added `hero-panel` div; inserted `<div class="hero-rule">` between `h1` and `.sub-head`.

Do **not** run the screenshot yet — CSS hasn't been updated and the page will look broken.

---

### Task 2: Replace hero CSS

**Files:**
- Modify: `src/pages/index.astro` — the `<style>` block's hero section

- [ ] **Step 1: Read the style block to confirm bounds**

```
Read src/pages/index.astro lines 372–680
```

Confirm:
- `<style>` opens around line 372
- `/* ── Hero ────` comment is the first thing in the style block
- `/* ── Meet Chewy ────` comment marks where hero CSS ends

- [ ] **Step 2: Replace the hero CSS block**

Find this exact text (the opening comment through the end of the mobile media query, which ends just before the Meet Chewy comment):

```css
  /* ── Hero ────────────────────────────────────────────────── */
  .hero {
    position: relative;
    height: 100vh;
    height: 100svh;
    min-height: 600px;
    overflow: hidden;
    isolation: isolate;
  }

  .hero-bg {
    position: absolute;
    inset: -2% -2% -2% -2%;
    background-image: url('/images/group.jpg');
    background-size: cover;
    background-position: center 35%;
    z-index: -2;
    animation: hero-zoom 18s ease-out 0.2s both;
    will-change: transform;
  }

  @keyframes hero-zoom {
    from { transform: scale(1.08); }
    to   { transform: scale(1.0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-bg { animation: none; transform: scale(1.0); }
  }

  .hero-vignette {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(
        100deg,
        rgba(46, 49, 65, 0.78) 0%,
        rgba(46, 49, 65, 0.55) 28%,
        rgba(46, 49, 65, 0.18) 55%,
        rgba(46, 49, 65, 0.05) 75%,
        rgba(46, 49, 65, 0.0) 100%
      );
  }

  .hero-bottom-fade {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 30%;
    z-index: -1;
    background: linear-gradient(
      to bottom,
      rgba(46, 49, 65, 0) 0%,
      rgba(46, 49, 65, 0.35) 100%
    );
  }

  .hero-inner {
    position: relative;
    height: 100%;
    max-width: 80rem;
    margin: 0 auto;
    padding: 6.5rem 1.5rem 7rem;
    display: flex;
    align-items: center;
  }

  @media (min-width: 768px) {
    .hero-inner { padding: 6rem 2.5rem 8rem; }
  }

  .hero-content {
    max-width: 36rem;
    width: 100%;
    animation: hero-fade-in 1s ease-out 0.3s both;
  }

  @keyframes hero-fade-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-content { animation: none; }
  }

  .hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.45rem 0.95rem 0.45rem 0.85rem;
    background-color: rgba(245, 240, 232, 0.12);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(245, 240, 232, 0.18);
    border-radius: 9999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.015em;
    color: rgba(245, 240, 232, 0.92);
    margin: 0 0 1.75rem;
  }

  .hero-pill-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: #7AAB7E;
    box-shadow: 0 0 0 0 rgba(122, 171, 126, 0.7);
    animation: hero-pulse 2.4s ease-in-out infinite;
  }

  @keyframes hero-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(122, 171, 126, 0.55); }
    50%      { box-shadow: 0 0 0 6px rgba(122, 171, 126, 0.0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-pill-dot { animation: none; }
  }

  .display-heading {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(64px, 8.5vw, 112px);
    font-variation-settings: 'opsz' 144, 'wght' 600;
    line-height: 0.95;
    color: #F5F0E8;
    letter-spacing: -0.025em;
    margin: 0 0 1.5rem;
    text-wrap: balance;
  }

  .display-accent {
    display: block;
    font-style: italic;
    font-variation-settings: 'opsz' 144, 'wght' 350, 'SOFT' 50;
    color: #F5F0E8;
    margin-top: 0.1em;
  }

  .sub-head {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.0625rem;
    line-height: 1.65;
    color: rgba(245, 240, 232, 0.82);
    max-width: 32rem;
    margin: 0 0 2.25rem;
    text-wrap: pretty;
  }

  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
  }

  .cta-fill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.95rem 1.75rem;
    background-color: #4A7C59;
    color: #F5F0E8;
    border-radius: 9999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    text-decoration: none;
    box-shadow: 0 4px 18px rgba(74, 124, 89, 0.35);
    transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cta-fill:hover {
    background-color: #3A5E48;
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(74, 124, 89, 0.45);
  }
  .cta-fill:hover .cta-arrow { transform: translateX(3px); }

  .cta-arrow {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;
  }

  .cta-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.95rem 1.75rem;
    border: 1.5px solid rgba(245, 240, 232, 0.4);
    color: #F5F0E8;
    border-radius: 9999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }
  .cta-outline:hover {
    border-color: rgba(245, 240, 232, 0.75);
    background-color: rgba(245, 240, 232, 0.08);
  }

  .hero-attribution {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8125rem;
    color: rgba(245, 240, 232, 0.65);
    margin: 0;
    letter-spacing: 0.01em;
  }

  .hero-attribution-name {
    color: rgba(245, 240, 232, 0.92);
    font-weight: 600;
  }

  .hero-attribution-sep {
    margin: 0 0.5rem;
    color: rgba(245, 240, 232, 0.4);
  }

  .hero-attribution-loc {
    white-space: nowrap;
  }

  .hero-scroll {
    position: absolute;
    left: 50%;
    bottom: 1.75rem;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: rgba(245, 240, 232, 0.7);
    text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: color 0.2s ease;
    z-index: 1;
    animation: hero-fade-in 1s ease-out 1.2s both;
  }

  .hero-scroll:hover { color: #F5F0E8; }

  .hero-scroll-chevron {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    animation: hero-bob 2.2s ease-in-out infinite;
  }
  .hero-scroll-chevron svg { width: 100%; height: 100%; }

  @keyframes hero-bob {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(4px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-scroll-chevron { animation: none; }
  }

  @media (max-width: 480px) {
    .hero-scroll-label { display: none; }
    .hero-scroll { bottom: 1.25rem; }
  }

  @media (max-width: 767px) {
    .hero-inner {
      padding: 6rem 1.25rem 6rem;
      align-items: flex-end;
    }

    .hero-content { max-width: 100%; }

    .hero-vignette {
      background: linear-gradient(
        180deg,
        rgba(46, 49, 65, 0.25) 0%,
        rgba(46, 49, 65, 0.40) 45%,
        rgba(46, 49, 65, 0.72) 100%
      );
    }

    .hero-bottom-fade { display: none; }

    .sub-head { font-size: 1rem; }

    .ctas { gap: 0.625rem; }
    .cta-fill, .cta-outline {
      padding: 0.85rem 1.5rem;
      font-size: 0.875rem;
    }
  }
```

Replace it with:

```css
  /* ── Hero ────────────────────────────────────────────────── */
  .hero {
    position: relative;
    height: 100svh;
    min-height: 600px;
    overflow: hidden;
    isolation: isolate;
  }

  /* ── Photo layer ─────────────────────────────────────────── */
  .hero-photo {
    position: absolute;
    inset: -2% -2% -2% -2%;
    background-image: url('/images/group.jpg');
    background-size: cover;
    background-position: center 35%;
    z-index: 0;
    animation: hero-zoom 18s ease-out 0.2s both;
    will-change: transform;
  }

  @keyframes hero-zoom {
    from { transform: scale(1.08); }
    to   { transform: scale(1.0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-photo { animation: none; transform: scale(1.0); }
  }

  /* Amber/clay overlay — ties photo's golden light to brand palette */
  .hero-photo::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      140deg,
      rgba(196, 168, 130, 0.38) 0%,
      rgba(196, 168, 130, 0.18) 45%,
      rgba(122, 171, 126, 0.12) 100%
    );
  }

  /* Right-edge darkening for depth */
  .hero-photo::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      to right,
      transparent 30%,
      rgba(46, 49, 65, 0.3) 100%
    );
  }

  /* ── Charcoal panel ──────────────────────────────────────── */
  .hero-panel {
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 58%;
    background: #2E3141;
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
    z-index: 1;
  }

  /* Noise texture — stops panel feeling flat */
  .hero-panel::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* Diagonal edge softener — amber glow blurs the parallelogram cut */
  .hero-panel::after {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0;
    width: 20%;
    background: linear-gradient(to right, transparent, rgba(196, 168, 130, 0.06));
    pointer-events: none;
  }

  /* ── Content (sibling of panel, floats above it) ─────────── */
  .hero-inner {
    position: relative;
    height: 100%;
    z-index: 2;
    max-width: 80rem;
    margin: 0 auto;
    padding: 6.5rem 3.5rem 7rem;
    display: flex;
    align-items: center;
  }

  @media (min-width: 768px) {
    .hero-inner { padding: 6rem 3.5rem 8rem; }
  }

  .hero-content {
    max-width: 52%;
    width: 100%;
    animation: hero-fade-in 1s ease-out 0.3s both;
  }

  @keyframes hero-fade-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-content { animation: none; }
  }

  /* ── Pill ────────────────────────────────────────────────── */
  .hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.45rem 0.95rem 0.45rem 0.85rem;
    background-color: rgba(122, 171, 126, 0.14);
    border: 1px solid rgba(122, 171, 126, 0.28);
    border-radius: 9999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.015em;
    color: rgba(122, 171, 126, 0.95);
    margin: 0 0 1.75rem;
  }

  .hero-pill-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: #7AAB7E;
    box-shadow: 0 0 0 0 rgba(122, 171, 126, 0.7);
    animation: hero-pulse 2.4s ease-in-out infinite;
  }

  @keyframes hero-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(122, 171, 126, 0.55); }
    50%      { box-shadow: 0 0 0 6px rgba(122, 171, 126, 0.0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-pill-dot { animation: none; }
  }

  /* ── Heading ─────────────────────────────────────────────── */
  .display-heading {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(3.5rem, 5.5vw, 5.25rem);
    font-variation-settings: 'opsz' 144, 'wght' 700;
    line-height: 0.9;
    color: #F5F0E8;
    letter-spacing: -0.03em;
    margin: 0 0 1.5rem;
    text-wrap: balance;
  }

  .display-accent {
    display: block;
    font-style: italic;
    font-variation-settings: 'opsz' 144, 'wght' 300, 'SOFT' 50;
    color: #C4A882;
    margin-top: 0.08em;
  }

  /* ── Green rule (handcrafted accent) ─────────────────────── */
  .hero-rule {
    width: 2.25rem;
    height: 2px;
    background: #4A7C59;
    border-radius: 1px;
    margin: 0 0 1.25rem;
  }

  /* ── Sub-text ────────────────────────────────────────────── */
  .sub-head {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9375rem;
    line-height: 1.65;
    color: rgba(245, 240, 232, 0.72);
    max-width: 28rem;
    margin: 0 0 2.25rem;
    text-wrap: pretty;
  }

  /* ── CTAs ────────────────────────────────────────────────── */
  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
  }

  .cta-fill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.95rem 1.75rem;
    background-color: #4A7C59;
    color: #F5F0E8;
    border-radius: 9999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    text-decoration: none;
    box-shadow: 0 4px 18px rgba(74, 124, 89, 0.38);
    transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .cta-fill:hover {
    background-color: #3A5E48;
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(74, 124, 89, 0.45);
  }

  .cta-fill:hover .cta-arrow { transform: translateX(3px); }
  .cta-fill:active { transform: translateY(0); }

  .cta-arrow {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;
  }

  .cta-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.95rem 1.75rem;
    border: 1.5px solid rgba(245, 240, 232, 0.4);
    color: #F5F0E8;
    border-radius: 9999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }

  .cta-outline:hover {
    border-color: rgba(245, 240, 232, 0.75);
    background-color: rgba(245, 240, 232, 0.08);
  }

  /* ── Attribution ─────────────────────────────────────────── */
  .hero-attribution {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.775rem;
    color: rgba(245, 240, 232, 0.42);
    margin: 0;
    letter-spacing: 0.01em;
  }

  .hero-attribution-name {
    color: rgba(245, 240, 232, 0.82);
    font-weight: 600;
  }

  .hero-attribution-sep {
    margin: 0 0.5rem;
    color: rgba(245, 240, 232, 0.25);
  }

  .hero-attribution-loc { white-space: nowrap; }

  /* ── Scroll cue ──────────────────────────────────────────── */
  .hero-scroll {
    position: absolute;
    left: 50%;
    bottom: 1.75rem;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: rgba(245, 240, 232, 0.6);
    text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: color 0.2s ease;
    z-index: 3;
    animation: hero-fade-in 1s ease-out 1.2s both;
  }

  .hero-scroll:hover { color: #F5F0E8; }

  .hero-scroll-chevron {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    animation: hero-bob 2.2s ease-in-out infinite;
  }

  .hero-scroll-chevron svg { width: 100%; height: 100%; }

  @keyframes hero-bob {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(4px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-scroll-chevron { animation: none; }
  }

  /* ── Mobile (< 768px) ────────────────────────────────────── */
  @media (max-width: 767px) {
    .hero {
      height: auto;
      min-height: 0;
    }

    /* Photo becomes a fixed-height strip in document flow */
    .hero-photo {
      position: relative;
      inset: auto;
      height: 45svh;
      min-height: 220px;
      animation: none;
      transform: none;
    }

    /* Override overlays: keep amber tint, add charcoal bottom-fade to bleed into text block */
    .hero-photo::before {
      background: linear-gradient(
        140deg,
        rgba(196, 168, 130, 0.35) 0%,
        rgba(196, 168, 130, 0.1) 50%,
        transparent 100%
      );
    }

    .hero-photo::after {
      background: linear-gradient(
        to bottom,
        transparent 40%,
        #2E3141 100%
      );
    }

    /* Panel not needed — full-width charcoal comes from hero-inner */
    .hero-panel { display: none; }

    .hero-inner {
      position: relative;
      height: auto;
      background: #2E3141;
      padding: 2.5rem 1.25rem 3rem;
      align-items: flex-start;
      max-width: 100%;
    }

    .hero-content { max-width: 100%; }

    .sub-head { font-size: 1rem; }

    .ctas { gap: 0.625rem; }

    .cta-fill,
    .cta-outline {
      padding: 0.85rem 1.5rem;
      font-size: 0.875rem;
    }

    /* Not meaningful in stacked layout */
    .hero-scroll { display: none; }
  }
```

- [ ] **Step 3: Take screenshot and review**

```
node screenshot.mjs
```

Open the output PNG. Check:
- Left panel is charcoal with a diagonal right edge
- Photo fills the right side with a warm amber tint
- Heading "Rhythm / for everyone" is large, cream/clay, clearly readable against charcoal
- Green rule appears between heading and sub-text
- CTAs and attribution are visible and correctly styled
- No text overlaps the photo area

If anything looks wrong, fix and re-screenshot before continuing.

- [ ] **Step 4: Commit**

```
git add src/pages/index.astro
git commit -m "feat: hero redesign — diagonal split panel with amber photo overlay"
```

---

## Self-review against spec

Spec requirement → task coverage:

| Requirement | Covered by |
|---|---|
| Split panel layout (58% charcoal, 42% photo) | Task 2 — `.hero-panel { width: 58% }` |
| Diagonal clip-path edge | Task 2 — `clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%)` |
| Amber/clay photo overlay | Task 2 — `.hero-photo::before` |
| Right-edge darkening on photo | Task 2 — `.hero-photo::after` |
| Noise texture on panel | Task 2 — `.hero-panel::before` SVG data URI |
| Diagonal edge softener | Task 2 — `.hero-panel::after` gradient |
| Content is sibling of panel (not child) | Task 1 — HTML structure; Task 2 — `z-index: 2` on `.hero-inner` |
| Heading: `clamp(3.5rem, 5.5vw, 5.25rem)`, wght 700 | Task 2 — `.display-heading` |
| Italic clay "for everyone" | Task 2 — `.display-accent { color: #C4A882 }` |
| Green rule between heading and sub-text | Task 1 — `hero-rule` div added; Task 2 — `.hero-rule` CSS |
| Sub-text opacity and size | Task 2 — `.sub-head { color: rgba(245,240,232,0.72) }` |
| Pill redesigned (sage on charcoal, not glassmorphism) | Task 2 — `.hero-pill` new colours |
| Attribution dimmed appropriately | Task 2 — `.hero-attribution { color: rgba(245,240,232,0.42) }` |
| All interactive states (hover, active, focus-visible) | Task 2 — `.cta-fill:hover`, `.cta-fill:active`, `.cta-outline:hover`; focus-visible via global rule in global.css |
| All animations kept and correctly scoped | Task 2 — hero-zoom, hero-fade-in, hero-pulse, hero-bob |
| prefers-reduced-motion respected | Task 2 — four `@media (prefers-reduced-motion)` blocks |
| Mobile: photo strip + charcoal block, height auto | Task 2 — `@media (max-width: 767px)` |
| Mobile: no diagonal clip | Task 2 — `.hero-panel { display: none }` on mobile |
| Mobile: photo bottom fades to charcoal | Task 2 — `.hero-photo::after` mobile override |
| Screenshot before marking done | Task 2 Step 3 |
| Only `src/pages/index.astro` touched | All tasks |
