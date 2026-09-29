import type { Metadata } from "next";
import { BlueprintCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { Container, PageHeader } from "@/components/ui";
import { getBlueprints } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Blueprints",
  description: "Working reference builds for SMB AI automation: architecture, stack, governance controls, and what each system measures.",
};

export default function BlueprintsPage() {
  const blueprints = getBlueprints();
  return (
    <>
      <PageHeader
        eyebrow="Blueprints"
        title="The exact systems — architecture, stack, and controls"
        lead="Each blueprint is a working reference build. They show what we would install for you and how it is governed. They are not client results, and we label them that way."
      />
      <Container className="py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blueprints.map((b) => (
            <BlueprintCard key={b.slug} blueprint={b} />
          ))}
        </div>
      </Container>
      <CtaBand title="Want one of these running in your business?" />
    </>
  );
}
