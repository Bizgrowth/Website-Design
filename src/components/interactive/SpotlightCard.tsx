"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

// A card with a soft highlight that follows the cursor.
export function SpotlightCard({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Link
      href={href}
      onMouseMove={onMove}
      className={`spotlight block h-full rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg ${className}`}
    >
      {children}
    </Link>
  );
}
