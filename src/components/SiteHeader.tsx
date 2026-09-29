import Link from "next/link";
import { nav, site } from "@/lib/site";
import { ButtonLink, Container } from "./ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <Container className="flex h-16 items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-navy text-[11px] font-bold text-white">
            AI
          </span>
          <span>{site.name}</span>
        </Link>
        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden sm:block">
          <ButtonLink href={site.bookingUrl}>Book an Ops Call</ButtonLink>
        </div>
      </Container>
      {/* Compact nav for small screens: horizontally scrollable row. */}
      <nav aria-label="Main mobile" className="overflow-x-auto border-t border-line lg:hidden">
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
