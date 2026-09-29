"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ButtonLink } from "./ui";

// Smart header: clear at the top of the page, turns into solid glass once you
// scroll, slides away while scrolling down and returns on the way back up.
export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide only after the hero, and only when moving down with intent.
    if (y > 240 && y - prev > 4) setHidden(true);
    else if (prev - y > 4 || y < 240) setHidden(false);
  });

  // Close the mobile menu on navigation (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }
  // Lock page scroll while the menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        style={{ viewTransitionName: "site-header" }}
        animate={{ y: hidden && !menuOpen ? "-130%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-50 px-3 sm:px-6"
      >
        <div
          className={`mx-auto flex h-16 max-w-6xl items-center gap-3 rounded-2xl border px-3 sm:gap-6 sm:px-5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
            scrolled || menuOpen
              ? "border-line bg-bg/85 shadow-2xl backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="group flex min-h-11 min-w-0 shrink items-center gap-2.5 font-bold tracking-tight">
            <span className="orb-glow grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110">
              <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
            </span>
            <span className="truncate">{site.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden flex-1 items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`nav-link relative flex min-h-11 items-center px-2.5 text-sm font-medium xl:px-3 transition-colors ${
                  isActive(item.href) ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden sm:block">
            <ButtonLink href={site.bookingUrl}>Book an Ops Call</ButtonLink>
          </div>

          {/* Hamburger that morphs into an X */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 sm:ml-0 lg:hidden"
          >
            {[-6, 0, 6].map((offset, i) => (
              <motion.span
                key={i}
                className="absolute h-0.5 w-5 rounded-full bg-ink"
                initial={false}
                animate={
                  menuOpen
                    ? { y: 0, rotate: i === 0 ? 45 : i === 2 ? -45 : 0, opacity: i === 1 ? 0 : 1 }
                    : { y: offset, rotate: 0, opacity: 1 }
                }
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay menu: fades in, links cascade */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg/95 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto max-w-md">
              <ul className="space-y-1">
                {[{ href: "/", label: "Home" }, ...nav, { href: "/about", label: "About Daniel" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block border-b border-line py-4 text-2xl font-semibold ${
                        (item.href === "/" ? pathname === "/" : isActive(item.href)) ? "text-ink" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-8">
                <ButtonLink href={site.bookingUrl}>Book an Ops Call</ButtonLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
