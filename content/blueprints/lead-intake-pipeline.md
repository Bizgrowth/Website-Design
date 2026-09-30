---
title: 60-Second Lead Intake Pipeline
summary: A web inquiry is captured, researched, scored, logged in HubSpot, answered with a personalized first reply, and announced to your team in Slack — in under a minute.
order: 4
industry: Professional services
pillars: [automation, integration]
stack: [n8n, Claude, HubSpot, Gmail, Slack, Tally]
governance:
  - First reply can run as draft-for-approval or auto-send by lead tier
  - Hot leads always alert a named owner in Slack
  - CRM field mapping validated before write
measures:
  - Speed to first response
  - Lead-to-meeting conversion rate
  - Share of leads with a complete CRM record
repo: https://github.com/Bizgrowth/Upwork-Projects/tree/main/mvp1-lead-pipeline
app: 01-leadpilot.html
---

## The problem

Every hour between an inquiry and a reply lowers the odds of winning it. Most small teams answer when they get to it, log the lead inconsistently, and lose track of who owns the follow-up.

## How it works

1. The web form posts to an n8n webhook.
2. Claude reads the inquiry, scores it (hot, warm, cold), and drafts a personalized reply.
3. The contact and deal are created or updated in HubSpot.
4. The reply goes out (or waits for approval), and the owner gets a Slack alert with the context.

## Governance notes

Start in draft mode. Once the team trusts the drafts for a given lead tier, promote that tier to auto-send and keep sampling.
