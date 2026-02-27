# Motion Labs

Animation, transition, and motion lab for desktop web components, built with:

- Vanilla HTML/CSS/JS
- GSAP (CDN, free/core)
- GitHub Pages-friendly static files

## Purpose

This repo is a shareable lab for exploring component motion with strong visual parity to Figma.  
Each specimen should be reviewable as:

- a live interactive example
- URL-addressable settings
- JSON/CSS export for handoff

## Current Specimen

- `.stack/testing`
  - Figma node: `1063:7598`
  - Page: `stack-testing.html`
- `.tabs/tests`
  - Figma node: `1145:18545`
  - Page: `tabs-tests.html`

## Project Structure

```text
motion-labs/
  index.html                 # specimen index/gallery
  stack-testing.html         # specimen page
  tabs-tests.html            # specimen page
  styles.css                 # shared styles
  app.js                     # page bootstrap
  components/
    stack-testing.js         # specimen implementation + state/motion logic
    tabs-tests.js            # specimen implementation + state/motion logic
  scripts/
    lab-core.js              # shared helpers (url/copy/format/clamp)
    specimens.js             # specimen registry
    index.js                 # index renderer (cards from registry)
```

## Run Locally

From repo root:

```bash
python3 -m http.server 8000
```

Open:

- `http://localhost:8000/index.html`

## Workflow (Figma to Specimen)

1. Select exact Figma node/variant(s).
2. Pull design context + screenshot + variables via Figma MCP.
3. Implement parity-first structure and tokens.
4. Add GSAP transition controls for the specimen.
5. Keep controls minimal until multiple specimens confirm shared needs.

## Motion Notes

- Use masked viewport behavior for motion transitions by default (`overflow` clipping).
- Keep content movement and fade behavior configurable so direction can change during art-direction review.
- Start with free GSAP features only.
