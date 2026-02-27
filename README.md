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
- capture card export (component + node + share URL + JSON snapshot)

## Current Specimen

- `.stack/testing`
  - Figma node: `1063:7598`
  - Page: `stack-testing.html`
- `.tabs/tests`
  - Figma node: `1145:18545`
  - Page: `tabs-tests.html`
- `.gallery/product`
  - Figma node: `1055:18883`
  - Page: `gallery-product.html`
- `.banner/prescription-plan`
  - Figma node: `2224:38341`
  - Page: `banner-prescription-plan.html`

## Project Structure

```text
motion-labs/
  index.html                 # specimen index/gallery
  stack-testing.html         # specimen page
  tabs-tests.html            # specimen page
  gallery-product.html       # specimen page
  banner-prescription-plan.html # specimen page
  MOTION_PRESETS.md          # controls, URL params, and preset behavior reference
  styles.css                 # shared styles
  app.js                     # page bootstrap
  components/
    stack-testing.js         # specimen implementation + state/motion logic
    tabs-tests.js            # specimen implementation + state/motion logic
    gallery-product.js       # specimen implementation + state/motion logic
    banner-prescription-plan.js # specimen implementation + state/motion logic
  assets/
    banner-prescription-plan/ # frozen image assets for banner specimen
    gallery-product/         # frozen image assets for gallery specimen
  scripts/
    lab-core.js              # shared helpers (url/copy/format/clamp)
    specimens.js             # specimen registry
    index.js                 # index renderer (cards from registry)
    freeze-gallery-product-assets.sh  # pulls MCP asset URLs into local assets
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

## Handoff Docs

- `MOTION_PRESETS.md` documents:
  - control definitions
  - URL parameter map
  - preset intent/behavior by specimen

## Component Fidelity Checklist

Use this before sharing a specimen with art direction or engineering:

1. Layout parity
   Verify dimensions, spacing, alignment, and stacking behavior against the exact Figma node.
2. Token parity
   Verify typography, colors, radii, and spacing use the expected design tokens/values.
3. Masking parity
   Confirm clipped-track and free-fade modes both behave as intended for the specimen.
4. Motion parity
   Validate transition type, easing, overlap, direction, and stagger against the selected preset/settings.
5. Export parity
   Confirm JSON/CSS export and share URL reproduce the current state exactly when reopened.

## Motion Notes

- Use masked viewport behavior for motion transitions by default (`overflow` clipping).
- Keep content movement and fade behavior configurable so direction can change during art-direction review.
- Start with free GSAP features only.

## Freeze Figma MCP Images Locally

MCP image URLs expire. Freeze the current gallery-product state images to local files:

```bash
./scripts/freeze-gallery-product-assets.sh
```
