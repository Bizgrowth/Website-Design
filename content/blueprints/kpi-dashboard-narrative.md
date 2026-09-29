---
title: AI Ops KPI Dashboard with Weekly Narrative
summary: A live dashboard of your core operating numbers, plus a plain-English weekly brief that explains what moved, flags risks, and recommends three actions.
order: 5
industry: Cross-industry
pillars: [integration, implementation]
stack: [n8n, Google Sheets, Claude, Recharts]
governance:
  - Numbers are calculated in code, not by the model
  - The AI only interprets pre-computed metrics
  - Brief reviewed by the owner before it goes to the team
measures:
  - Hours spent building reports (before vs after)
  - Time from week-end to management review
  - Actions taken from the brief
repo: https://github.com/Bizgrowth/Upwork-Projects/tree/main/mvp7-kpi-dashboard
---

## The problem

Owners have their numbers spread across spreadsheets and SaaS tools and rarely have time to assemble them, let alone interpret them.

## How it works

1. A weekly schedule pulls operating data from Google Sheets (or your systems).
2. A code step calculates the metrics — revenue, leads, deals closed, month-over-month change. **The math never depends on the AI.**
3. Claude turns those numbers into a short narrative: wins, risks, and three recommended actions.
4. The dashboard updates, and the brief goes to the owner by email or Slack.

## Why the split matters

Letting a language model do arithmetic is how dashboards end up wrong. Calculating in code and using AI only for interpretation keeps the numbers auditable.
