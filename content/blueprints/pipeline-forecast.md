---
title: Sales Pipeline and Forecast Board
summary: Every open deal on one board by stage, with live totals and a forecast weighted by stage win rates, so you see what is likely to close without maintaining a spreadsheet.
order: 7
industry: Professional services
pillars: [integration, implementation]
stack: [HubSpot or Pipedrive, n8n, Claude, Google Sheets]
governance:
  - Stage definitions are written down and visible on the board
  - Forecast assumptions (win rates per stage) are shown, never hidden
  - Every stage change is logged with the user and time
  - AI only summarizes and flags; a person decides what a deal is worth
measures:
  - Forecast accuracy against closed revenue, tracked monthly
  - Share of deals with a next step and owner
  - Days a deal sits in each stage
app: 02-pipelineiq.html
---

## The problem

Most small teams track deals in a spreadsheet or in someone's head. Stages mean different things to different people, totals go stale, and the forecast is a guess made on Sunday night.

## How it works

1. **Deals live in one system** (your CRM or a simple table), each with an owner, a stage, an amount, and a next step.
2. **Each stage has a written exit rule**, such as "proposal sent" or "budget confirmed," so a deal only moves when something real happened.
3. **Each stage carries a win rate.** Start with an honest estimate and replace it with your own closed-deal history as it builds.
4. **The board totals update live** and the weighted forecast is the sum of amount times win rate.
5. **A short weekly note** (drafted by AI, reviewed by you) calls out stalled deals, missing next steps, and the biggest changes.

## Governance notes

The forecast is only as honest as the stage rules behind it. Write those first, show the win rates on the page, and review forecast against actual closed revenue every month. The reference app runs on sample data to show the idea; the connection to your CRM is adapted to your tools.
