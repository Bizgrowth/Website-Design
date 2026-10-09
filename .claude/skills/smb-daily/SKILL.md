---
name: smb-daily
description: Publish earlier SMB AI Daily updates unless Daniel vetoed them, then research and draft today's update for aiopsexpert.com as a pull request. Use when the scheduled SMB AI Daily routine fires, or when Daniel says "run SMB AI Daily" or "draft today's update".
---

# SMB AI Daily — daily update procedure

Goal: one short, sourced, genuinely useful update per weekday for owners and operators of small and mid-sized businesses. Quality beats volume: if nothing credible and relevant happened, skip the day and say so.

## 0. Publish earlier updates (veto window)

Each update gets roughly a day as an open pull request. If Daniel doesn't stop it, it publishes. Do this step before researching today's story:

1. List open pull requests whose branch starts with `smb-daily/` and that target the default branch.
2. A PR is due if it was opened **at least 20 hours ago**. Merge each due PR (merge commit, not squash), oldest first, only when all of these hold:
   - It is still open. Closing the PR is how Daniel skips an update.
   - It has no `hold` label, no "changes requested" review, and no comment from Daniel asking to hold, change or wait.
   - It merges cleanly. Merge the latest default branch into it, then `npm run build` and `npm run lint` must pass.
3. If a due PR fails a check, don't merge it. If Daniel asked for changes, make them and leave the PR open for another day. Otherwise, say in the run summary what's blocking it.
4. Don't merge a PR opened less than 20 hours ago, including today's.

In the run summary, list what you published, what you held back and why, and the PR opened today.

## 1. Find the story (last 48 hours)

Search the web for recent news on AI **operations** for SMBs: workflow automation (Make, n8n, Zapier), AI agents in business workflows, CRM/accounting AI features (HubSpot, Salesforce, QuickBooks, Xero), Claude/OpenAI/Google business releases, AI governance/regulation that affects small firms, and credible surveys of SMB AI adoption.

Pick **one** story that passes all three tests:
- **Relevant:** an SMB owner could act on it within a month.
- **Credible:** primary source (vendor announcement, official docs, government, major research firm, reputable press). No vendor listicles or unsourced roundups.
- **New:** not already covered — check `content/updates/` titles and sources first, and the open `smb-daily/` pull requests.

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

## 3. Check and open the pull request

```bash
npm ci   # first run in a fresh checkout
npm run build && npm run lint
```

Then create branch `smb-daily/YYYY-MM-DD`, commit (`SMB AI Daily: <title>`), push, and open a pull request against the repository's default branch:

- Title: `SMB AI Daily — <Mon DD>: <title>`
- Body: the summary, the takeaway, the source link(s), and the line "This publishes automatically at the next morning run. To stop it, close the PR, add a `hold` label, or comment what to change."

Never merge today's PR in the same run. It publishes only through step 0 of a later run, after Daniel's veto window.
