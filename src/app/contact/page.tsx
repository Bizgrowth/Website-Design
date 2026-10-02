import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import Script from "next/script";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";
import { Portrait } from "@/components/Portrait";
import { Container, Eyebrow, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 30-minute operations call with Daniel Schley, or send a message.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Contact"
        title="Book a 30-minute operations call"
        lead="Bring one workflow that eats your team's time. We'll look at whether AI is the right fix and what it would take. Prefer to write? Use the message form below the calendar."
      />
      <Container className="grid gap-6 py-10 sm:py-14 lg:grid-cols-[300px_1fr] lg:gap-8">
        <aside className="order-2 space-y-5 lg:order-1">
          <Portrait size={300} className="hidden h-auto w-full lg:block" />
          <div className="rounded-2xl border border-line bg-surface p-5">
            <Eyebrow>Reach Daniel directly</Eyebrow>
            <ContactDetails className="mt-3" />
          </div>
        </aside>
        <div className="order-1 space-y-6 lg:order-2">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
          {/* Shimmer placeholder until the Calendly iframe paints over it */}
          <div aria-hidden className="absolute inset-0 space-y-4 p-8">
            <div className="skeleton h-8 w-1/2 rounded-lg" />
            <div className="skeleton h-4 w-1/3 rounded" />
            <div className="skeleton mt-8 h-72 w-full rounded-xl" />
            <div className="skeleton h-12 w-2/3 rounded-lg" />
          </div>
          <div
            className="calendly-inline-widget relative"
            data-url={site.bookingUrl}
            style={{ minWidth: 320, height: 720 }}
          />
          <noscript>
            <p className="p-6">
              <a href={site.bookingUrl} className="font-semibold text-accent">Open the booking calendar →</a>
            </p>
          </noscript>
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <Eyebrow>Prefer to write?</Eyebrow>
          <h2 className="mt-4 text-2xl font-medium">Send a message</h2>
          <p className="mb-6 mt-1 text-sm text-muted">I reply within one business day.</p>
          <ContactForm />
        </div>
        </div>
      </Container>
    </PageTransition>
  );
}
