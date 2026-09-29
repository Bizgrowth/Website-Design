import { Reveal } from "@/components/interactive/Reveal";
import { StackExplorer } from "@/components/interactive/StackExplorer";
import { StackSteps } from "@/components/interactive/StackSteps";
import { Container } from "@/components/ui";
import { getBlueprints } from "@/lib/content";
import { categories, integrations } from "@/lib/integrations";

const iconOf = (name: string) => integrations.find((i) => i.name === name)!.icon;

// Dark "connected stack" section: tool explorer plus the three-step cards.
export function ConnectedStack() {
  const blueprintTitles = Object.fromEntries(getBlueprints().map((b) => [b.slug, b.title]));
  return (
    <section className="hero-backdrop bg-navy py-16 text-white sm:py-24">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-hero-accent">Your tool stack, connected</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">
            AI that works inside the tools you already pay for
          </h2>
          <p className="mt-3 max-w-2xl text-white/60">
            Pick a tool to see what we automate with it and which blueprints use it. No rip-and-replace — the AI Ops
            layer sits between your systems and your team.
          </p>
        </Reveal>
        <div className="mt-10">
          <StackExplorer integrations={integrations} categories={categories} blueprintTitles={blueprintTitles} />
        </div>
        <div className="mt-16">
          <StackSteps
            icons={{
              gmail: iconOf("Gmail"),
              quickbooks: iconOf("QuickBooks"),
              sheets: iconOf("Google Sheets"),
              hubspot: iconOf("HubSpot"),
            }}
          />
        </div>
      </Container>
    </section>
  );
}
