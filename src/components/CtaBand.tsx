import Link from "next/link";
import { site } from "@/lib/site";
import { CircleReveal } from "./interactive/Effects";
import { LightStreaks } from "./LightStreaks";
import { ButtonLink, Container } from "./ui";

export function CtaBand({
  title = "Find out what's ready to automate and what needs fixing first.",
  lead = "A 30-minute operations call. We look at where your team's hours go, what's written down, and whether AI is the right fix yet. If it isn't, I'll tell you what to do first.",
  secondary,
}: {
  title?: string;
  lead?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="py-16">
      <Container>
        <CircleReveal>
        <div className="glass flare-edge relative flex flex-col gap-6 overflow-hidden rounded-3xl p-10 md:flex-row md:items-center md:justify-between md:p-14">
        <LightStreaks intensity={0.9} />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-medium sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted">{lead}</p>
        </div>
        <div className="relative flex flex-col items-start gap-3 md:items-end">
          <ButtonLink href={site.bookingUrl}>Book a 30-minute ops call</ButtonLink>
          {secondary && (
            <Link href={secondary.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-accent">
              {secondary.label}
            </Link>
          )}
        </div>
        </div>
        </CircleReveal>
      </Container>
    </section>
  );
}
