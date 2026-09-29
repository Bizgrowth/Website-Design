---
name: add-content
description: Add or edit site content (SMB AI Daily update, blueprint, guide, case study, track-record item, photo) for Daniel, a non-coder. Use when Daniel says "add a blueprint", "post an update", "add this Loom", "new case study", "update my bio", or pastes notes, links, or a repo he wants on the site.
---

# Add content to the AI Operations Expert site

Daniel is not a developer. He will paste rough notes, a Loom link, a GitHub repo, an article, or a screenshot. Your job is to turn that into a finished, correctly formatted page, check it, and publish it to a branch — without asking him to touch code.

## 1. Work out what he's adding

| He gives you | Create | Template |
|---|---|---|
| News/article link, "post an update" | `content/updates/YYYY-MM-DD-short-slug.md` | `content/_templates/update.md` |
| A system he built, a repo, a Loom demo | `content/blueprints/short-slug.md` | `content/_templates/blueprint.md` |
| How-to / explainer | `content/guides/short-slug.md` | `content/_templates/guide.md` |
| Bio, email, phone, socials, booking link | edit `src/lib/site.ts` | — |
| Executive result | edit `src/lib/track-record.ts` | — |
| Prices or FAQ | edit `src/lib/offers.ts` | — |
| Headshot | save as `public/images/daniel-schley.jpg` (square, ≥ 800px) | — |

Ask at most one question, and only if you truly can't infer the content type or a required fact.

## 2. Non-negotiable content rules

1. **Blueprints are reference builds.** Never describe one as a client project, and never invent client names, volumes, testimonials, or results.
2. **A real client case study** needs measured before/after numbers and client permission. If Daniel doesn't confirm both, write it as a blueprint instead and tell him why.
3. **Every statistic has a linked source.** Prefer primary sources (McKinsey, S&P Global, Gartner, Census Bureau, the vendor's own docs). Drop any number you can't source.
4. **Efficiency claims are per workflow**, measured against a baseline. No company-wide "10X".
5. Plain language for owners and operators. Short paragraphs. End updates with a practical `takeaway`.
6. `pillars` values are only `automation`, `integration`, `implementation`.

## 3. Check it

```bash
npm run build && npm run lint
```

Fix anything that fails. If you can, start the site (`npx next start -p 3100`) and screenshot the new page so Daniel can see it.

## 4. Publish and explain

- Commit on a new branch named `content/<short-slug>` and open a pull request against the default branch. Title: `Content: <page title>`.
- Tell Daniel in two or three plain sentences: what page was added, where it will appear (for example, "AI Hub → Integration" and the home page), and that he approves it by clicking **Merge** on the pull request.
