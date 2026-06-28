import { Section } from "@/components/Section";
import { GradientText } from "@/components/GradientText";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Chip } from "@/components/Chip";
import { Timeline } from "@/components/Timeline";
import { StaggerBullets } from "@/components/StaggerBullets";
import {
  EXPERIENCE,
  formatPeriod,
  type ExperienceItem,
} from "@/content/experience";

/**
 * A single timeline entry: node on the rail, then the role header, staggered
 * bullets, and tech chips. Server-rendered — only the bullet stagger (and the
 * rail's progress line) are client. `index` offsets each header's reveal.
 */
function ExperienceEntry({
  entry,
  index,
}: {
  entry: ExperienceItem;
  index: number;
}) {
  return (
    <li className="relative pl-10 sm:pl-14">
      {/* Node, aligned to the rail (left-2) and the first header line. */}
      <span
        aria-hidden
        className="absolute left-2 top-1 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border border-strong bg-bg-elevated"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </span>

      {/* Header: period, role, company + project tag. */}
      <RevealOnScroll delay={index * 0.05}>
        <span className="font-mono text-fluid-xs uppercase tracking-[0.2em] text-fg-subtle">
          {formatPeriod(entry)}
        </span>
        <h3 className="mt-2 font-display text-fluid-xl font-semibold tracking-tight text-fg">
          {entry.role}
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-fluid-base text-fg-muted">
          <span className="font-medium text-fg">{entry.company}</span>
          <Chip variant="accent">{entry.project}</Chip>
        </p>
      </RevealOnScroll>

      {/* Bullets stagger in on reveal. */}
      <StaggerBullets bullets={entry.bullets} />

      {/* Tech chips. */}
      <RevealOnScroll delay={0.15} className="mt-5">
        <ul className="flex flex-wrap gap-2">
          {entry.tech.map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </li>
  );
}

/**
 * Experience section (Phase 5): a vertical timeline of roles with a scroll-linked
 * progress line. Server component — reuses the Section primitive (keeps the
 * #experience anchor + focus behavior); motion lives in Timeline/StaggerBullets.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title={
        <>
          Shipping production systems, <GradientText>end to end</GradientText>.
        </>
      }
    >
      <Timeline>
        {EXPERIENCE.map((entry, index) => (
          <ExperienceEntry
            key={`${entry.company}-${entry.project}`}
            entry={entry}
            index={index}
          />
        ))}
      </Timeline>
    </Section>
  );
}
