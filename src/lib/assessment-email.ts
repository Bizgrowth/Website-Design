import { buildStatuses, levelWord, starterPlan, type AssessmentResult } from "@/lib/assessment";
import { escapeHtml } from "@/lib/forms";
import { site } from "@/lib/site";

// Builds the plain-text and HTML versions of the results email from a server-scored result.
export function resultsEmail(name: string, result: AssessmentResult) {
  const scores = Object.fromEntries(result.areas.map((a) => [a.slug, a.score]));
  const statuses = buildStatuses(scores);
  const ready = statuses.filter((s) => s.ready).map((s) => s.build.name);
  const notYet = statuses.filter((s) => !s.ready);
  const plan = starterPlan(result);
  const first = name.split(" ")[0] || "there";

  const text = [
    `Hi ${first},`,
    "",
    `Here are your results from the AI Readiness self-check (${site.url}/assessment).`,
    "",
    `RESULT: ${result.tier.name} (${result.total} of ${result.max})`,
    result.tier.summary,
    "",
    "YOUR SCORES",
    ...result.areas.map((a) => `- ${a.name}: ${a.score} of 6 (${levelWord(a.score)})`),
    "",
    `YOUR BIGGEST GAP: ${result.weakest.name}`,
    result.weakest.firstMove,
    "",
    "YOUR 4-WEEK STARTER PLAN",
    ...plan.map((p) => `${p.week}: ${p.title}. ${p.detail}`),
    "",
    "WHAT YOU COULD AUTOMATE TODAY",
    ready.length ? ready.join(", ") : "Nothing yet. Fix the gaps above first so automation has something solid to work from.",
    "",
    ...(notYet.length
      ? ["WHAT NEEDS A FIX FIRST", ...notYet.slice(0, 5).map((s) => `- ${s.build.name}: improve ${s.gaps.map((g) => g.name.toLowerCase()).join(", ")}`), ""]
      : []),
    "NEXT STEP",
    `Reply to this email with questions, or book a 30-minute call: ${site.bookingUrl}`,
    "",
    `${site.owner}`,
    `${site.name}`,
    `${site.url}`,
  ].join("\n");

  const li = (items: string[]) => `<ul style="padding-left:18px;margin:8px 0">${items.map((i) => `<li style="margin:4px 0">${i}</li>`).join("")}</ul>`;
  const h = (t: string) => `<h3 style="margin:22px 0 4px;font-size:15px">${escapeHtml(t)}</h3>`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:560px">
<p>Hi ${escapeHtml(first)},</p>
<p>Here are your results from the AI Readiness self-check.</p>
<p style="font-size:20px;margin:16px 0 4px"><strong>${escapeHtml(result.tier.name)}</strong> <span style="color:#555;font-size:15px">(${result.total} of ${result.max})</span></p>
<p style="margin:0">${escapeHtml(result.tier.summary)}</p>
${h("Your scores")}
${li(result.areas.map((a) => `${escapeHtml(a.name)}: <strong>${a.score} of 6</strong> (${levelWord(a.score)})`))}
${h(`Your biggest gap: ${result.weakest.name}`)}
<p style="margin:4px 0">${escapeHtml(result.weakest.firstMove)}</p>
${h("Your 4-week starter plan")}
${li(plan.map((p) => `<strong>${escapeHtml(p.week)}: ${escapeHtml(p.title)}.</strong> ${escapeHtml(p.detail)}`))}
${h("What you could automate today")}
<p style="margin:4px 0">${ready.length ? escapeHtml(ready.join(", ")) : "Nothing yet. Fix the gaps above first so automation has something solid to work from."}</p>
${h("Next step")}
<p style="margin:4px 0">Reply to this email with questions, or <a href="${escapeHtml(site.bookingUrl)}">book a 30-minute call</a>.</p>
<p style="margin-top:24px">${escapeHtml(site.owner)}<br>${escapeHtml(site.name)}<br><a href="${escapeHtml(site.url)}">${escapeHtml(site.domain)}</a></p>
</div>`;
  return { text, html };
}
