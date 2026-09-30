# AI Operations Expert — Positioning & Site Architecture Brief (v2)

Status: Working strategy. Section 8 lists the few remaining decisions.
Date: 2026-09-29

Sources: live aiopsexpert.com, the site critique doc, both resumes (Sep 2026 version is authoritative), the Upwork Execution Plan, the "Ultimate Upwork Pitch Strategy" deck, the marina/campground SOW, the August 2026 daily SMB briefings, the Upwork Market Intel artifact (Sep 2026), and the prior strategy conversation. The Bizgrowth/Upwork-Job-Analysis repo is empty, so the Market Intel artifact is the job-analysis source.

---

## 1. The situation, stated plainly

- **Real assets:** 20+ years as an operator, including $0→$265M (Align Networks), $15M→$75M in under a year (One Call), a 12X EBITDA exit to General Atlantic, COO of a $1B real estate platform, and occupancy/NOI turnarounds. These are verifiable and rare. They are the proof.
- **AI capability:** Working systems built with real tools (Make, n8n, Relevance AI, Claude, HubSpot) against realistic scenarios. **None of them has run for a paying client.** They show capability. They are not client results.
- **Constraint:** You need income now, and the AI practice has no paid track record yet.

## 2. The proof rule (non-negotiable)

Demo builds are shown as **"System Blueprints"**, clearly labeled as reference builds. They must never appear as client results, testimonials, or production volumes.

- Remove from the site: the SaaS/e-commerce/retail percentage stats, the six testimonials, and any unlabeled case study.
- Stop using the proposal line claiming a production healthcare agent at 400–600 messages a month. On Upwork that is misrepresentation, and it can get the account suspended.
- The honest version is stronger anyway: "Here is the exact system I would build for you, running live. Here is the operating record behind the person installing it."
- The first 2–3 paid engagements become the real case studies (section 5).

## 3. Decisions locked (2026-09-29)

- **Brand:** AI Operations Expert, on aiopsexpert.com. Retire "AI Ops Experts" and aioperationsexperts.com everywhere.
- **Site platform:** Lovable, synced to this repo.
- **Income floor:** $1,000/month. **Capacity:** 60 hrs/week.
- **Service pillars** (Daniel's areas of depth):
  1. AI Readiness (assessment, roadmap, governance baseline)
  2. Workflow Automation & Tool Integration (Make, n8n, HubSpot, QuickBooks, APIs)
  3. AI Agents: build, manage, scale (triage, intake, knowledge, multi-agent)
  4. Ops Dashboards (KPI and AI-performance visibility)
  5. AI Governance (runs through all of the above: approval matrix, evals, failure playbooks)

## 4. Strategy: two tracks, one brand

The $1,000 floor is covered by a single fixed-price Upwork job, so **Upwork is the cash track** and direct SMB sales is the growth track. Fractional COO work is kept as a premium offer and as credibility, not as the survival plan.

| | Track A — Upwork cash + reviews (now) | Track B — Direct AI Ops practice (build in parallel) |
|---|---|---|
| What | Fixed-price builds from the existing blueprint library | Diagnostic → governed build → Oversight retainer, plus fractional COO |
| Price | First 3 jobs: $500–$1,500 to earn reviews. After that, $1,500–$8,000 (marina SOW model) | $2.5K Diagnostic → $6K–$15K builds → $2K–$5K/month Oversight; fractional $5K–$12K/month |
| Buyer | Businesses posting Make/n8n, agent, CRM, and dashboard jobs | Healthcare services and property management owners; PE/search-fund portfolio companies |
| Proof | Blueprint library, 90-second Looms, honest labeling | Upwork reviews + first paid case studies + executive track record |

**Upwork rules:** No jobs under $500. No data entry, content editing, or under-bidding below $500. Every proposal links to the matching blueprint.

**Weekly hours (60):** 25 selling (15 Upwork proposals/week + 10 direct outreach), 20 delivery, 10 site and Looms, 5 admin. **Stop building new demos.** The library is already big enough. What's missing is sales activity.

## 5. Blueprint inventory (existing GitHub repos → site proof)

| Blueprint (site name) | Source repo | Pillar |
|---|---|---|
| Lead Pipeline (n8n + Claude + HubSpot) | Upwork-Projects/mvp1, ai-lead-qualifier, ai-ops-portfolio-apps/01 | Automation, Agents |
| Ops Knowledge Brain (RAG, Supabase pgvector, citations) | Upwork-Projects/mvp2, ai-ops-portfolio-apps/05 | Agents |
| Document Intake Extractor (leases, invoices, contracts) | Upwork-Projects/mvp3, ai-ops-portfolio-apps/06 | Automation |
| CRM Follow-Up Suite | Upwork-Projects/mvp4, upwork-portfolio-demos/demo-5 | Integration |
| AI Ops KPI Dashboard | Upwork-Projects/mvp7, ai-ops-portfolio-apps/07 | Dashboards |
| Multi-Agent Operations Team | Upwork-Projects/mvp8, aiopsexpert-framework | Agents (scale) |
| Support & Retention Triage | ai-ops-portfolio-apps/08, upwork-portfolio-demos/demo-4 | Agents |
| Voice AI Agent | upwork-portfolio-demos/demo-2 | Agents |
| Email Triage Agent with eval gating (Relevance AI + Make + promptfoo) | Marina SOW design | Agents, Governance |

Each blueprint page shows: the problem, an architecture diagram, the stack, the governance controls, what it would measure, and a 90-second Loom, labeled "Reference build."

Repo hygiene: 82 repos, many archived duplicates (five Content_Creator variants, multiple site versions). Before linking GitHub from Upwork or the site, pin the six blueprint repos and make the duplicates private.

## 6. Positioning

- **Category:** Fractional COO & AI Operations Partner for owner-led service businesses
- **Homepage headline (live):** "AI can't run what isn't written down." Core argument: no written SOPs, documented workflows, or connected data means no AI will create time, margin, or scale. The AI Readiness Assessment (`/assessment`) is the primary call to action.
- **Earlier headline direction:** "An operator who has scaled companies to $265M, now installing AI that actually runs your operations: measured, controlled, and owned."
- **Signature method:** *Earned Autonomy.* AI starts supervised, is measured against your baseline, and is promoted to autonomous one task type at a time, only once it passes.
- **10X:** Claim it only per workflow, measured against the client's own baseline. Never company-wide.
- Avoid "AIOps," which means IT monitoring to technical buyers.

## 7. What buyers are paying for (demand, ranked)

| Rank | Productized build | Evidence |
|---|---|---|
| 1 | **Inbound Triage Agent**: email → voicemail → chat, drafts reviewed by staff first | Marina job; critique research; Aug briefings (human-in-the-loop wins approvals); Market Intel (AI integration +178%, chatbots +71%) |
| 2 | **Back-Office Intake Pipeline**: invoices, forms, certificates → QuickBooks/CRM | Critique #2; Aug 6 briefing; Market Intel (BPA growing, CRM automation #2) |
| 3 | **Ops Knowledge Brain**: SOP/policy assistant that staff keep current | Critique #3; marina knowledge base requirement |

Every build includes the governance kit: approval matrix, labeled eval set, failure playbook, and baseline KPIs. Make and n8n lead the tool stack (#1 and #2 most-named tools on Upwork).

**Side-door offers:** Stalled-Pilot Rescue; AI Governance Pack (for insurer, lender, and customer questionnaires); post-acquisition AI Ops for search funds and small PE buyers.

**First-case-study plan:** Run 2–3 Diagnostics at a reduced fee in exchange for documented baselines, permission to publish results, and a reference call.

## 8. Industry focus

| Industry | Credibility | Role |
|---|---|---|
| Healthcare services (workers' comp networks, PT, occupational health) | Highest | Lead vertical #1 |
| Property / HOA / multifamily management | High | Lead vertical #2 |
| Logistics / transportation | Medium (GO T&T) | Later pack |
| Seasonal hospitality / booking | Demand signal only | Upwork opportunistic |
| SaaS / e-commerce / retail | None | Remove from site |

## 9. Website architecture

```
/                           Operator headline, two ways to work with Daniel, Earned Autonomy diagram, track record, one CTA
/fractional-coo             Premium offer: fractional operations leadership with AI Diagnostic included
/method                     AI Ops OS: 4 layers (Govern, Operate, Build, Prove), 5 phases, Green/Yellow/Red tiers
/services/ai-readiness
/services/workflow-automation   (incl. tool integration)
/services/ai-agents            (build, manage, scale)
/services/dashboards
/services/ai-governance
/blueprints                 Labeled reference builds: architecture diagram, 90-sec Loom, stack, what it would measure
/industries/healthcare-services
/industries/property-management
/oversight                  Monthly retainer with sample report
/track-record               Verified executive results (replaces fake "results")
/assessment                 AI Readiness Assessment with sample scorecard preview
/about
/resources                  Lead magnets: approval matrix, eval-set template, AI use policy
```

Design principles: system diagrams, not robots. Show sample deliverables. No animated counters. One primary CTA ("Book a 20-min Operations Call").

**Fix now on the live site:** remove unverifiable stats and testimonials; fix "Most A|", the 0% counters, "Top -18", "-120%", the back links, and the duplicate logo marquee; unify the brand, domain, and email.

## 10. Next build step

Build the site in Lovable from the section 9 sitemap. Order: Home → Blueprints (3 strongest first: Knowledge Brain, Document Intake, Email Triage with eval gating) → Track Record → AI Readiness assessment → Solutions → Industries.
