# aiopsexpert.com — AI Operations Expert Hub

The central hub for SMB AI automation, integration, and implementation: blueprints, SMB AI Daily updates, guides, and services.

Strategy and site architecture: `docs/strategy/positioning-and-site-architecture.md`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before pushing
```

Stack: Next.js (App Router) + Tailwind CSS. Content is Markdown in `content/`, so no database is needed. Deploys to Vercel.

## Adding content (no code needed)

Every page is generated from a Markdown file. Add a file, push, and the page appears.

| To add | Create a file in | Name it |
|---|---|---|
| SMB AI Daily update | `content/updates/` | `YYYY-MM-DD-short-title.md` |
| Blueprint | `content/blueprints/` | `short-title.md` |
| Guide | `content/guides/` | `short-title.md` |

Copy an existing file in the same folder and change the top section (between the `---` lines).

- `pillars` must be one or more of `automation`, `integration`, `implementation`. This decides which AI Hub page the item appears on.
- Every update needs at least one entry under `sources` and a one-line `takeaway`.

## Content rules

1. **Blueprints are reference builds.** They are always labeled that way. Never present one as a client result.
2. **Client case studies** only with measured before/after numbers and the client's permission.
3. **No unsourced statistics.** Cite primary sources (McKinsey, S&P Global, Gartner, Census Bureau) where possible.
4. **Efficiency claims are per workflow,** measured against the client's baseline.

## Where things live

- `src/lib/site.ts`: brand name, booking link, and navigation
- `src/lib/taxonomy.ts`: the three hub pillars and five services
- `src/lib/track-record.ts`: verified executive results
- `src/app/`: pages
- `src/components/`: shared UI
