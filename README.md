<div align="center">

# Abduction

**WebGL UFO sandbox — scoop crowds, toss humans, cause chaos**

[![X](https://img.shields.io/badge/@abductiongame-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/abductiongame)

[Play](https://abduction.buzz) · [Community on X](https://x.com/abductiongame)

</div>

---

## What is it?

**Abduction** is a browser mini-game where you pilot a UFO over a living city. The hook is a **massive GPGPU crowd simulation**: thousands of tiny humans run, panic, and ragdoll in real time while you drag them with a tractor beam and throw them around. No missions, no abduction mechanic — just physics-driven sandbox chaos inspired by *Destroy All Humans!*.

**Controls**

- **Desktop:** left-click drag = move UFO · right-click drag = rotate camera · scroll = zoom
- **Mobile:** one finger = fly · two fingers = rotate & zoom

---

## Local dev

```bash
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
vercel.json            → Vercel static config
_source/               → GAMETA crawl + harvest output
```

---

## Deploy (Vercel)

```bash
npm run deploy
```

Or connect [github.com/rapkuryer/abduction](https://github.com/rapkuryer/abduction) in Vercel — build command: `npm run build`, output: `site`.

**Domain DNS (`abduction.buzz`)**

- `A` `@` → `76.76.21.21`
- `CNAME` `www` → `cname.vercel-dns.com`

---

## Credits

Original experiment by [Lusion](https://lusion.co) (Edan Kwan, Brandon Leigh-Bennett, Pauline Stichelbaut).  
Rehosted and rebranded for the **Abduction** community — not affiliated with Lusion.
