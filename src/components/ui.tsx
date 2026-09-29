import Link from "next/link";
import type { ReactNode } from "react";
import { pillarBySlug, type PillarSlug } from "@/lib/taxonomy";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">{children}</p>
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
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        {lead && <p className="mt-3 text-muted">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="py-12 sm:py-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-5xl">{title}</h1>
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
    <Link href={href} className={`${base} transition hover:border-accent hover:shadow-sm`}>
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
    primary: "bg-accent text-on-accent hover:opacity-90",
    secondary: "border border-line bg-surface text-ink hover:border-accent",
    inverse: "bg-white text-navy hover:opacity-90",
  };
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
