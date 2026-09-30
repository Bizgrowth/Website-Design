import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { pillars, services } from "@/lib/taxonomy";
import { ContactDetails } from "./ContactDetails";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="grid gap-8 py-12 pb-[max(3rem,env(safe-area-inset-bottom))] sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand/emblem.png" alt="" width={56} height={56} className="h-14 w-14 drop-shadow-[0_0_12px_rgba(0,153,255,0.45)]" />
            <span>
              <span className="block whitespace-nowrap font-[family-name:var(--font-display)] text-lg font-semibold leading-tight">{site.name}</span>
              <span className="mt-1 block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.04em] text-hero-accent">{site.slogan}</span>
            </span>
          </Link>
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
          <ContactDetails className="mt-4" />
        </div>
        <FooterCol title="AI Hub" links={pillars.map((p) => ({ href: `/hub/${p.slug}`, label: p.name }))} />
        <FooterCol title="Services" links={services.map((s) => ({ href: `/services/${s.slug}`, label: s.name }))} />
        <FooterCol
          title="Company"
          links={[
            { href: "/track-record", label: "Track Record" },
            { href: "/method", label: "Earned Autonomy Method" },
            { href: "/about", label: "About Daniel" },
            { href: "/contact", label: "Contact" },
          ]}
        />
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. Blueprints are labeled reference builds unless stated otherwise.</p>
        <p>
          Jacksonville, FL · Serving clients remotely ·{" "}
          <Link href="/privacy" className="underline hover:text-ink">Privacy Policy</Link>
        </p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-faint">{title}</p>
      <ul className="mt-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-10 items-center text-muted hover:text-ink">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
