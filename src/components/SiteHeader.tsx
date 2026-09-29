import Link from "next/link";
import { nav, site } from "@/lib/site";
import { ButtonLink, Container } from "./ui";

export function SiteHeader() {
  return (
    <header className="sticky top-3 z-50 px-4 sm:px-6">
      <div className="glass mx-auto flex h-16 max-w-6xl items-center gap-6 rounded-2xl px-5 shadow-2xl">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-bold tracking-tight">
          <span className="orb-glow grid h-8 w-8 place-items-center rounded-full">
            <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
          </span>
          <span>{site.name}</span>
        </Link>
        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden sm:block">
          <ButtonLink href={site.bookingUrl}>Book an Ops Call</ButtonLink>
        </div>
      </div>
      {/* Compact nav for small screens: horizontally scrollable row. */}
      <nav aria-label="Main mobile" className="glass mx-auto mt-2 max-w-6xl overflow-x-auto rounded-2xl lg:hidden">
        <Container className="flex gap-1 py-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted hover:bg-surface-2"
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  );
}
