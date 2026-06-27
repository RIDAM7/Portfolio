import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import {
  Container,
  GradientText,
  MagneticButton,
  MonoLabel,
  RevealOnScroll,
  Section,
} from "@/components";

// Hidden internal preview of the design system. Not linked from the site.
export const metadata: Metadata = {
  title: "Styleguide — Internal",
  robots: { index: false, follow: false },
};

const surfaces = [
  { name: "--bg", className: "bg-bg" },
  { name: "--bg-subtle", className: "bg-bg-subtle" },
  { name: "--bg-elevated", className: "bg-bg-elevated" },
  { name: "--bg-overlay", className: "bg-bg-overlay" },
];

const accents = [
  { name: "--accent", className: "bg-accent" },
  { name: "--accent-bright", className: "bg-accent-bright" },
  { name: "--accent-2", className: "bg-accent-2" },
];

const text = [
  { name: "--fg", className: "text-fg", sample: "Primary text" },
  { name: "--fg-muted", className: "text-fg-muted", sample: "Muted text" },
  { name: "--fg-subtle", className: "text-fg-subtle", sample: "Subtle text" },
];

const typeScale = [
  { token: "fluid-display", cls: "text-fluid-display font-display" },
  { token: "fluid-3xl", cls: "text-fluid-3xl font-display" },
  { token: "fluid-2xl", cls: "text-fluid-2xl font-display" },
  { token: "fluid-xl", cls: "text-fluid-xl" },
  { token: "fluid-lg", cls: "text-fluid-lg" },
  { token: "fluid-base", cls: "text-fluid-base" },
  { token: "fluid-sm", cls: "text-fluid-sm" },
];

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-20 rounded-md border border-strong ${className}`}
        aria-hidden
      />
      <span className="font-mono text-fluid-xs text-fg-subtle">{name}</span>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-bg pb-24">
      {/* Gradient-mesh banner */}
      <header className="gradient-mesh border-b border-strong">
        <Container className="py-20">
          <MonoLabel index="00">Styleguide</MonoLabel>
          <h1 className="mt-4 font-display text-fluid-display font-bold leading-[0.95] tracking-tight">
            Engineered <GradientText>Dark</GradientText>
          </h1>
          <p className="mt-4 max-w-xl text-fluid-lg text-fg-muted">
            Internal preview of the Phase 1 design tokens and primitives. Violet
            leads, blue is the gradient partner, white carries the words.
          </p>
        </Container>
      </header>

      {/* Surfaces */}
      <Section index="01" label="Surfaces" title="Color tokens">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {surfaces.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {accents.map((a) => (
            <Swatch key={a.name} {...a} />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-2">
          {text.map((t) => (
            <p key={t.name} className={`text-fluid-lg ${t.className}`}>
              {t.sample}{" "}
              <span className="font-mono text-fluid-xs text-fg-subtle">
                {t.name}
              </span>
            </p>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section index="02" label="Typography" title="Fluid type scale">
        <div className="flex flex-col gap-5">
          {typeScale.map((t) => (
            <div key={t.token} className="flex items-baseline gap-6">
              <span className="w-32 shrink-0 font-mono text-fluid-xs text-fg-subtle">
                {t.token}
              </span>
              <span className={t.cls}>The quick brown fox</span>
            </div>
          ))}
          <div className="flex items-baseline gap-6">
            <span className="w-32 shrink-0 font-mono text-fluid-xs text-fg-subtle">
              font-mono
            </span>
            <span className="font-mono text-fluid-sm">01 / EXPERIENCE</span>
          </div>
        </div>
      </Section>

      {/* Primitives */}
      <Section index="03" label="Primitives" title="Components & motion">
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <MonoLabel>Buttons (magnetic)</MonoLabel>
            <div className="flex flex-wrap gap-4">
              <MagneticButton href="#">
                View work <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton variant="ghost" href="#">
                Get in touch
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <MonoLabel>Gradient text</MonoLabel>
            <p className="font-display text-fluid-2xl font-semibold">
              Building <GradientText>production</GradientText> systems
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <MonoLabel>Card surface + glow</MonoLabel>
            <div className="rounded-lg border border-strong bg-bg-elevated p-6 shadow-glow">
              <p className="text-fluid-base text-fg">Elevated card</p>
              <p className="mt-1 text-fluid-sm text-fg-muted">
                shadow-glow, border-strong, rounded-lg
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <MonoLabel>Grid backdrop</MonoLabel>
            <div className="grid-backdrop h-32 rounded-lg border border-strong" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          <MonoLabel>RevealOnScroll (scroll to trigger)</MonoLabel>
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="rounded-md border border-strong bg-bg-subtle p-4 text-fluid-sm text-fg-muted">
                  Reveals on enter — staggered by {i * 100}ms
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
