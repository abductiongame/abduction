# Architecture

## Overview

Abduction is a **static WebGL application** — no backend, no API, no database. Everything runs in the browser.

```
Browser
  └── index.html
        ├── WebGL canvas (#app)     → Three.js scene + GPGPU crowd sim
        ├── Preloader               → Asset loading progress
        ├── Onboarding              → Lottie control tutorials
        ├── About panel             → Game info + community links
        └── abduction-ui overlay    → Fixed bottom bar (docs + X)
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Rendering | **WebGL** via Three.js (bundled in `site/assets/js/index.js`) |
| Crowd simulation | **GPGPU** compute shaders (GPU particle/agent system) |
| Camera | OrbitControls (custom build in assets) |
| Debug UI | dat.gui (minified, optional) |
| Animations | Lottie (onboarding only) |
| Hosting | **Vercel** static deployment |
| Build | Node.js ESM script (`scripts/build-site.mjs`) |

## Source extraction

The game was originally published as [exp-abduction.lusion.co](https://exp-abduction.lusion.co/) — a Lusion Monthly Experiment. This repo contains:

- `_source/harvest/` — cleaned asset tree extracted via GAMETA crawl tooling
- `_source/raw/` — raw downloaded binaries, shaders, and scripts
- `_source/beautified/` — deobfuscated reference copies of key JS/CSS

The build script copies from `harvest/`, applies Abduction-specific HTML patches, and writes to `site/`.

## Build pipeline

`scripts/build-site.mjs` performs these steps:

1. **copyTree** — recursive copy from `_source/harvest/` → `site/` (skips `index.html`, preserves custom UI files)
2. **ensureCover** — copies or fetches the OG cover image
3. **fetchLottie** — downloads onboarding JSON from lottiefiles.com
4. **patchHtml** — transforms the original Lusion HTML:
   - Replaces branding (logo, about text, meta tags)
   - Removes Google Analytics
   - Localizes Lottie paths
   - Injects `abduction-ui.css` and `abduction-ui.js`
   - Sets canonical URL to `https://abduction.buzz`

## Custom UI overlay

Files `site/abduction-ui.js` and `site/abduction-ui.css` are **not overwritten** by the build. They inject a fixed bottom bar with:

- Link to this documentation on GitHub
- Link to [@abductiongame](https://x.com/abductiongame) on X

## Caching

`vercel.json` sets long-lived cache headers for static assets (`/assets/*`, binary/media files) to optimize repeat visits.

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `SITE_URL` | `https://abduction.buzz` | Used in build for meta tags and canonical URL |

Example:

```bash
SITE_URL=https://staging.example.com npm run build
```
