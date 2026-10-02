"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EmailResultsForm } from "@/components/EmailResultsForm";
import { ReadinessRadar, ScoreRing } from "@/components/ReadinessRadar";
import { ButtonLink } from "@/components/ui";
import {
  areaInsights,
  areaScoresFromAnswers,
  assessmentAreas,
  buildStatuses,
  levelWord,
  maxAreaScore,
  questionCount,
  scoreAssessment,
  starterPlan,
  summarize,
} from "@/lib/assessment";
import { site } from "@/lib/site";

type Phase = "intro" | "quiz" | "insight" | "results";

const flat = assessmentAreas.flatMap((area, areaIndex) => area.questions.map((q, qi) => ({ area, areaIndex, q, qi })));
const letters = ["A", "B", "C", "D"];
const tone = { "fix-first": "text-warn", "ready-to-pilot": "text-accent", "ready-to-scale": "text-ok" } as const;

const fade = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.28 } };

// The AI Readiness self-check as a guided, interactive experience: intro, one question at a time with a live
// readiness map, a "why this matters" moment per area, then results with a what-if explorer and starter plan.
export function AssessmentApp() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [insightFor, setInsightFor] = useState(0);
  const [whatIf, setWhatIf] = useState<Record<string, number>>({});
  const lock = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase]);

  const reset = () => {
    setAnswers({});
    setWhatIf({});
    setIdx(0);
    setPhase("intro");
  };

  // Live values for the radar while answering: each area's average so far, scaled to 0-6.
  const live = assessmentAreas.map((a) => {
    const done = a.questions.filter((q) => answers[q.id] !== undefined);
    return done.length ? (done.reduce((s, q) => s + answers[q.id], 0) / (done.length * 3)) * maxAreaScore : 0;
  });
  const answeredFlags = assessmentAreas.map((a) => a.questions.some((q) => answers[q.id] !== undefined));
  const answeredCount = Object.keys(answers).length;

  function choose(score: number) {
    if (lock.current) return;
    const item = flat[idx];
    lock.current = true;
    setAnswers((a) => ({ ...a, [item.q.id]: score }));
    window.setTimeout(() => {
      lock.current = false;
      if (item.qi === item.area.questions.length - 1) {
        setInsightFor(item.areaIndex);
        setPhase("insight");
      } else {
        setIdx(idx + 1);
      }
    }, 320);
  }

  function continueFromInsight() {
    if (insightFor === assessmentAreas.length - 1) {
      setPhase("results");
    } else {
      setIdx(flat.findIndex((f) => f.areaIndex === insightFor + 1));
      setPhase("quiz");
    }
  }

  return (
    <div ref={root} className="scroll-mt-24">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" {...fade}>
            <Intro onStart={() => setPhase("quiz")} />
          </motion.div>
        )}

        {(phase === "quiz" || phase === "insight") && (
          <motion.div key="quiz" {...fade} className="grid gap-8 md:grid-cols-[1fr_300px]">
            <div>
              <Stepper current={phase === "insight" ? insightFor : flat[idx].areaIndex} done={phase === "insight" ? insightFor : flat[idx].areaIndex - 1} />
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
                <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${(answeredCount / questionCount) * 100}%` }} />
              </div>
              <p className="mt-2 text-xs text-faint">
                {answeredCount} of {questionCount} answered
              </p>

              <AnimatePresence mode="wait">
                {phase === "quiz" ? (
                  <motion.div key={`q-${idx}`} {...fade} className="mt-6">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
                      {flat[idx].area.name} · question {flat[idx].qi + 1} of {flat[idx].area.questions.length}
                    </p>
                    <h3 className="mt-2 text-xl font-medium sm:text-2xl" id="question-prompt">
                      {flat[idx].q.prompt}
                    </h3>
                    <div role="radiogroup" aria-labelledby="question-prompt" className="mt-6 grid gap-3">
                      {flat[idx].q.options.map((o, i) => {
                        const selected = answers[flat[idx].q.id] === o.score;
                        return (
                          <button
                            key={o.label}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => choose(o.score)}
                            className={`flex min-h-14 items-center gap-3 rounded-2xl border p-4 text-left text-[15px] transition ${
                              selected ? "border-accent bg-accent-soft" : "border-line bg-surface hover:border-accent/50"
                            }`}
                          >
                            <span
                              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold ${
                                selected ? "border-accent bg-accent text-on-accent" : "border-line text-muted"
                              }`}
                            >
                              {letters[i]}
                            </span>
                            <span>{o.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-6">
                      <button type="button" onClick={() => (idx === 0 ? setPhase("intro") : setIdx(idx - 1))} className="min-h-11 text-sm text-muted hover:text-ink">
                        ← Back
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={`i-${insightFor}`} {...fade} className="mt-6">
                    <Insight areaIndex={insightFor} score={areaScoresFromAnswers(answers)[assessmentAreas[insightFor].slug]} last={insightFor === assessmentAreas.length - 1} onContinue={continueFromInsight} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <aside className="md:sticky md:top-28 md:self-start">
              <div className="rounded-2xl border border-line bg-surface p-4">
                <p className="text-sm font-medium">Your readiness map</p>
                <p className="text-xs text-muted">It fills in as you answer.</p>
                <ReadinessRadar values={live} answered={answeredFlags} className="mx-auto mt-2 w-full max-w-[260px]" />
              </div>
            </aside>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div key="results" {...fade}>
            <Results answers={answers} whatIf={whatIf} setWhatIf={setWhatIf} onReset={reset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  const gets = [
    { title: "A readiness map", body: "Five areas scored: written SOPs, mapped workflows, connected data, systems, and ownership." },
    { title: "Your biggest gap", body: "The one thing most likely to stall an AI project in your business, and the first move to fix it." },
    { title: "What you can automate now", body: "Which of our eight working reference builds your operation is ready for, and what unlocks the rest." },
    { title: "A 4-week starter plan", body: "Built from your own answers, so you know what to do on Monday." },
  ];
  return (
    <div className="glass flare-edge rounded-3xl p-8 md:p-12">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">Two minutes · ten questions</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-medium sm:text-4xl">Find out where to start, before you spend a dollar on AI</h2>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        AI doesn&apos;t fix a messy operation. It speeds it up. This check shows how organized your operation really is, what that means for AI, and what to do first.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="button" onClick={onStart} className="btn-flare inline-flex min-h-12 items-center justify-center rounded-2xl px-8 py-3 text-base font-medium">
          Start the self-check
        </button>
        <p className="text-sm text-faint">Free. Nothing is saved or sent unless you ask us to email your results.</p>
      </div>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-faint">What you get</p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {gets.map((g) => (
          <li key={g.title} className="rounded-2xl border border-line bg-surface p-4">
            <p className="font-medium">{g.title}</p>
            <p className="mt-1 text-sm text-muted">{g.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stepper({ current, done }: { current: number; done: number }) {
  return (
    <ol className="flex gap-2" aria-label="Progress by area">
      {assessmentAreas.map((a, i) => (
        <li key={a.slug} className="flex-1">
          <div className={`h-1.5 rounded-full ${i <= done ? "bg-accent" : i === current ? "bg-accent/50" : "bg-surface-2"}`} />
          <p className={`mt-1 hidden truncate text-[11px] sm:block ${i === current ? "text-ink" : "text-faint"}`}>{a.name}</p>
        </li>
      ))}
    </ol>
  );
}

function Insight({ areaIndex, score, last, onContinue }: { areaIndex: number; score: number; last: boolean; onContinue: () => void }) {
  const a = assessmentAreas[areaIndex];
  const pct = (score / maxAreaScore) * 100;
  return (
    <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">Why this matters</p>
      <h3 className="mt-2 text-2xl font-medium">{a.name}</h3>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7 }} className={`h-full rounded-full ${score <= 1 ? "bg-warn" : "bg-accent"}`} />
        </div>
        <p className="text-sm font-medium">
          {score} of {maxAreaScore} · {levelWord(score)}
        </p>
      </div>
      <p className="mt-5 text-lg">{areaInsights[a.slug]}</p>
      <p className="mt-3 text-sm text-muted">{score <= 3 ? `This is worth fixing before any tool is bought. ${a.firstMove}` : "A real strength. Protect it as your business changes."}</p>
      <button type="button" onClick={onContinue} className="btn-flare mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl px-6 py-3 text-[15px] font-medium">
        {last ? "See my results" : "Continue"}
      </button>
    </div>
  );
}

function Results({
  answers,
  whatIf,
  setWhatIf,
  onReset,
}: {
  answers: Record<string, number>;
  whatIf: Record<string, number>;
  setWhatIf: (v: Record<string, number>) => void;
  onReset: () => void;
}) {
  const result = scoreAssessment(answers);
  if (!result) return null;
  const base = Object.fromEntries(result.areas.map((a) => [a.slug, a.score]));
  const scores = { ...base, ...whatIf };
  const scenario = summarize(scores);
  const changed = Object.keys(whatIf).some((k) => whatIf[k] !== base[k]);
  const statuses = buildStatuses(scores);
  const readyCount = statuses.filter((s) => s.ready).length;
  const baseReady = buildStatuses(base).filter((s) => s.ready).length;
  const ranked = [...result.areas].sort((a, b) => a.score - b.score);
  const plan = starterPlan(result);

  const bump = (slug: string, d: number) => setWhatIf({ ...whatIf, [slug]: Math.max(0, Math.min(maxAreaScore, scores[slug] + d)) });

  return (
    <div className="space-y-12">
      {/* Headline result */}
      <section className="glass flare-edge rounded-3xl p-6 md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr_260px]">
          <div className="mx-auto md:mx-0">
            <ScoreRing value={result.total} max={result.max} label="Readiness score" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">Your result</p>
            <h3 className={`mt-1 text-3xl font-medium sm:text-4xl ${tone[result.tier.slug]}`}>{result.tier.name}</h3>
            <p className="mt-2 text-lg">{result.tier.summary}</p>
            <p className="mt-3 text-muted">
              <span className="font-medium text-ink">Your next move:</span> {result.tier.next}
            </p>
          </div>
          <ReadinessRadar values={result.areas.map((a) => a.score)} weakest={result.weakest.slug} className="mx-auto w-full max-w-[260px]" />
        </div>
        <p className="mt-6 text-sm text-muted">
          Your lowest area, <span className="font-medium text-warn">{result.weakest.name}</span>, counts as much as your total. AI stalls on the weakest link.
        </p>
      </section>

      {/* Order of operations */}
      <section>
        <h3 className="text-2xl font-medium">Your order of operations</h3>
        <p className="mt-1 max-w-2xl text-muted">Fix these in this order. The first two are where AI would stall in your business today.</p>
        <ol className="mt-5 space-y-3">
          {ranked.map((a, i) => (
            <li key={a.slug} className={`rounded-2xl border p-5 ${i < 2 ? "border-warn/40 bg-warn-soft" : "border-line bg-surface"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">
                  {i + 1}. {a.name}
                  {i < 2 && <span className="ml-2 rounded-full bg-warn px-2 py-0.5 text-[11px] font-semibold text-black">Start here</span>}
                </p>
                <p className="text-sm text-muted">
                  {a.score} of {maxAreaScore} · {levelWord(a.score)}
                </p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div className={`h-full rounded-full ${i < 2 ? "bg-warn" : "bg-accent"}`} style={{ width: `${(a.score / maxAreaScore) * 100}%` }} />
              </div>
              <p className="mt-3 text-sm text-muted">{a.why}</p>
              <p className="mt-1 text-sm">
                <span className="font-medium">First move:</span> {a.firstMove}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* What-if explorer + builds */}
      <section>
        <h3 className="text-2xl font-medium">See what organizing first unlocks</h3>
        <p className="mt-1 max-w-2xl text-muted">
          Try it: raise an area and watch which of our working reference builds become possible. This is why the order matters.
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <ul className="space-y-3">
              {result.areas.map((a) => (
                <li key={a.slug} className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 flex-1 truncate">{a.name}</span>
                  <span className="flex items-center gap-2">
                    <button type="button" aria-label={`Lower ${a.name}`} onClick={() => bump(a.slug, -1)} className="grid h-9 w-9 place-items-center rounded-lg border border-line hover:border-accent/50">
                      −
                    </button>
                    <span className={`w-12 text-center font-medium tabular-nums ${scores[a.slug] !== a.score ? "text-accent" : ""}`}>
                      {scores[a.slug]} / {maxAreaScore}
                    </span>
                    <button type="button" aria-label={`Raise ${a.name}`} onClick={() => bump(a.slug, 1)} className="grid h-9 w-9 place-items-center rounded-lg border border-line hover:border-accent/50">
                      +
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl bg-surface-2 p-3 text-sm">
              <p>
                <span className="text-muted">Scenario:</span> <span className={`font-medium ${tone[scenario.tier.slug]}`}>{scenario.tier.name}</span> · {scenario.total} of {scenario.max}
              </p>
              <p className="mt-1 text-muted">
                {readyCount} of {statuses.length} builds ready{changed && readyCount !== baseReady ? ` (${readyCount > baseReady ? "+" : ""}${readyCount - baseReady} vs. today)` : ""}
              </p>
            </div>
            {changed && (
              <button type="button" onClick={() => setWhatIf({})} className="mt-3 min-h-10 text-sm text-accent hover:underline">
                Reset to my real scores
              </button>
            )}
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {statuses.map(({ build, ready, gaps }) => (
              <li key={build.name} className={`rounded-2xl border p-4 ${ready ? "border-ok/40 bg-ok-soft" : "border-line bg-surface"}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{build.name}</p>
                  <span className={`text-xs font-semibold ${ready ? "text-ok" : "text-faint"}`}>{ready ? "✓ Ready" : "Fix first"}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{build.does}</p>
                {ready ? (
                  <a href={build.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-accent">
                    Try the reference build →
                  </a>
                ) : (
                  <p className="mt-2 text-xs text-warn">
                    Needs: {gaps.map((g) => `${g.name.toLowerCase()} ${g.have}→${g.need}`).join(", ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-xs text-faint">Reference builds run on sample data. They show what we would build, not client results.</p>
      </section>

      {/* Starter plan */}
      <section>
        <h3 className="text-2xl font-medium">Your 4-week starter plan</h3>
        <ol className="mt-5 grid gap-3 md:grid-cols-4">
          {plan.map((p) => (
            <li key={p.week} className="rounded-2xl border border-line bg-surface p-4">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">{p.week}</p>
              <p className="mt-1 font-medium">{p.title}</p>
              <p className="mt-2 text-sm text-muted">{p.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Capture + book */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
          <h3 className="text-xl font-medium">Get these results by email</h3>
          <p className="mt-1 mb-5 text-sm text-muted">Your scores, your starter plan, and what to automate first, in one email you can share with your team.</p>
          <EmailResultsForm answers={answers} />
        </div>
        <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
          <h3 className="text-xl font-medium">Want help with the first two?</h3>
          <p className="mt-2 text-muted">
            The AI Ops Diagnostic takes your top three workflows, sets a baseline, and gives you a 90-day plan. It&apos;s a two-week fixed-scope project, and the best way to turn this score into action.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href={site.bookingUrl}>Book an Ops Call</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Send a message
            </ButtonLink>
          </div>
          <p className="mt-5 text-xs text-faint">
            This is a quick self-check, not a diagnosis.{" "}
            <button type="button" onClick={onReset} className="text-accent underline">
              Start over
            </button>
            {" · "}
            <Link href="/privacy" className="underline">
              Privacy
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
