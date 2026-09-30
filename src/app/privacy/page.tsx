import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles information from visitors, the AI chat, and booking requests.`,
};

const updated = "September 30, 2026";

export default function PrivacyPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        lead={`How ${site.name} handles your information. Last updated ${updated}.`}
      />
      <Container className="py-14">
        <article className="prose max-w-3xl">
          <h2>Who we are</h2>
          <p>
            {site.name} is an AI operations consulting business run by {site.owner} in Jacksonville, Florida. This site is {site.url}. If you
            have a question about this policy, email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>What you tell the AI chat.</strong> Messages you type into the AI Solutions Guide. If you choose to share your name,
              email address, company, and what you need help with, we receive those details and email them to {site.owner}.
            </li>
            <li>
              <strong>Booking details.</strong> If you book a call through our scheduling calendar, the information you enter (such as your name,
              email, and notes) is collected by the scheduling provider and shared with us.
            </li>
            <li>
              <strong>Emails you send us.</strong> If you email us or reply to us, we keep that correspondence.
            </li>
            <li>
              <strong>Basic technical information.</strong> Like most websites, our hosting provider records standard server logs, such as your IP
              address, browser type, the pages requested, and the time of the request. We use this to keep the site running and secure.
            </li>
          </ul>
          <p>
            The AI Readiness self-check on our site runs entirely in your browser. Your answers are not sent to us or stored by us.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To answer your questions and respond to your requests.</li>
            <li>To follow up about services you asked about, and to schedule and prepare for calls.</li>
            <li>To keep the site secure and working, and to improve the chat and the site&apos;s content.</li>
          </ul>
          <p>We do not sell your personal information, and we do not use it for advertising.</p>

          <h2>About the AI chat</h2>
          <p>
            The AI Solutions Guide is an artificial intelligence assistant, not a person. Its answers are generated automatically, can be
            wrong or out of date, and are general information, not legal, tax, financial, or medical advice. Please do not enter passwords,
            payment details, government ID numbers, or health or account information into the chat.
          </p>
          <p>
            To answer you, the text of your conversation is sent to our AI provider, which generates the reply. When you ask about recent AI
            news, the assistant may search a list of trusted public websites. Contact details are only sent to {site.owner} after you clearly
            agree in the chat.
          </p>

          <h2>Who we share information with</h2>
          <p>We use service providers to run the site. They handle information only to provide their service to us:</p>
          <ul>
            <li>Website hosting (Vercel).</li>
            <li>AI processing for the chat (Anthropic).</li>
            <li>Email delivery of chat leads to us (Resend) and email hosting (Hostinger).</li>
            <li>Call scheduling (Calendly).</li>
          </ul>
          <p>
            We may also disclose information if the law requires it, or to protect the rights and safety of our business and others. If the business
            is ever sold or reorganized, information may transfer to the new owner.
          </p>

          <h2>Cookies</h2>
          <p>
            We do not use advertising or analytics cookies, and we do not run tracking pixels. Our site does not set cookies of its own. The
            booking calendar on our Contact page is provided by Calendly, which may set its own cookies when that page loads. You can block or
            delete cookies in your browser settings.
          </p>

          <h2>How long we keep information</h2>
          <p>
            We keep chat leads, booking details, and emails for as long as we need them to respond to you, provide services, and keep
            ordinary business records. You can ask us to delete your information at any time (see below).
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You can ask us to tell you what information we hold about you, to correct it, or to delete it, and you can ask us to stop contacting
            you. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within a reasonable time. Depending on where you
            live, you may have additional legal rights, which we will honor.
          </p>

          <h2>Security</h2>
          <p>
            We use reputable providers and reasonable safeguards, but no method of sending or storing information online is completely secure.
          </p>

          <h2>Children</h2>
          <p>This site is meant for business owners and professionals. It is not directed to children under 13, and we do not knowingly collect their information.</p>

          <h2>Third-party sites</h2>
          <p>Our pages link to other sites, including sources cited in our articles. Their privacy practices are their own.</p>

          <h2>Changes to this policy</h2>
          <p>We may update this policy. The date at the top shows when it last changed.</p>

          <h2>Contact</h2>
          <p>
            {site.name}, Jacksonville, FL. Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
            <a href={site.phoneHref}>{site.phone}</a>.
          </p>
        </article>
      </Container>
    </PageTransition>
  );
}
