# CLAUDE.md — Frontend Website Rules

## Scope
- Only modify files explicitly mentioned in the prompt
- If a fix requires touching an unmentioned file, ask first before proceeding
- Never create new pages or routes unless explicitly asked

## When Something Isn't Working
- Read the actual file before assuming what's in it
- If a visual change isn't showing, check for local style blocks overriding global tokens
- Report what you found before applying a fix

## Dev Server
- Astro runs on http://localhost:4321
- Do not start a second dev server instance if one is already running
- Screenshot tool is at ./screenshot.mjs — run it after every visual change

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and colour exactly
- If no reference image: design from scratch with high craft (see guardrails below)

## Output Defaults
- Astro + Tailwind CSS unless instructed otherwise
- Mobile-first responsive
- Always check `/public` for existing assets before using placeholders

## Brand Assets
- Always check the `public/` folder before designing
- If a logo is present, use it — do not use placeholders where real assets exist
- Colour palette is defined in `src/styles/global.css` — use those exact values

## Anti-Generic Guardrails
- **Colours:** Never use default Tailwind palette (indigo-500, blue-600 etc) — use the project tokens from global.css
- **Shadows:** Never use flat `shadow-md` — use layered, colour-tinted shadows with low opacity
- **Typography:** Never use the same font for headings and body — Fraunces for display, DM Sans for body
- **Animations:** Only animate `transform` and `opacity` — never `transition-all`
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states
- **Images:** Add a gradient overlay and a colour tint where appropriate
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps
- **Depth:** Surfaces should have a layering system (base → elevated → floating)

## Hard Rules
- Do not add sections, features, or content not in the reference or brief
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as a primary colour
- Do not start a dev server if one is already running
- Scope changes to the files specified in the prompt — do not touch other pages or routes


## Screenshot Workflow
- A screenshot tool is available at `./screenshot.mjs`
- After making any visual change, run `node screenshot.mjs` and read the
  output PNG before considering the task done
- Compare the screenshot against the brief or reference image
- If something looks wrong, fix it and screenshot again
- Do not report a task as complete without having reviewed a screenshot
- accurately name the screenshots