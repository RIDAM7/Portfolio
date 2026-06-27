import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

// Display font is Clash Display (Fontshare). It is not on Google Fonts, so it
// is loaded via the Fontshare CDN <link> below and exposed as --font-display.

export const metadata: Metadata = {
  title: "Ridam Agrawal — Full-Stack Developer | Backend & AI Engineer",
  description:
    "Portfolio of Ridam Agrawal — Full-Stack Developer, Backend & AI Engineer building production SaaS and multi-agent AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin=""
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
          rel="stylesheet"
        />
        <style>{`:root { --font-display: "Clash Display", ${"var(--font-sans)"}, sans-serif; }`}</style>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
