---
title: "Workflow, agent, or both? Choosing the right build for an SMB"
date: 2026-09-29
summary: How to decide between Make or n8n workflows, AI agents, and off-the-shelf tools — and why most good systems combine them.
pillars: [integration, automation]
---

## Start with the work, not the tool

Write down the steps. Then ask three questions:

1. **Can every step be written down in advance?** If yes, it's a workflow.
2. **Is there a step that needs judgment** — reading a messy email, choosing a reply, classifying a document? That step calls AI.
3. **Is there an established product that already does exactly this?** If it's cheaper than building and fits your stack, buy it.

## A typical SMB design

| Part | Tool | Why |
|---|---|---|
| Trigger and routing | Make or n8n | Reliable, auditable, easy for staff to monitor |
| Judgment steps | Claude or another model via API | Classification, extraction, drafting |
| Source of truth | Your CRM, accounting, or a Google Sheet | Staff keep facts current without touching the AI |
| Oversight | Dashboard plus a monthly sample | Proof it's working |

## Red flags

- A "fully autonomous agent" pitched for work that follows a checklist.
- Custom code for something a workflow tool handles well.
- Any build with no test set and no one assigned to own it.
