import { formatDate, type Blueprint, type Guide, type Update } from "@/lib/content";
import { Morph } from "./PageTransition";
import { Card, PillarTags, ReferenceBuildTag, Tag } from "./ui";

export function BlueprintCard({ blueprint }: { blueprint: Blueprint }) {
  return (
    <Card href={`/blueprints/${blueprint.slug}`} className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-1.5">
        <ReferenceBuildTag />
        <Tag>{blueprint.industry}</Tag>
      </div>
      <Morph name={`bp-${blueprint.slug}`}>
        <h3 className="mt-4 text-lg font-bold">{blueprint.title}</h3>
      </Morph>
      <p className="mt-2 flex-1 text-sm text-muted">{blueprint.summary}</p>
      <p className="mt-4 font-mono text-xs text-faint">{blueprint.stack.join(" · ")}</p>
    </Card>
  );
}

export function UpdateCard({ update }: { update: Update }) {
  return (
    <Card href={`/updates/${update.slug}`} className="flex h-full flex-col">
      <time dateTime={update.date} className="text-xs font-semibold uppercase tracking-wider text-faint">
        {formatDate(update.date)}
      </time>
      <h3 className="mt-2 text-lg font-bold">{update.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{update.summary}</p>
      <div className="mt-4">
        <PillarTags pillars={update.pillars} />
      </div>
    </Card>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Card href={`/guides/${guide.slug}`} className="flex h-full flex-col">
      <p className="text-xs font-semibold uppercase tracking-wider text-faint">
        Guide · {guide.readingMinutes} min read
      </p>
      <h3 className="mt-2 text-lg font-bold">{guide.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{guide.summary}</p>
      <div className="mt-4">
        <PillarTags pillars={guide.pillars} />
      </div>
    </Card>
  );
}
