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

// TODO(Phase 1): add the display font (Clash Display vs Satoshi — to be chosen)
// and expose it as `--font-display`.

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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
