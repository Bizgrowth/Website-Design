import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { Atmosphere } from "@/components/interactive/Effects";
import { MotionProvider, ScrollProgress } from "@/components/interactive/MotionProvider";
import { ChatWidget } from "@/components/ChatWidget";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

// Fusion AI template type system: General Sans (display), Inter (body), Fragment Mono (labels).
const generalSans = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../fonts/GeneralSans-400.woff2", weight: "400" },
    { path: "../fonts/GeneralSans-500.woff2", weight: "500" },
    { path: "../fonts/GeneralSans-600.woff2", weight: "600" },
    { path: "../fonts/GeneralSans-700.woff2", weight: "700" },
  ],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-label",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AI Operations Consulting for SMBs | Fix the Operation, Then Automate It",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // "./" makes every page declare its own address as the preferred (canonical) one.
  alternates: { canonical: "./" },
  openGraph: { siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image" },
};

// Structured data (JSON-LD): tells Google who the business is and which profiles belong to it.
// Only facts already shown on the site are used here.
const brandProfiles = site.socials.filter((s) => "brand" in s && s.brand).map((s) => s.href);
const personProfiles = site.socials.filter((s) => !("brand" in s && s.brand)).map((s) => s.href);
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/emblem.png`,
      email: site.email,
      telephone: site.phone,
      founder: { "@id": `${site.url}/#daniel-schley` },
      sameAs: brandProfiles,
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#daniel-schley`,
      name: site.owner,
      jobTitle: "Founder",
      worksFor: { "@id": `${site.url}/#organization` },
      url: `${site.url}/about`,
      sameAs: personProfiles,
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${generalSans.variable} ${inter.variable} ${fragmentMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {/* Without JavaScript, show content that would otherwise animate in. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>
          <Atmosphere />
          <ScrollProgress />
          <SiteHeader />
          <main className="flex-1 pt-[calc(5rem+env(safe-area-inset-top))]">{children}</main>
          <SiteFooter />
          <MobileCtaBar />
          <ChatWidget />
        </MotionProvider>
      </body>
    </html>
  );
}
