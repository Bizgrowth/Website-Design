import { site } from "@/lib/site";
import { ButtonLink, Container } from "./ui";

export function CtaBand({
  title = "Find the three workflows worth automating first.",
  lead = "A 20-minute operations call. No pitch deck — we look at where your team's hours go and whether AI is the right fix.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="bg-navy text-white">
      <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-3 text-white/70">{lead}</p>
        </div>
        <ButtonLink href={site.bookingUrl} variant="inverse">
          Book an Ops Call
        </ButtonLink>
      </Container>
    </section>
  );
}
