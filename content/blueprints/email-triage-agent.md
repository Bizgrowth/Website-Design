---
title: Inbound Email Triage Agent with Eval Gating
summary: An agent reads every inbound email, classifies it, pulls facts from your systems, and writes a draft reply for staff to approve. Nothing sends automatically until it's measured.
order: 1
app: 08-retainai.html
industry: Hospitality & booking
pillars: [automation, integration, implementation]
stack: [Make.com, Relevance AI, Gmail, QuickBooks Online, Google Sheets, promptfoo]
governance:
  - Drafts only at launch — staff send every reply
  - Confidence threshold routes low-confidence drafts to a review label
  - Escalate flag sends sensitive messages straight to a person
  - 150-row labeled test set with a minimum pass rate before any release
  - Deduplication so a webhook retry never sends a guest two emails
measures:
  - Time to first response
  - Intent accuracy against the labeled set
  - Share of drafts sent without edits
  - Escalation rate and false-negative rate
---

## The problem

Booking, service, and accounting inboxes each receive a few hundred messages a month — mostly the same handful of questions about availability, balances, service issues, hours, and directions. In busy season, many sit unanswered for a day or more.

## How it works

1. **Make.com watches the inbox** and drops any message it has already processed (idempotency key on the message ID).
2. **Make calls the agent over its API.** The agent returns structured JSON: intent, entities, draft, confidence, citations, and an escalate flag.
3. **The agent pulls facts from a reusable tool layer** — balances from QuickBooks, reservations from the property system, hours and rates from a Google Sheet that staff update themselves.
4. **A router applies the rules:** escalations alert a person, low-confidence drafts go to a review label, and everything else lands in the thread as a Gmail draft.

## Why it's built this way

The tool layer is built once. The second and third inboxes — and the voicemail channel after them — reuse it, so each additional agent costs a fraction of the first.

Every change to the agent is replayed against the full labeled test set (in the platform's Evaluate tab and outside it with promptfoo) before it's published. If the pass rate drops, the change doesn't ship.

## The path to autonomy

Once confidence scores are stable and the review bucket is measured, specific low-risk intents — hours, directions — can be promoted to auto-send. Everything else stays supervised. That decision belongs to the business owner, based on the data.
