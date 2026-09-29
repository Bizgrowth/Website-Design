import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 20-minute operations call with Daniel Schley.",
};

// TODO(Daniel): embed your booking widget here and point site.bookingUrl at it.
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book a 20-minute operations call"
        lead="Bring one workflow that eats your team's time. We'll look at whether AI is the right fix and what it would take."
      />
      <Container className="py-14">
        <div className="max-w-xl rounded-2xl border border-line bg-surface p-6">
          <p className="text-muted">Booking calendar coming soon. In the meantime, connect on LinkedIn:</p>
          <a href={site.linkedin} className="mt-4 inline-block font-semibold text-accent">
            linkedin.com/in/danielschley →
          </a>
        </div>
      </Container>
    </>
  );
}
