import Link from "next/link";
import type { ReactNode } from "react";
import { Wipe } from "@/components/interactive/Effects";
import { pillarBySlug, type PillarSlug } from "@/lib/taxonomy";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

// Pill section badge with a glowing status dot (Obsidian Flare "category super-header").
export function Eyebrow({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "flare" }) {
  return (
    <p className="badge-glow inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "flare" ? "bg-flare" : "bg-hero-accent"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Wipe>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
        </Wipe>
        {lead && <p className="mt-3 text-muted">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="hero-backdrop border-b border-line">
      <Container className="py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>}
      </Container>
    </header>
  );
}

export function Card({
  href,
  children,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const base = `block rounded-2xl border border-line bg-surface p-6 ${className}`;
  if (!href) return <div className={base}>{children}</div>;
  return (
    <Link href={href} className={`${base} transition hover:border-accent/40 hover:shadow-[0_0_30px_-5px_rgba(20,147,255,0.25)]`}>
      {children}
    </Link>
  );
}

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "ok" | "warn" }) {
  const tones = {
    neutral: "bg-surface-2 text-muted",
    accent: "bg-accent-soft text-accent",
    ok: "bg-ok-soft text-ok",
    warn: "bg-warn-soft text-warn",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function PillarTags({ pillars }: { pillars: PillarSlug[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {pillars.map((p) => (
        <Tag key={p} tone="accent">
          {pillarBySlug(p)?.name ?? p}
        </Tag>
      ))}
    </div>
  );
}

// Every demo build carries this label. Never present a reference build as a client result.
export function ReferenceBuildTag() {
  return <Tag tone="warn">Reference build</Tag>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse";
}) {
  const styles = {
    primary: "btn-flare",
    secondary: "btn-ghost border border-white/15 bg-white/[0.04] text-ink hover:bg-white/[0.08]",
    inverse: "btn-flare",
  };
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
