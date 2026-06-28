import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/Chip";
import { GradientText } from "@/components/GradientText";
import { MagneticButton } from "@/components/MagneticButton";
import type { Project } from "@/content/projects";

type Variant = "spotlight" | "card";

/** Subtly-labelled narrative step (Problem / Approach / Impact). */
function Step({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-fluid-xs uppercase tracking-[0.2em] text-fg-subtle">
        {label}
      </dt>
      <dd className="mt-1 text-fluid-sm text-fg-muted">{children}</dd>
    </div>
  );
}

/** "Private · proprietary" badge for closed-source work. */
function PrivacyTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-fluid-xs tracking-tight text-fg-subtle">
      <Lock className="h-3 w-3" aria-hidden />
      Private · proprietary
    </span>
  );
}

/**
 * The textual half of a project: eyebrow, title, narrative, metrics, tech chips,
 * and any link buttons. Server component, shared by ProjectSpotlight (client)
 * and ProjectCard (server) — `variant` only tunes sizing/spacing.
 */
export function ProjectContent({
  project,
  variant,
}: {
  project: Project;
  variant: Variant;
}) {
  const spotlight = variant === "spotlight";
  const live = project.links?.live;
  const github = project.links?.github;

  return (
    <div>
      {/* Eyebrow: role · year, plus a privacy tag for closed work. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-fluid-xs uppercase tracking-[0.2em] text-fg-subtle">
          {project.role} · {project.year}
        </span>
        {project.status === "private" && <PrivacyTag />}
      </div>

      <h3
        className={cn(
          "mt-3 font-display font-semibold tracking-tight text-fg",
          spotlight ? "text-fluid-2xl" : "text-fluid-xl",
        )}
      >
        {project.title}
      </h3>
      <p className="mt-2 text-fluid-base text-fg-muted">{project.tagline}</p>

      {/* Problem → approach → impact. */}
      <dl className="mt-5 space-y-3">
        <Step label="Problem">{project.problem}</Step>
        <Step label="Approach">{project.approach}</Step>
        <Step label="Impact">{project.impact}</Step>
      </dl>

      {/* Key metrics — display-font figures. */}
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
        {project.metrics.map((metric) => (
          <li key={metric.label}>
            <div
              className={cn(
                "font-display font-bold leading-none tracking-tight",
                spotlight ? "text-fluid-2xl" : "text-fluid-xl",
              )}
            >
              <GradientText>{metric.value}</GradientText>
            </div>
            <div className="mt-1.5 font-mono text-fluid-xs uppercase tracking-[0.15em] text-fg-muted">
              {metric.label}
            </div>
          </li>
        ))}
      </ul>

      {/* Tech chips. */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li key={tech}>
            <Chip>{tech}</Chip>
          </li>
        ))}
      </ul>

      {/* Links — rendered only for URLs that actually exist. */}
      {(live || github) && (
        <div className="mt-7 flex flex-wrap gap-3">
          {live && (
            <MagneticButton
              href={live}
              target="_blank"
              aria-label={`${project.title} — live site (opens in a new tab)`}
            >
              Live site
            </MagneticButton>
          )}
          {github && (
            <MagneticButton
              href={github}
              target="_blank"
              variant="ghost"
              aria-label={`${project.title} — source on GitHub (opens in a new tab)`}
            >
              GitHub
            </MagneticButton>
          )}
        </div>
      )}
    </div>
  );
}
