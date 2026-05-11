# Rhythm for the Soul — Website

Production website for Julian "Chewy" and his drumming workshop, music therapy, and events business on Auckland's North Shore, New Zealand.

**Stack:** Astro 6 · Tailwind CSS v4 · Formspree · Netlify

---

## Local development

**Requirements:** Node.js 22+

```bash
npm install
npm run dev
```

Opens at `http://localhost:4321`.

Other commands:

```bash
npm run build    # Production build → dist/
npm run preview  # Preview the dist/ build locally
```

---

## Deployment (Netlify)

The site deploys automatically via Netlify's Git integration.

### First-time setup

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project → GitHub**.
3. Select the repo. Netlify auto-detects `netlify.toml` — build settings are pre-configured:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**.

Subsequent pushes to `main` trigger automatic deploys.

### Custom domain

Once the domain is live, verify the `site` field in `astro.config.mjs` matches:

```js
site: 'https://www.rhythmforthesoul.co.nz',
```

This enables canonical URLs, the sitemap, and correct Open Graph `og:url` tags.

---

## Formspree setup

The contact form on every page submits to [Formspree](https://formspree.io). The placeholder form ID needs to be replaced before going live.

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form — name it "Rhythm for the Soul enquiries".
3. Copy the form ID (the part after `formspree.io/f/`).
4. Open `src/components/ContactForm.astro` and replace the placeholder:

```js
const FORM_ID = 'xyzplaceholder';  // ← replace this
```

With your real ID:

```js
const FORM_ID = 'abcde123';
```

That's the only change needed — the form is used across all pages via this single component.

---

## Updating content

### Text content

All page text lives in the `.astro` files under `src/pages/`. Each page is self-contained. Key pages:

| Page | File |
|------|------|
| Homepage | `src/pages/index.astro` |
| DRUMBEAT | `src/pages/drumbeat.astro` |
| Schools | `src/pages/schools.astro` |
| Early Childhood | `src/pages/early-childhood.astro` |
| Rest Homes | `src/pages/rest-homes.astro` |
| Disability | `src/pages/disability.astro` |
| Corporate | `src/pages/corporate.astro` |
| Events | `src/pages/events.astro` |
| About | `src/pages/about.astro` |
| Testimonials | `src/pages/testimonials.astro` |
| Contact | `src/pages/contact.astro` |

### Swapping in real photos

Image placeholders are marked with "Photo coming soon" text inside `<div>` containers. To replace:

1. Add your image to `public/images/`.
2. In the relevant page, replace the placeholder `<div>` block with:

```html
<img
  src="/images/your-photo.jpg"
  alt="Descriptive alt text here"
  class="rounded-3xl w-full h-full object-cover aspect-[4/3]"
/>
```

### Contact details

Contact details appear in three places — update all three when they change:

| Location | File |
|----------|------|
| Contact page left column | `src/pages/contact.astro` |
| ContactForm detail strip | `src/components/ContactForm.astro` |
| Footer | `src/components/Footer.astro` |

Current details:
- **Email:** `chewydrummer@hotmail.com`
- **Phone:** `+64 27 433 4627`
- **Facebook:** `facebook.com/rhythmforthesoul`

### Testimonials

Testimonials are defined as arrays in each page's frontmatter. Copy the object shape from any existing entry:

```js
{
  quote: "Your quote here.",
  author: "First Last",
  role: "Job Title",
  organization: "Organisation name",
  featured: true,  // optional — uses dark card variant
}
```

The full collection lives in `src/pages/testimonials.astro`.

### FAQs

The contact page FAQ accordion items are in the `faqs` array at the top of `src/pages/contact.astro`.

---

## Design tokens

Colours and fonts are defined in `src/styles/global.css` inside the `@theme {}` block. All Tailwind classes (`text-forest`, `bg-gold`, `font-heading`, etc.) map to these tokens.

| Token | Value | Use |
|-------|-------|-----|
| `cream` | `#FAF7F0` | Page background |
| `linen` | `#F5EFE6` | Section backgrounds, cards |
| `charcoal` | `#1a2419` | Primary text, dark sections |
| `gold` | `#C4933F` | CTAs, accents |
| `forest` | `#3D5A45` | Links, programme accents |
| `sage` | `#7B9E87` | Supporting elements |

---

## Environment variables

No environment variables are required. The Formspree form ID is hardcoded in `ContactForm.astro` (see setup above).

If you add server-side functionality later (e.g. a CMS), store secrets in Netlify's **Site configuration → Environment variables** and access them via `import.meta.env.VAR_NAME` in Astro.
