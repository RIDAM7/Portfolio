import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import {
  SmoothScrollProvider,
  Navbar,
  ScrollProgress,
  BackToTop,
  Footer,
  Preloader,
} from "@/components";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/contact";

// Body font.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Mono font — used for engineering micro-labels (e.g. "01 / EXPERIENCE").
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// Display font — Clash Display, self-hosted (next/font/local) so it isn't a
// render-blocking third-party request and there's no FOUT. woff2 files live in
// ./fonts; the weights match the Fontshare set we previously used (500/600/700).
const clashDisplay = localFont({
  src: [
    {
      path: "./fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = "Ridam Agrawal — Full-Stack Developer | Backend & AI Engineer";
const description =
  "Portfolio of Ridam Agrawal — Full-Stack Developer, Backend & AI Engineer building production SaaS and multi-agent AI systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Ridam Agrawal",
  },
  description,
  keywords: [
    "Ridam Agrawal",
    "Full-Stack Developer",
    "Backend Engineer",
    "AI Engineer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "RAG",
    "multi-agent AI",
    "SaaS",
    "portfolio",
  ],
  authors: [{ name: "Ridam Agrawal", url: SITE_URL }],
  creator: "Ridam Agrawal",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ridam Agrawal",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    // creator: "@yourhandle", // optional — add your X/Twitter handle here.
  },
};

// Person structured data so search engines understand who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ridam Agrawal",
  jobTitle: "Full-Stack Developer, Backend & AI Engineer",
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  sameAs: [LINKEDIN_URL, GITHUB_URL],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${clashDisplay.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Preloader />
        <div className="grain" aria-hidden />
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-bg-elevated focus:px-4 focus:py-2 focus:text-fg"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </SmoothScrollProvider>
        {/* Vercel Analytics + Web Vitals. Script-injected after load, so they
            stay out of the critical path. Enable Analytics in the Vercel
            dashboard for data to flow. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
