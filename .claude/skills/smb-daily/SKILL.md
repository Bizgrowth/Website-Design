---
name: smb-daily
description: Research and draft today's SMB AI Daily update for aiopsexpert.com and open it as a pull request for Daniel to approve. Use when the scheduled SMB AI Daily routine fires, or when Daniel says "run SMB AI Daily" or "draft today's update".
---

# SMB AI Daily — daily update procedure

Goal: one short, sourced, genuinely useful update per weekday for owners and operators of small and mid-sized businesses. Quality beats volume: if nothing credible and relevant happened, skip the day and say so.

## 1. Find the story (last 48 hours)

Search the web for recent news on AI **operations** for SMBs: workflow automation (Make, n8n, Zapier), AI agents in business workflows, CRM/accounting AI features (HubSpot, Salesforce, QuickBooks, Xero), Claude/OpenAI/Google business releases, AI governance/regulation that affects small firms, and credible surveys of SMB AI adoption.

Pick **one** story that passes all three tests:
- **Relevant:** an SMB owner could act on it within a month.
- **Credible:** primary source (vendor announcement, official docs, government, major research firm, reputable press). No vendor listicles or unsourced roundups.
- **New:** not already covered — check `content/updates/` titles and sources first.

Open the source (fetch it) and confirm every fact you use.

## 2. Write it

Create `content/updates/YYYY-MM-DD-short-slug.md` from `content/_templates/update.md`, using today's date in US Eastern time.

- 150–300 words. Plain language. No hype.
- Attribute claims ("According to Intuit's announcement…"). Every number needs a source in `sources`.
- `## What it means for an SMB` section with 2–4 practical bullets.
- `takeaway`: one concrete action for this week.
- `pillars`: one to three of `automation`, `integration`, `implementation`.
- Where it fits, link a related blueprint or guide on the site (for example `/blueprints/document-intake-extractor`).
- Never invent statistics, quotes, or client results.

## 3. Check and publish

```bash
npm ci   # first run in a fresh checkout
npm run build && npm run lint
```

Then create branch `smb-daily/YYYY-MM-DD`, commit (`SMB AI Daily: <title>`), push, and open a pull request against the repository's default branch:

- Title: `SMB AI Daily — <Mon DD>: <title>`
- Body: the summary, the takeaway, the source link(s), and the line "Approve by clicking **Merge**. Close the PR to skip today."

Don't merge it yourself. Daniel approves every update.
