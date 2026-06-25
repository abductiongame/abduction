#!/usr/bin/env node
/**
 * Builds site/ from GAMETA harvest with Abduction rebrand.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, '_source/harvest');
const OUT = path.join(ROOT, 'site');
const SITE_URL = (process.env.SITE_URL || 'https://abduction.buzz').replace(/\/$/, '');
const COVER_SRC = path.join(ROOT, '_source/raw/assets/images/cover.jpg');

const LOTTIE = [
  { url: 'https://assets6.lottiefiles.com/packages/lf20_pkig7lzg.json', file: 'lottie/desktop-move.json' },
  { url: 'https://assets6.lottiefiles.com/packages/lf20_mnas6uzf.json', file: 'lottie/desktop-rotate.json' },
  { url: 'https://assets1.lottiefiles.com/packages/lf20_ojnk6hzm.json', file: 'lottie/desktop-zoom.json' },
  { url: 'https://assets10.lottiefiles.com/packages/lf20_mtckmfhx.json', file: 'lottie/mobile-move.json' },
  { url: 'https://assets5.lottiefiles.com/packages/lf20_ivy6zky2.json', file: 'lottie/mobile-rotate.json' },
];

const META = {
  title: 'Abduction',
  description:
    'Pilot a UFO over a living city. A WebGL crowd-simulation sandbox where you scoop, toss, and terrorize thousands of tiny humans in real time.',
  twitter: '@abductiongame',
  twitterUrl: 'https://x.com/abductiongame',
  githubUrl: 'https://github.com/abductiongame/abduction',
  docsUrl: 'https://github.com/abductiongame/abduction/tree/main/docs',
};

async function copyTree(srcDir, outDir, skip = new Set()) {
  await fs.mkdir(outDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const from = path.join(srcDir, entry.name);
    const to = path.join(outDir, entry.name);
    if (skip.has(entry.name)) continue;
    if (entry.name === '_external') continue;
    if (entry.isDirectory()) {
      await copyTree(from, to, skip);
    } else if (entry.name !== 'index.html') {
      await fs.mkdir(path.dirname(to), { recursive: true });
      await fs.copyFile(from, to);
    }
  }
}

async function fetchLottie() {
  const dir = path.join(OUT, 'lottie');
  await fs.mkdir(dir, { recursive: true });
  for (const item of LOTTIE) {
    const dest = path.join(OUT, item.file);
    try {
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.writeFile(dest, buf);
      console.log('  lottie', item.file);
    } catch (err) {
      console.warn('  lottie skip', item.file, err.message);
    }
  }
}

function patchHtml(html) {
  const cover = `${SITE_URL}/assets/images/cover.jpg`;

  html = html
    .replace(/<link rel="shortcut icon" href="\/assets\//, '<link rel="shortcut icon" href="./assets/')
    .replace(/content="Abduction 🛸 is a Lusion Monthly Experiment"/g, `content="${META.description}"`)
    .replace(/content="@lusionltd"/g, `content="${META.twitter}"`)
    .replace(/content="https:\/\/exp-abduction\.lusion\.co\/assets\/images\/cover\.jpg"/g, `content="${cover}"`)
    .replace(/content="https:\/\/exp-abduction\.lusion\.co"/g, `content="${SITE_URL}"`)
    .replace(
      /<meta name="twitter:site" content="@lusionltd">/,
      `<meta name="twitter:site" content="${META.twitter}">`,
    )
    .replace(/<title>Abduction<\/title>/, `<title>${META.title}</title>`)
    .replace(/content="https:\/\/abduction\.vercel\.app[^"]*"/g, (m) => {
      const key = m.split('=')[0];
      if (m.includes('cover.jpg')) return `${key}="${cover}"`;
      return `${key}="${SITE_URL}"`;
    });

  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', ` <link rel="canonical" href="${SITE_URL}/">\n</head>`);
  }

  // Remove Google Analytics
  html = html.replace(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js[^<]*><\/script>\s*/g, '');
  html = html.replace(/<script>\s*window\.dataLayer[\s\S]*?<\/script>\s*/g, '');

  // Local lottie animations
  html = html
    .replace(
      'https://assets6.lottiefiles.com/packages/lf20_pkig7lzg.json',
      './lottie/desktop-move.json',
    )
    .replace(
      'https://assets6.lottiefiles.com/packages/lf20_mnas6uzf.json',
      './lottie/desktop-rotate.json',
    )
    .replace(
      'https://assets1.lottiefiles.com/packages/lf20_ojnk6hzm.json',
      './lottie/desktop-zoom.json',
    )
    .replace(
      'https://assets10.lottiefiles.com/packages/lf20_mtckmfhx.json',
      './lottie/mobile-move.json',
    )
    .replace(
      'https://assets5.lottiefiles.com/packages/lf20_ivy6zky2.json',
      './lottie/mobile-rotate.json',
    );

  // Replace Lusion Labs header logo with Abduction title
  html = html.replace(
    /<div id="logo">\s*<a href="https:\/\/labs\.lusion\.co\/"[^>]*>[\s\S]*?<\/a>\s*<\/div>/,
    `<div id="logo"><div class="abduction-brand" aria-hidden="true"><span>Abduction</span></div></div>`,
  );

  // About panel — full Abduction content
  html = html.replace(
    /<div id="about">[\s\S]*?(?=<footer>)/,
    `<div id="about"> <div id="about-exit"> <div id="about-exit--close-btn" class="has-rollover-audio"> <div class="bar"></div> <div class="bar"></div> <svg class="polygon" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.8" d="M21.9068 1H13.0932L5.40683 5.40683L1 13.0932V21.9068L5.40683 29.5932L13.0932 34H21.9068L29.5932 29.5932L34 21.9068V13.0932L29.5932 5.40683L21.9068 1Z" stroke="#959292" stroke-miterlimit="10"/> </svg> </div> </div> <div id="about-content-title">
 <h1 split-by="word" letter-animation="fadeIn" class="about-title">Abduction — UFO chaos in the browser.</h1>
 <p split-by="word" letter-animation="fadeIn">Fly a saucer over a packed city, grab panicking crowds with your tractor beam, and fling them across the skyline. No levels, no score — just physics-driven mayhem powered by a massive GPGPU crowd system.</p>
 </div>
 <div id="about-content-description">
 <div id="about-left-column">
 <div class="about-column--group">
 <h3 split-by="word" letter-animation="fadeIn">Controls</h3>
 <div class="detail-description">
 <p split-by="word" letter-animation="fadeIn">Desktop: left-click drag to move the UFO, right-click drag to orbit the camera, scroll to zoom.</p>
 <p split-by="word" letter-animation="fadeIn">Mobile: one finger to fly, two fingers to rotate and zoom.</p>
 </div>
 </div>
 <div class="about-column--group">
 <h3 split-by="word" letter-animation="fadeIn">Community</h3>
 <div class="detail-description">
 <p split-by="word" letter-animation="fadeIn">
 <a href="${META.twitterUrl}" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none"><path stroke="#fff" stroke-linecap="round" stroke-width="1.164" d="M9.969.656v7.76M9.97.656H2.208M9.969.656.656 9.97"/></svg>@${META.twitter.replace('@', '')}</a>
 </p>
 <p split-by="word" letter-animation="fadeIn">
 <a href="${META.githubUrl}" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.164" d="M4.5 1h6a3.5 3.5 0 0 1 3.5 3.5v6A3.5 3.5 0 0 1 10.5 14h-6A3.5 3.5 0 0 1 1 10.5v-6A3.5 3.5 0 0 1 4.5 1Z"/><path stroke="#fff" stroke-linecap="round" stroke-width="1.164" d="M4 7.5h7M7.5 4v7"/></svg>abductiongame/abduction</a>
 </p>
 </div>
 </div>
 <div class="about-actions">
 <a class="btn explore-btn has-rollover-audio" href="${META.githubUrl}" target="_blank" rel="noopener">
 <svg class="explore-btn--arrow" width="32" height="6" viewBox="0 0 32 6" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M0 3H30.5M30.5 3C29.537 2.75 27.6111 1.8 27.6111 0M30.5 3C29.537 3.25 27.6111 4.2 27.6111 6" stroke="white" stroke-width="0.5"/>
 </svg>
 <span class="explore-btn--text" split-by="letter" letter-animation="fadeIn">GitHub</span>
 </a>
 <a class="btn explore-btn has-rollover-audio" href="${META.docsUrl}" target="_blank" rel="noopener">
 <svg class="explore-btn--arrow" width="32" height="6" viewBox="0 0 32 6" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M0 3H30.5M30.5 3C29.537 2.75 27.6111 1.8 27.6111 0M30.5 3C29.537 3.25 27.6111 4.2 27.6111 6" stroke="white" stroke-width="0.5"/>
 </svg>
 <span class="explore-btn--text" split-by="letter" letter-animation="fadeIn">Documentation</span>
 </a>
 <a class="btn explore-btn has-rollover-audio" href="${META.twitterUrl}" target="_blank" rel="noopener">
 <svg class="explore-btn--arrow" width="32" height="6" viewBox="0 0 32 6" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M0 3H30.5M30.5 3C29.537 2.75 27.6111 1.8 27.6111 0M30.5 3C29.537 3.25 27.6111 4.2 27.6111 6" stroke="white" stroke-width="0.5"/>
 </svg>
 <span class="explore-btn--text" split-by="letter" letter-animation="fadeIn">Follow on X</span>
 </a>
 </div>
 </div>
 <div id="about-right-column">
 <div class="about-column--group">
 <h3 split-by="word">About</h3>
 <section>
 <p split-by="word" letter-animation="fadeIn">Inspired by Destroy All Humans!, this experiment pushes WebGL with thousands of simulated humans reacting, running, and ragdolling in real time. There is no real abduction — only beautiful, barely playable chaos.</p>
 </section>
 </div>
 <div class="about-column--group">
 <h3 split-by="word">Original craft</h3>
 <section>
 <p split-by="word" letter-animation="fadeIn">Based on the Lusion Monthly Experiment. Rehosted for the Abduction community.</p>
 </section>
 </div>
 </div>
 </div>
 </div> `,
  );

  const injectHead = `    <link rel="stylesheet" href="./abduction-ui.css">`;
  html = html.replace('<link rel="stylesheet" href="./assets/css/index.css">', `<link rel="stylesheet" href="./assets/css/index.css">\n${injectHead}`);

  html = html.replace(
    '</body>',
    `    <script src="./abduction-ui.js" defer></script>\n</body>`,
  );

  return html;
}

async function ensureCover() {
  const dest = path.join(OUT, 'assets/images/cover.jpg');
  await fs.mkdir(path.dirname(dest), { recursive: true });
  try {
    await fs.copyFile(COVER_SRC, dest);
    console.log('  cover.jpg');
  } catch {
    try {
      const res = await fetch('https://exp-abduction.lusion.co/assets/images/cover.jpg');
      if (res.ok) {
        await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
        console.log('  cover.jpg (fetched)');
      }
    } catch (err) {
      console.warn('  cover.jpg skip', err.message);
    }
  }
}

async function main() {
  console.log('→ Copying harvest assets…');
  await copyTree(SRC, OUT, new Set(['abduction-ui.css', 'abduction-ui.js']));
  await ensureCover();

  console.log('→ Fetching lottie files…');
  await fetchLottie();

  console.log('→ Building index.html…');
  const raw = await fs.readFile(path.join(SRC, 'index.html'), 'utf8');
  const html = patchHtml(raw);
  await fs.writeFile(path.join(OUT, 'index.html'), html);

  console.log('Wrote', path.join(OUT, 'index.html'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
