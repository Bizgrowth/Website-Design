import type { Metadata } from "next";
import Script from "next/script";
import { ContactDetails } from "@/components/ContactDetails";
import { Portrait } from "@/components/Portrait";
import { Container, Eyebrow, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 30-minute operations call with Daniel Schley.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book a 30-minute operations call"
        lead="Bring one workflow that eats your team's time. We'll look at whether AI is the right fix and what it would take."
      />
      <Container className="grid gap-8 py-14 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-5">
          <Portrait size={300} />
          <div className="rounded-2xl border border-line bg-surface p-5">
            <Eyebrow>Reach Daniel directly</Eyebrow>
            <ContactDetails className="mt-3" />
          </div>
        </aside>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <div
            className="calendly-inline-widget"
            data-url={`${site.bookingUrl}?hide_gdpr_banner=1`}
            style={{ minWidth: 320, height: 720 }}
          />
          <noscript>
            <p className="p-6">
              <a href={site.bookingUrl} className="font-semibold text-accent">Open the booking calendar →</a>
            </p>
          </noscript>
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        </div>
      </Container>
    </>
  );
}
