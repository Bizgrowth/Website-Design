---
title: "Earned Autonomy: taking an AI workflow from drafts to autonomous"
date: 2026-09-29
summary: A step-by-step way to let AI take on more work only as it proves itself — the same logic managed care uses to loosen review for trusted providers.
pillars: [implementation, automation]
---

Most AI projects fail for organizational reasons, not technical ones: nobody owns the workflow, nobody measured the "before," and nobody planned for what happens when the AI is wrong. Earned Autonomy fixes all three.

## Stage 1 — Red: human decides

The AI researches and drafts; a person makes every decision. Use this for any new workflow and for anything touching money, legal exposure, or an upset customer.

**Exit criteria:** you have a labeled test set of real examples, and you know the AI's accuracy on it.

## Stage 2 — Yellow: human approves

The AI acts, but a person reviews before anything reaches a customer. Every output carries a confidence score; low-confidence items go to a separate queue.

**Track:** accuracy, share of outputs approved without edits, and escalation rate.

## Stage 3 — Green: AI runs, people audit

Promote **one task type at a time** — for example, "hours and directions" emails — once it holds its pass rate for an agreed period. Keep sampling a fixed percentage every month.

## The rules that make it work

1. **Every workflow has a named owner.**
2. **Baseline first.** Measure time, cost, and error rate before building.
3. **Promotion is a decision, not a drift.** It's written down, with the data that justified it.
4. **Demotion is allowed.** If accuracy drops, the task goes back to Yellow.
