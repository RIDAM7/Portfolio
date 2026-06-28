import { cn } from "@/lib/utils";
import { GradientText } from "@/components/GradientText";
import type { Project } from "@/content/projects";

/**
 * Placeholder project visual: a mock browser window over the gradient-mesh, with
 * the project name as the cover art. Server component (pure markup) so it stays
 * cheap to reuse in spotlight rows and cards. The interaction effects (tilt,
 * glow) are applied by the parent.
 *
 * TODO: swap the gradient-mesh cover for a real screenshot per project once
 * captures exist — keep the window chrome. The cover sits in an `aspect-[16/10]`
 * box, so dropping in a fill image keeps it CLS-safe (the box reserves the
 * space; the image just fills it). Add `screenshot?: string` to the Project
 * type, then replace the placeholder cover with, e.g.:
 *
 *   <div className="relative aspect-[16/10] overflow-hidden">
 *     <Image src={project.screenshot} alt={`${project.title} preview`} fill
 *       sizes="(min-width:1024px) 50vw, 100vw"
 *       className="object-cover" loading="lazy" />
 *   </div>
 *
 * AVIF/WebP are enabled in next.config.mjs; `loading="lazy"` keeps it off the
 * critical path (all project visuals are below the fold).
 */
export function ProjectVisual({
  project,
  compact = false,
  featured = false,
}: {
  project: Project;
  compact?: boolean;
  /** Wraps the visual in the animated violet -> blue gradient frame. */
  featured?: boolean;
}) {
  return (
    <div className="relative">
      {featured && <span aria-hidden className="gradient-border-frame" />}
      <div className="relative overflow-hidden rounded-xl border bg-bg-elevated shadow-card">
      {/* Window chrome — monochrome dots to stay on-palette. */}
      <div className="flex items-center gap-1.5 border-b px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-bg-overlay" />
        <span className="h-2.5 w-2.5 rounded-full bg-bg-overlay" />
        <span className="h-2.5 w-2.5 rounded-full bg-bg-overlay" />
        <span className="ml-3 font-mono text-fluid-xs lowercase tracking-tight text-fg-subtle">
          {project.slug}
        </span>
      </div>

      {/* Cover art (placeholder). */}
      <div className="gradient-mesh relative grid aspect-[16/10] place-items-center overflow-hidden p-6 text-center">
        <div
          aria-hidden
          className="grid-backdrop pointer-events-none absolute inset-0 opacity-50"
        />
        <div className="relative">
          <div
            className={cn(
              "font-display font-bold leading-tight tracking-tight",
              compact ? "text-fluid-xl" : "text-fluid-2xl",
            )}
          >
            <GradientText>{project.title}</GradientText>
          </div>
          <div className="mt-2 font-mono text-fluid-xs uppercase tracking-[0.2em] text-fg-subtle">
            Preview · {project.year}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
