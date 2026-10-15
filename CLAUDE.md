# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # must pass before committing
npm run lint           # eslint; lint one file with: npx eslint src/path/file.tsx
```

There is no test suite. `npm run build` plus `npm run lint` are the checks. Deploys to Vercel.

## Architecture

Site for AI Operations Expert (aiopsexpert.com): Next.js App Router + Tailwind v4, no database. Strategy source of truth: `docs/strategy/positioning-and-site-architecture.md`.

- **Content is Markdown, pages are generated.** `content/{blueprints,updates,guides}/*.md` are read at build time by `src/lib/content.ts` (gray-matter frontmatter, `marked` for HTML). The filename becomes the slug; `pillars` (`automation` | `integration` | `implementation`) decides which `/hub/[pillar]` page lists an item. Templates are in `content/_templates/`; frontmatter fields are in the README.
- **Structured data lives in `src/lib/*.ts`**, not in pages: `site.ts` (brand, booking link, nav), `taxonomy.ts` (pillars, services), `track-record.ts` (verified results), `clients.ts`, `offers.ts`, `apps.ts` (interactive demos), `builds.ts`, `assessment.ts`. Edit these rather than hardcoding in components.
- **API routes** (`src/app/api/{chat,contact,assessment}`): the chat route calls the Anthropic SDK with a system prompt built from site content and `src/lib/chat/` (`prompt.ts` rules and tone, `sources.ts` trusted web-search domains, `lead.ts` lead email). Email goes through Resend in `src/lib/mail.ts`. Env vars (`ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`, `CONTACT_FROM_EMAIL`, `CHAT_MODEL`) are set in Vercel, never in the repo; see `docs/chat-setup.md`.
- **Components:** `src/components/` for shared UI, `src/components/interactive/` for client-side motion pieces.

## Visual design

**Fusion AI** look (Framer template fusionai.framer.website) on the Obsidian Flare structure, dark only. Spec: `docs/design/obsidian-flare.md`. Colors come from the CSS tokens in `src/app/globals.css`; use the token classes (`bg-surface`, `text-muted`, `text-accent`, `text-flare`, …), the helpers (`glass`, `btn-flare`, `badge-glow`, `flare-edge`, `text-flare-gradient`) and the `LightStreaks` component, not raw colors.

## Content rules

- Blueprints must keep the "Reference build" label. Never present one as a client result.
- Never add client results, testimonials, or statistics without a verifiable source. Efficiency claims are per workflow, against the client's baseline.
- Every update needs at least one entry under `sources` and a one-line `takeaway`.

## Skills

`.claude/skills/add-content` (add or edit site content for Daniel, who is non-technical) and `.claude/skills/smb-daily` (daily update routine, opened as a pull request) cover content workflows. Use them instead of editing content by hand.
