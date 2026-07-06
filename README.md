# HAELO by HBA — Website

A bespoke, fully-animated marketing site for HAELO (a design-led talent-acquisition
subsidiary of HBA). Built with Vite + React + TypeScript + Tailwind CSS v4, with
Framer Motion + GSAP + Lenis smooth scroll.

## Run locally

```bash
cd haelo-site
npm install
npm run dev        # http://localhost:5173
```

## Build for production

```bash
npm run build      # outputs to dist/ (static — deploy anywhere)
npm run preview    # preview the production build locally
```

## Capture screenshots (optional)

With the dev server running:

```bash
node scripts/shots.mjs   # writes desktop + mobile PNGs to shots/
```

## Structure

- `src/data/site.ts` — all copy & content (single source of truth)
- `src/components/` — shared UI (Nav, Footer, WorldMap, Reveal, etc.)
- `src/sections/` — home-page sections (Hero, Why, Origin, Sectors, Services, GlobalReach)
- `src/pages/` — routed pages (Home, About, Services, Sectors, Network, Careers, Contact)
- `public/images/` — optimized WebP photography extracted from the HBA design files

## Brand tokens (`src/index.css`)

- Midnight Teal `#1F2E32` · Starlight Mist `#F8F6F2` · Stellar Ember `#F2AE6F`
- Display serif: **Fraunces** · Body: **Source Sans 3** (self-hosted)

## Notes / TODO

- **Fonts** are premium substitutes; swap in the official HAELO brand fonts when available.
- **Careers** uses mock listings in `src/data/site.ts`, structured so a **Bullhorn** feed
  can replace them cleanly.
- **Contact** form is client-validated with a mock submit — wire to a real endpoint/CRM.
- `?static` URL param forces reduced-motion (used only for stable screenshots).
