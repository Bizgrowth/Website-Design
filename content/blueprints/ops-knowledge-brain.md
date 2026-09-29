---
title: Ops Knowledge Brain (Cited Answers from Your SOPs)
summary: Staff ask questions in plain English and get answers drawn only from your policies and SOPs — with the source document and page cited under every answer.
order: 2
industry: Cross-industry
pillars: [automation, integration]
stack: [n8n, Supabase pgvector, Claude, Google Drive]
governance:
  - Answers restricted to retrieved documents — no source, no answer
  - Every answer cites file name and page
  - Similarity threshold filters weak matches before the model sees them
  - Document owners assigned per policy area
measures:
  - Questions answered without escalation
  - Answer accuracy on a monthly sample
  - Time to onboard a new hire
repo: https://github.com/Bizgrowth/Upwork-Projects/tree/main/mvp2-rag-chatbot
---

## The problem

Operating knowledge lives in PDFs, shared drives, and the heads of long-tenured staff. New hires interrupt senior people, answers vary by who you ask, and policy changes don't reach the front line.

## How it works

1. Documents are split into passages and stored in a Supabase vector database.
2. A question is matched against those passages; only matches above a similarity threshold are kept.
3. Claude writes the answer **only from the retrieved passages** and cites where each fact came from — for example, *Refund & Returns Policy.pdf, page 3*.
4. If nothing relevant is found, the assistant says so and routes the question to the document owner.

## Governance notes

The riskiest failure for a knowledge assistant is a confident wrong answer. Restricting answers to retrieved text, showing citations, and sampling answers monthly keeps that risk visible and owned.
