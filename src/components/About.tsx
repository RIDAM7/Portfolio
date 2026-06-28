import { Section } from "@/components/Section";
import { GradientText } from "@/components/GradientText";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Chip } from "@/components/Chip";
import { StatCard, type Stat } from "@/components/StatCard";

// All grounded in real work — see plan.md "Headline metrics".
const STATS: Stat[] = [
  { value: 350, suffix: "K+", label: "Users migrated" },
  { value: 20, suffix: "+", label: "AI agents orchestrated" },
  { value: 3, suffix: "", label: "LLM providers integrated" },
  { value: 30, suffix: "K+", label: "Community members served" },
];

// Focus areas — real, load-bearing work, not buzzwords.
const FOCUS = [
  "Backend & APIs",
  "Multi-agent AI",
  "System Design",
  "Full-stack",
];

/**
 * About section: a short first-person narrative, a status line, focus chips, and
 * the animated stat counters. Server component — only the StatCard interaction
 * and the CountUp numbers inside it are client.
 */
export function About() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      title={
        <>
          Self-taught engineer, <GradientText>production mindset</GradientText>.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Narrative — staggered top-down: medallion -> bio -> chips -> education. */}
        <div className="flex flex-col gap-6">
          <RevealOnScroll className="flex flex-col gap-4">
            {/* Currently — edit this line when the focus changes. */}
            <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-strong bg-bg-elevated px-3.5 py-1.5 font-mono text-fluid-xs text-fg-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Currently building multi-agent AI systems at MoonPhase Solutions.
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08} className="flex flex-col gap-5">
            <p className="text-fluid-base text-fg-muted">
              I&apos;m a{" "}
              <span className="text-accent-bright">self-taught</span> developer
              with a BBA background and a strong foundation in backend and system
              design. What began as curiosity grew into a full-time engineering
              career building real products people rely on.
            </p>
            <p className="text-fluid-base text-fg-muted">
              Today I work across the stack — designing PostgreSQL data models and
              REST APIs, orchestrating{" "}
              <span className="text-accent-bright">multi-agent AI</span> and RAG
              pipelines, and shipping polished Next.js interfaces. I like owning
              features <span className="text-accent-bright">end to end</span>,
              from the first schema to the last pixel.
            </p>
          </RevealOnScroll>

          {/* Focus-area chips */}
          <RevealOnScroll delay={0.16}>
            <ul className="flex flex-wrap gap-2">
              {FOCUS.map((area) => (
                <li key={area}>
                  <Chip variant="accent">{area}</Chip>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Education — a subtle mono footnote; context, not the focus. */}
          <RevealOnScroll delay={0.22}>
            <p className="font-mono text-fluid-xs uppercase tracking-[0.15em] text-fg-subtle">
              Education — BBA · IIPS, DAVV, Indore · 2023–2026
            </p>
          </RevealOnScroll>
        </div>

        {/* Stat counters */}
        <RevealOnScroll delay={0.1}>
          <ul className="grid grid-cols-2 gap-4 sm:gap-6">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
