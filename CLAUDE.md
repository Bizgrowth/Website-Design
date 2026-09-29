@AGENTS.md

# Project notes

- Site for AI Operations Expert (aiopsexpert.com). Strategy source of truth: `docs/strategy/positioning-and-site-architecture.md`.
- Content lives in `content/{blueprints,updates,guides}/*.md`. The loaders are in `src/lib/content.ts`. See README for frontmatter fields.
- Colors come from the CSS tokens in `src/app/globals.css` (light + dark). Use the token classes (`bg-surface`, `text-muted`, `text-accent`, …), not raw colors.
- Blueprints must keep the "Reference build" label. Never add client results, testimonials, or statistics without a verifiable source.
- Run `npm run build` and `npm run lint` before committing.
