"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { assessmentAreas, maxAreaScore, questionCount, scoreAssessment } from "@/lib/assessment";
import { ButtonLink } from "@/components/ui";

// Runs entirely in the browser. Nothing is stored or sent anywhere.
export function AssessmentTool() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answered = Object.keys(answers).length;
  const result = scoreAssessment(answers);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm text-muted">
        <p>
          {answered} of {questionCount} answered
        </p>
        {answered > 0 && (
          <button type="button" onClick={() => setAnswers({})} className="min-h-11 text-accent hover:underline">
            Start over
          </button>
        )}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(answered / questionCount) * 100}%` }} />
      </div>

      <div className="mt-8 space-y-10">
        {assessmentAreas.map((area, i) => (
          <section key={area.slug} aria-labelledby={`area-${area.slug}`}>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">Area {i + 1} of {assessmentAreas.length}</p>
            <h3 id={`area-${area.slug}`} className="mt-1 text-xl font-medium">{area.name}</h3>
            <p className="text-sm text-muted">{area.why}</p>
            <div className="mt-4 space-y-6">
              {area.questions.map((q) => (
                <fieldset key={q.id}>
                  <legend className="font-medium">{q.prompt}</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {q.options.map((o) => (
                      <label
                        key={o.label}
                        className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-line bg-surface p-3 text-sm transition hover:border-accent/40 has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent"
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={answers[q.id] === o.score}
                          onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: o.score }))}
                          className="sr-only"
                        />
                        <span aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-faint" />
                        <span>{o.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12" aria-live="polite">
        {result ? (
          <div className="glass flare-edge rounded-3xl p-8 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">Your result</p>
            <h3 className="mt-2 text-3xl font-medium">{result.tier.name}</h3>
            <p className="mt-2 text-lg">{result.tier.summary}</p>
            <p className="mt-1 text-sm text-muted">Score: {result.total} of {result.max}</p>

            <ul className="mt-6 space-y-3">
              {result.areas.map((a) => (
                <li key={a.slug}>
                  <div className="flex justify-between text-sm">
                    <span>{a.name}</span>
                    <span className="text-muted">{a.score} / {maxAreaScore}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className={`h-full rounded-full ${a.slug === result.weakest.slug ? "bg-warn" : "bg-accent"}`}
                      style={{ width: `${(a.score / maxAreaScore) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
              <p className="text-sm font-medium text-warn">Your biggest gap: {result.weakest.name}</p>
              <p className="mt-1 text-sm text-muted">{result.weakest.firstMove}</p>
            </div>
            <p className="mt-6">
              <span className="font-medium">Your next move:</span> <span className="text-muted">{result.tier.next}</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.bookingUrl}>Book an Ops Call to walk through it</ButtonLink>
            </div>
            <p className="mt-6 text-xs text-faint">
              This is a quick self-check, not a diagnosis. Your answers stay in your browser and aren&apos;t saved or sent anywhere.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">Answer all {questionCount} questions to see your result.</p>
        )}
      </div>
    </div>
  );
}
