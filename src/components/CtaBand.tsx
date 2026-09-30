import { site } from "@/lib/site";
import { CircleReveal } from "./interactive/Effects";
import { LightStreaks } from "./LightStreaks";
import { ButtonLink, Container } from "./ui";

export function CtaBand({
  title = "Find the three workflows worth automating first.",
  lead = "A 20-minute operations call. No pitch deck — we look at where your team's hours go and whether AI is the right fix.",
}: {
  title?: string;
  lead?: string;
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
        <div className="relative">
          <ButtonLink href={site.bookingUrl}>Book an Ops Call →</ButtonLink>
        </div>
        </div>
        </CircleReveal>
      </Container>
    </section>
  );
}
