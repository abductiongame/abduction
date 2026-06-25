<div align="center">

# Abduction

**WebGL UFO sandbox — scoop crowds, toss humans, cause chaos**

[![Play](https://img.shields.io/badge/Play-abduction.buzz-7c3aed?style=for-the-badge)](https://www.abduction.buzz/)
[![Docs](https://img.shields.io/badge/Docs-read%20online-2563eb?style=for-the-badge)](https://github.com/abductiongame/abduction/tree/main/docs)
[![X](https://img.shields.io/badge/@abductiongame-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/abductiongame)

[Play](https://www.abduction.buzz/) · [Documentation](./docs/README.md) · [Community on X](https://x.com/abductiongame)

</div>

---

## What is it?

**Abduction** is a browser mini-game where you pilot a UFO over a living city. The hook is a **massive GPGPU crowd simulation**: thousands of tiny humans run, panic, and ragdoll in real time while you drag them with a tractor beam and throw them around. No missions, no abduction mechanic — just physics-driven sandbox chaos inspired by *Destroy All Humans!*.

**Controls**

- **Desktop:** left-click drag = move UFO · right-click drag = rotate camera · scroll = zoom
- **Mobile:** one finger = fly · two fingers = rotate & zoom

---

## Documentation

Full docs live in [`docs/`](./docs/README.md):

| Guide | Topic |
|-------|-------|
| [Getting Started](./docs/GETTING_STARTED.md) | Clone, build, run locally |
| [Controls](./docs/CONTROLS.md) | Desktop & mobile input |
| [Architecture](./docs/ARCHITECTURE.md) | Project structure & WebGL stack |
| [Deployment](./docs/DEPLOYMENT.md) | Vercel & DNS setup |
| [Credits](./docs/CREDITS.md) | Original authors |

---

## Local dev

```bash
git clone https://github.com/abductiongame/abduction.git
cd abduction
npm run build
npm start
```

Open **http://localhost:3789**

---

## Stack

Static **WebGL** game in `site/` — extracted from [exp-abduction.lusion.co](https://exp-abduction.lusion.co/) via GAMETA.

```
site/                  → deployable game
scripts/build-site.mjs → rebuild branded index.html
docs/                  → project documentation
vercel.json            → Vercel static config
_source/               → GAMETA crawl + harvest output
```

---

## Deploy (Vercel)

```bash
npm run deploy
```

Or connect [github.com/abductiongame/abduction](https://github.com/abductiongame/abduction) in Vercel — build command: `npm run build`, output: `site`.

**Domain DNS (`abduction.buzz`)**

- `A` `@` → `76.76.21.21`
- `CNAME` `www` → `cname.vercel-dns.com`

---

## Credits

Original experiment by [Lusion](https://lusion.co) (Edan Kwan, Brandon Leigh-Bennett, Pauline Stichelbaut).  
Rehosted and rebranded for the **Abduction** community — not affiliated with Lusion.
