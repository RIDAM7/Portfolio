import { Section } from "@/components/Section";
import { GradientText } from "@/components/GradientText";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { CountUp } from "@/components/CountUp";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

// All grounded in real work — see plan.md "Headline metrics".
const STATS: Stat[] = [
  { value: 350, suffix: "K+", label: "Users migrated" },
  { value: 20, suffix: "+", label: "AI agents orchestrated" },
  { value: 3, suffix: "", label: "LLM providers integrated" },
  { value: 30, suffix: "K+", label: "Community members served" },
];

/**
 * About section: a short first-person narrative plus the animated stat counters
 * (the centerpiece). Server component — only the CountUp numbers are client.
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
        {/* Narrative */}
        <RevealOnScroll className="flex flex-col gap-5">
          {/* TODO: drop in a real portrait here; monogram tile is a placeholder. */}
          <div
            aria-hidden
            className="grid h-14 w-14 place-items-center rounded-lg border border-strong bg-bg-elevated font-display text-fluid-lg font-bold tracking-tight text-fg shadow-glow"
          >
            R<span className="text-accent">A</span>
          </div>
          <p className="text-fluid-base text-fg-muted">
            I&apos;m a self-taught developer with a BBA background and a strong
            foundation in backend and system design. What began as curiosity
            grew into a full-time engineering career building real products
            people rely on.
          </p>
          <p className="text-fluid-base text-fg-muted">
            Today I work across the stack — designing PostgreSQL data models and
            REST APIs, orchestrating multi-agent AI and RAG pipelines, and
            shipping polished Next.js interfaces. I like owning features end to
            end, from the first schema to the last pixel.
          </p>
        </RevealOnScroll>

        {/* Stat counters */}
        <RevealOnScroll delay={0.1}>
          <ul className="grid grid-cols-2 gap-4 sm:gap-6">
            {STATS.map((stat) => (
              <li
                key={stat.label}
                className="border-border rounded-lg border bg-bg-elevated p-5 transition-colors hover:border-strong sm:p-6"
              >
                <div className="font-display text-fluid-3xl font-bold leading-none tracking-tight">
                  <GradientText>
                    <CountUp
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </GradientText>
                </div>
                <div className="mt-3 font-mono text-fluid-xs uppercase tracking-[0.15em] text-fg-muted">
                  {stat.label}
                </div>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
