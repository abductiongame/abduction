# Abduction Documentation

Welcome to the **Abduction** project docs. This browser game is a WebGL UFO sandbox with a massive GPGPU crowd simulation — fly a saucer, scoop panicking humans, and cause physics-driven chaos.

**Live game:** [abduction.buzz](https://www.abduction.buzz/)  
**Source:** [github.com/abductiongame/abduction](https://github.com/abductiongame/abduction)  
**Community:** [@abductiongame on X](https://x.com/abductiongame)

---

## Quick links

| Guide | Description |
|-------|-------------|
| [Getting Started](./GETTING_STARTED.md) | Clone, build, and run locally |
| [Controls](./CONTROLS.md) | Desktop and mobile input |
| [Architecture](./ARCHITECTURE.md) | Project structure and tech stack |
| [Deployment](./DEPLOYMENT.md) | Vercel deploy and DNS setup |
| [Credits](./CREDITS.md) | Original authors and licensing notes |

---

## What is Abduction?

Abduction is a rehosted and rebranded version of the [Lusion Monthly Experiment](https://exp-abduction.lusion.co/). There are no levels, no score, and no win condition — just a living city full of simulated humans reacting to your UFO in real time.

Inspired by *Destroy All Humans!*, the experience pushes WebGL with thousands of ragdolling, running, panicking characters powered by GPU compute.

---

## Requirements

- **Node.js** 18+ (for build scripts and local server)
- A modern browser with **WebGL 2** support
- Recommended: discrete GPU for smooth crowd simulation

---

## One-minute start

```bash
git clone https://github.com/abductiongame/abduction.git
cd abduction
npm run build
npm start
```

Open **http://localhost:3789** and start abducting (metaphorically).
