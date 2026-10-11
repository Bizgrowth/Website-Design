---
title: Google's new Gemini agent gets its own identity, audit trail and spending cap
date: 2026-10-09
summary: Google Cloud introduced the Gemini agent, a single AI agent for work that connects to Workspace, Microsoft 365, Slack and more. Google hasn't said when small businesses get it or what it costs, but the controls it describes are worth planning around now.
takeaway: Write down what a software "coworker" could read and change in your Google Workspace, including inboxes, shared drives and calendars. Mark anything it should never see, before an agent reaches your account.
pillars: [integration, implementation]
sources:
  - title: "Google Cloud — Welcome to Gemini at Work 2026: Introducing Gemini agent"
    url: https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026
  - title: "TechBriefly — Google unveils unified Gemini AI agent with business-first rollout"
    url: https://techbriefly.com/2026/10/09/google-gemini-unified-ai-agent-business-rollout/
---

On October 8, Google Cloud introduced the Gemini agent at its Gemini at Work event. Google calls it "your new single, universal agent for work." According to the announcement, you give it "objectives, not instructions," and it "plans the work, uses skills and tools, connects to your systems, and brings back something finished."

Google says the agent works inside Gmail, Drive, Docs, Sheets, Chat and Calendar. It also connects to Microsoft Office, Teams, Slack, Salesforce and any Model Context Protocol (MCP) server, and it can use Anthropic's Claude models alongside Gemini.

The controls Google describes are the part owners should read closely:

- Each agent gets its own identity, "governed like an employee, with least-privilege permissions."
- "Every action Gemini takes is written to an audit trail and attributed to the agent rather than to a person."
- You can set "a hard limit on a project's AI spend," and the agent pauses when it's reached.

Google's post doesn't give rollout dates, pricing, or which Workspace plans include the agent. TechBriefly reports that businesses will get it before consumers.

## What it means for an SMB

- **Nothing to switch on yet.** Watch your Workspace admin announcements for availability.
- **Treat an agent like a new hire.** Decide in advance what it may read, what it may change, and what needs sign-off. Our [AI approval matrix](/guides/ai-approval-matrix) is a simple way to write that down.
- **Ask for the guardrails first.** Before any agent touches your email, files or books, check that it offers an audit log and a spending limit.
- **Expect mixed tools.** Google says the agent also works with Microsoft 365 and Slack, so your rules should cover every system it can reach.
