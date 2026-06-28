import { ProjectVisual } from "@/components/ProjectVisual";
import { ProjectContent } from "@/components/ProjectContent";
import type { Project } from "@/content/projects";

/**
 * Compact secondary project card. Server component — the hover lift + accent
 * glow are pure CSS (transform/opacity only), so they stay 60fps and collapse to
 * an instant, non-animated state under prefers-reduced-motion via the global
 * reduced-motion rule. No JS needed here.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-bg-elevated transition-[transform,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
      <div className="p-3 pb-0">
        <ProjectVisual project={project} compact />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <ProjectContent project={project} variant="card" />
      </div>
    </article>
  );
}
