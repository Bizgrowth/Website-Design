"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/lib/site";

// Phones only: a thumb-reach booking bar that appears once the hero is out of view.
export function MobileCtaBar() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    // Hide again near the bottom, where the page's own call-to-action and footer are.
    setShow(y > 640 && scrollYProgress.get() < 0.94);
  });

  if (pathname === "/contact") return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-bg/90 p-2 pl-4 shadow-2xl backdrop-blur-xl">
            <p className="min-w-0 flex-1 text-xs leading-tight text-muted">
              <span className="block font-semibold text-ink">30-minute ops call</span>
              Free · no pitch deck
            </p>
            <a href={site.bookingUrl} className="btn-flare inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-semibold">
              Book now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
