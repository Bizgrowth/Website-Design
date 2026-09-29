# AI Ops Expert — Positioning & Site Architecture Brief (v0, DRAFT)

Status: Draft pending answers to the open questions in section 7. Nothing here is final until those are answered.
Date: 2026-09-29

Sources reviewed: live aiopsexpert.com, the site critique doc (Google Drive), Daniel_Schley_Freelance_Resume, Upwork Execution Plan, "The Ultimate Upwork Pitch Strategy" deck, the marina/campground Relevance AI SOW, the August 2026 daily SMB briefings, and the prior strategy conversation (AI Ops OS, earned autonomy, industry packs). The Bizgrowth/Upwork-Job-Analysis GitHub repo is empty (nothing has been pushed), so the "Upwork Market Intel" artifact (Sep 2026) was used as the job-analysis source.

---

## 1. Verdict in one paragraph

The strategy direction (an operating system that makes AI safe, measured, and repeatable) is right and it is backed by what buyers are asking for. The current execution works against it. The site sells generic "AI Agents / Predictive Analytics / Workflow Orchestration" to SaaS, e-commerce and retail, industries where you have no track record. It shows statistics that can't be verified, and the Upwork plan chases $100–$500 gigs while the strategy prices at $15K–$35K. **Fix proof and focus before design.** A better-looking site will not convert with the current claims.

## 2. What the evidence says buyers want (demand, ranked)

| Rank | What they buy (their words) | Evidence |
|---|---|---|
| 1 | **Inbound communication triage**: email, voicemail, chat, and web leads answered fast, with drafts reviewed by staff first | Marina Upwork job (hundreds of messages a month, "drafts only until measured"); critique doc #1 demand; Aug 2026 briefings (HITL wins approvals) |
| 2 | **Document and back-office intake**: invoices, forms, certificates, and balances going into QuickBooks or the CRM | Critique doc #2; Aug 6 briefing ("peak SMB demand for back-office automation"); marina follow-on (certificates, payment chasing) |
| 3 | **Ops knowledge assistant**: SOPs, policies, and rate cards answered accurately and kept current by staff | Critique doc #3; marina knowledge base requirement |
| 4 | **Proof it's safe and working**: eval sets, pass-rate gates, confidence thresholds, escalation | Marina job asked for this explicitly (150-row labeled set, promptfoo, pre-publish gating) |
| 5 | **Someone to own it after launch**: maintenance, promotion to auto-send, and the next agent | Marina "follow-on program"; the retainer thesis |

**Upwork Market Intel (Sep 2026 artifact) confirms the direction.** Make and n8n are the #1 and #2 tools named in job posts. Workflow automation is the most-posted automation category. AI integration is up 178% YoY, CRM automation ranks #2, and business process automation (approvals, document routing) is growing. "Operations consulting + automation" and "Healthcare + AI" are listed as the least-competed niches. AI Strategy Consulting pays $75–200/hr. Two cautions: AI is still only ~3% of the Upwork feed, and most of those figures come from third-party blogs, so treat them as directional. **Reject** the artifact's "quick wins" (content editing, data entry, under-bidding). For a former $265M operator, low-value reviews lower your rate ceiling and contradict the positioning.

**Key insight:** The marina buyer described your AI Ops OS without knowing it exists. They asked for drafts first, measurement before auto-send, per-intent promotion, a reusable tool layer, and documentation so staff can own it. That is **earned autonomy**. Buyers purchase #1–#3. The OS (#4–#5) is *why they pick you and why they stay*. It is the differentiator, not the headline product.

## 3. Positioning (proposed)

- **Category:** AI Operations Partner for owner-led service businesses (not "AIOps", which means IT monitoring to technical buyers)
- **Promise:** "Your busiest workflows run on AI — with the controls, measurement, and ownership that keep it from breaking."
- **Signature method:** *Earned Autonomy* — every AI workflow starts supervised (drafts), is measured against your baseline, and is promoted to autonomous one task type at a time, only once it passes.
- **Proof of the operator behind it:** $0→$265M workers' comp network (Align Networks), 12X EBITDA exit, COO of a $1B real estate platform. **Use only claims you can defend in a reference call.**
- **10X:** Claim it only per workflow and against the client's own baseline, never company-wide.

## 4. Offer architecture (proposed, max 3 tiers + 3 productized builds)

1. **Entry: AI Ops Diagnostic** (2 weeks, fixed fee). Workflow inventory, baselines, shadow-AI check, and a ranked roadmap.
2. **Core: Productized builds.** Each one ships with the governance kit (approval matrix, labeled eval set, failure playbook, KPI baseline):
   - Inbound Triage Agent (email → voicemail → chat)
   - Back-Office Intake Pipeline (docs → QuickBooks/CRM)
   - Ops Knowledge Brain (SOP/policy assistant)
3. **Recurring: AI Ops Oversight** (monthly). Eval re-runs, drift and cost review, per-intent promotion to autonomous, and one new workflow each quarter.

Secondary entry offers (lower volume, high intent): **Stalled-Pilot Rescue** and **AI Governance Pack** (for insurer, lender, or customer questionnaires).

**Cut:** Predictive Analytics, the "18 solutions" page, and SaaS/e-commerce/retail targeting.

## 5. Industry focus (proposed, pending answers)

Score = credibility × repetitive volume × cost of error × low competition.

| Industry | Your credibility | Recommendation |
|---|---|---|
| Healthcare-adjacent (workers' comp networks, PT, occupational health) | Highest (20 years) | **Lead vertical #1** |
| Property / HOA management | High (COO $1B portfolio, CBO $40M) | **Lead vertical #2** |
| Logistics / 3PL | Medium (GO T&T COO; existing 3PL case study) | Pack #3 later |
| Seasonal hospitality / booking (marina, campground) | Low, but a live demand signal | Opportunistic via Upwork |
| SaaS / e-commerce / retail (current site) | None | **Remove** |

## 6. Website architecture (proposed sitemap)

```
/                      Home — outcome headline, 3 workflows, Earned Autonomy diagram, verifiable proof, Diagnostic CTA
/method                The AI Ops OS — 4 layers (Govern, Operate, Build, Prove), 5 phases, Green/Yellow/Red tiers
/solutions/inbound-triage
/solutions/back-office-intake
/solutions/knowledge-brain
/industries/healthcare-services
/industries/property-management
/oversight             Retainer — what's reviewed monthly, sample report
/results               Only verified case studies (industry, stack, baseline → result)
/assessment            AI Readiness Assessment with sample scorecard preview
/about                 Operator story (the executive track record)
/resources             Templates as lead magnets (approval matrix, eval-set template, AI use policy)
```

Design principles: system diagrams instead of robot imagery. Sample deliverables shown up front (scorecard, approval matrix, eval report). No animated counters that can render as 0%. One primary CTA: book the Diagnostic.

## 7. Open questions (must answer before build)

See the chat response. The answers will be folded into v1 of this brief.

## 8. Non-negotiable fixes regardless of direction

- Remove or verify every statistic and testimonial on the live site.
- Fix known bugs: "Most A|" hero cutoff, 0% counters, "Top -18", "-120%", back links, duplicate logo marquee.
- Unify the brand name, domain, and email (aiopsexpert.com vs "AI Ops Experts" vs aioperationsexperts.com).
