# Deployment

Abduction is deployed as a **static site on Vercel** at [abduction.buzz](https://www.abduction.buzz/).

## Vercel configuration

`vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "site",
  "installCommand": "",
  "framework": null
}
```

No install step is required — the build uses only Node.js built-ins.

## Deploy from CLI

Prerequisites: [Vercel CLI](https://vercel.com/docs/cli) installed and authenticated.

```bash
npm run deploy
```

This runs `npm run build` then `vercel --prod --yes`.

## Deploy from GitHub

1. Connect [github.com/abductiongame/abduction](https://github.com/abductiongame/abduction) to a Vercel project
2. Set **Build Command:** `npm run build`
3. Set **Output Directory:** `site`
4. Set **Install Command:** (leave empty)
5. Deploy on push to `main`

## Custom domain (abduction.buzz)

DNS records for the apex domain and www subdomain:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

In the Vercel project settings, add both `abduction.buzz` and `www.abduction.buzz` as domains. Redirect apex ↔ www as preferred.

## GitHub Pages (alternative)

This repo can also serve docs via GitHub Pages, but the **game itself** is designed for Vercel (or any static host serving the `site/` folder).

To preview docs only:

1. Go to repo **Settings → Pages**
2. Source: **Deploy from branch** → `main` → `/docs`
3. Docs will be available at `https://abductiongame.github.io/abduction/`

The in-game Documentation button links to the GitHub docs folder for simplicity.

## CI checklist

Before each production deploy:

- [ ] `npm run build` completes without errors
- [ ] Local smoke test at `http://localhost:3789`
- [ ] Meta tags point to `https://abduction.buzz`
- [ ] Documentation link resolves to GitHub docs
