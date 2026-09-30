import { ReferenceBuildTag, SectionHeading, ButtonLink } from "@/components/ui";
import { referenceApps } from "@/lib/apps";
import { site } from "@/lib/site";

// Grid of the interactive reference apps. Links open in a new tab; they live on a separate subdomain.
export function ReferenceApps() {
  return (
    <>
      <SectionHeading
        eyebrow="Try them yourself"
        title="Eight interactive reference builds"
        lead="Click through working tools for lead follow-up, sales, onboarding, delivery, knowledge, billing, reporting, and support. They run on sample data and are reference builds, not client results."
        action={<ButtonLink href={site.appsUrl}>Open all apps</ButtonLink>}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {referenceApps.map((a) => (
          <li key={a.file}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition hover:border-accent/40 hover:shadow-[0_0_30px_-5px_rgba(20,147,255,0.25)]"
            >
              <span className="flex flex-wrap items-center gap-2">
                <ReferenceBuildTag />
              </span>
              <span className="mt-3 text-lg font-medium">{a.name}</span>
              <span className="text-xs text-faint">{a.area}</span>
              <span className="mt-2 flex-1 text-sm text-muted">{a.blurb}</span>
              <span className="mt-4 text-sm font-semibold text-accent">Open app →</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
