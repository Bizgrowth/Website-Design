---
title: Agent or workflow? A simple rule for deciding
date: 2026-08-22
summary: Autonomous agents and workflow tools like n8n are converging, and it's getting harder to know which to use. One rule of thumb cuts through it.
takeaway: List your next automation's steps on paper. If you can write them all down in advance, build it as a workflow and call AI only where judgment is needed.
pillars: [integration, automation]
sources:
  - title: "Is Claude Agent Self-Sufficient, or Do You Still Need n8n? (Grand Linux)"
    url: https://www.grandlinux.com/en/blogs/claude-agent-standalone-or-n8n.html
---

A recent architecture analysis compared agent frameworks (such as the Claude Agent SDK connected to tools through the Model Context Protocol) with workflow engines like n8n. The conclusion is practical:

> If the plan can be written down in advance, let the workflow own it and call the agent at judgment points. If the plan must emerge, let the agent own it.

## What it means for an SMB

- **Most back-office work is plannable.** Invoice intake, lead routing, and reminders follow known steps. Workflows are cheaper, easier to audit, and easier to fix when something breaks.
- **Agents earn their place at judgment points** — classifying a messy email, drafting a reply, or deciding which of several tools to use.
- **The strongest designs mix both:** a workflow for the steps, an agent for the thinking, and a person for the exceptions.
