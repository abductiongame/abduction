# Getting Started

## Clone the repository

```bash
git clone https://github.com/abductiongame/abduction.git
cd abduction
```

## Install dependencies

This project has no npm dependencies — only Node.js built-ins and optional CLI tools invoked via `npx`.

Make sure you have **Node.js 18+** installed:

```bash
node --version
```

## Build the site

The deployable game lives in `site/`. Rebuild it from the GAMETA harvest in `_source/`:

```bash
npm run build
```

This script:

1. Copies assets from `_source/harvest/` into `site/`
2. Fetches Lottie onboarding animations
3. Patches `index.html` with Abduction branding, metadata, and UI overlays
4. Ensures the social cover image is present

## Run locally

```bash
npm start
```

Opens a static server on **http://localhost:3789**.

For a full rebuild + serve in one step:

```bash
npm run dev
```

## Project layout

```
abduction/
├── site/                  # Deployable static game (Vercel output)
│   ├── index.html         # Main entry point
│   ├── assets/            # JS, CSS, images, audio, shaders
│   ├── lottie/            # Onboarding animations
│   ├── abduction-ui.js    # Overlay UI (social + docs links)
│   └── abduction-ui.css   # Overlay styles
├── scripts/
│   └── build-site.mjs     # Build pipeline
├── _source/               # Original crawl / harvest output (GAMETA)
│   ├── harvest/           # Clean extracted assets
│   └── raw/               # Raw downloaded files
├── docs/                  # This documentation
├── vercel.json            # Vercel deployment config
└── package.json           # npm scripts
```

## Troubleshooting

### Black screen or WebGL error

- Update your browser and enable hardware acceleration
- Try Chrome or Firefox on desktop
- On mobile, use a recent Safari (iOS) or Chrome (Android)

### Build fails on Lottie fetch

Lottie files are downloaded from lottiefiles.com during build. If the network is blocked, the build continues with a warning — onboarding animations may be missing but the game still runs.

### Port already in use

Change the port in `package.json`:

```json
"start": "npx --yes serve site -l 3790"
```
