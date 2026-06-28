import type { SVGProps } from "react";
import { Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { MonoLabel } from "@/components/MonoLabel";
import { NAV_LINKS } from "@/lib/nav";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/contact";

// lucide-react dropped brand logos, so the social marks are inline SVGs.
function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C20.6 8.75 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: LinkedinIcon, external: true },
  { label: "GitHub", href: GITHUB_URL, Icon: GithubIcon, external: true },
  { label: "Email", href: `mailto:${EMAIL}`, Icon: Mail, external: false },
] as const;

/**
 * Site footer: brand line, the nav links repeated, social links, and a build
 * credit. Static (server component) — anchor scrolling is handled globally by
 * SmoothScrollProvider.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t bg-bg-subtle">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <a
              href="#home"
              className="font-display text-fluid-xl font-bold tracking-tight text-fg"
            >
              Ridam <span className="text-accent">Agrawal</span>
            </a>
            <p className="mt-3 text-fluid-sm text-fg-muted">
              Full-Stack Developer · Backend &amp; AI Engineer building
              production SaaS and multi-agent AI systems.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer">
            <MonoLabel className="mb-4">Navigate</MonoLabel>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="link-underline text-fluid-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <MonoLabel className="mb-4">Connect</MonoLabel>
            <ul className="flex flex-col gap-3">
              {SOCIALS.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-2 text-fluid-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border mt-12 flex flex-col items-start justify-between gap-2 border-t pt-6 text-fluid-xs text-fg-subtle sm:flex-row sm:items-center">
          <p>© {year} Ridam Agrawal. All rights reserved.</p>
          <p className="font-mono">
            Designed &amp; built with Next.js + Tailwind.
          </p>
        </div>
      </Container>
    </footer>
  );
}
