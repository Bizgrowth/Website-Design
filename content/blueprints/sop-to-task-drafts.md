---
title: SOP-Driven Task Drafts
summary: A task board that shows the written procedure next to each task and drafts a first pass from the two, so your team starts from a draft that follows your own process.
order: 9
industry: Cross-industry
pillars: [automation, implementation]
stack: [Notion or Airtable, Claude, n8n, Google Drive]
governance:
  - A person reviews and finishes every draft
  - Each draft cites the SOP it came from
  - Tasks without a matching SOP are flagged, not guessed
  - Outdated SOPs are flagged for update
measures:
  - Time from task assigned to first draft
  - Share of drafts accepted with light edits
  - SOPs updated after drafts exposed gaps
app: 04-flowdesk.html
---

## The problem

Repeat work gets done differently by each person, and writing the first version takes longer than it should. Your procedures exist, but they sit in a folder and nobody opens them while doing the task.

## How it works

1. **Repeat work is captured as tasks** on a board, each with an owner and a task type.
2. **Each task type is linked to its written SOP**, so the procedure appears beside the task.
3. **The SOP panel drafts a first pass** from the task details and the procedure, following your steps and your wording.
4. **A person reviews and finishes the work.** The draft cites the SOP so the reviewer can check it.
5. **Gaps become a to-do list.** When a task has no SOP, or a draft shows the SOP is out of date, it is flagged for you to fix.

## Governance notes

This build depends on the quality of your SOPs: better procedures give better drafts. It is also the clearest way to see why documenting operations comes before automating them. The reference app runs on sample data to show the idea.
