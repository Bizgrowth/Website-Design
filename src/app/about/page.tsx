import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Daniel Schley",
  description: "Operator, former COO, and founder of AI Operations Expert.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Daniel Schley"
        lead="Founder of AI Operations Expert. Twenty years as an operating executive before AI — which is exactly why the AI works."
      />
      <Container className="py-14">
        <div className="prose">
          <p>
            I spent two decades running operations: building a workers&apos; compensation rehab network from zero to $265M,
            leading an exit at 12X EBITDA, and serving as COO of a $1B real estate platform. Managed care taught me that
            the right answer is a system — tiered approvals, clear thresholds, audit trails, and quality measured every month.
          </p>
          <p>
            AI needs exactly that system, and most SMBs don&apos;t have it. They buy tools, run a pilot, and stall because no one
            owns the workflow, no one measured the before, and no one planned for mistakes.
          </p>
          <p>
            This hub is where I share what works: blueprints you can inspect, daily updates in plain language, and a method —
            Earned Autonomy — that lets AI take on more work only as it proves itself.
          </p>
          <p>
            <Link href="/track-record">See the full track record</Link> or <Link href="/contact">get in touch</Link>.
          </p>
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
