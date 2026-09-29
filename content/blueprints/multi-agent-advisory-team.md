---
title: Multi-Agent Operations Advisory Team
summary: Four specialized agents — research, strategy, marketing, and operations — work in sequence on a business challenge and hand back an executive brief with a 30-day plan.
order: 6
industry: Cross-industry
pillars: [automation, implementation]
stack: [n8n, Claude]
governance:
  - Each agent has a narrow role and a fixed output format
  - Outputs are advisory — a person owns every decision
  - Full hand-off trail kept for review
measures:
  - Time to a first-draft plan
  - Share of recommendations adopted after review
repo: https://github.com/Bizgrowth/Upwork-Projects/tree/main/mvp8-multi-agent
---

## The problem

Small companies face strategy and operations questions without a leadership bench to pressure-test them.

## How it works

1. A challenge is submitted with industry, company size, and urgency.
2. **Research agent** frames the market and constraints.
3. **Strategy agent** compares options and picks a route.
4. **Marketing agent** drafts positioning and outreach.
5. **Operations agent** turns it into a 30-day roadmap.

Each agent passes its output to the next. The final brief is a starting point for a working session — not a replacement for one.

## How it scales

The same pattern — narrow agents, fixed hand-offs, a human decision at the end — is how larger agent systems stay understandable as they grow.
