import Link from "next/link";
import { site } from "@/lib/site";
import { pillars, services } from "@/lib/taxonomy";
import { ContactDetails } from "./ContactDetails";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-bold">{site.name}</p>
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
        <p>Jacksonville, FL · Serving clients remotely</p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-faint">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-muted hover:text-ink">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
