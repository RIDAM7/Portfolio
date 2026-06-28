import { Section } from "@/components/Section";
import { GradientText } from "@/components/GradientText";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ProjectSpotlight } from "@/components/ProjectSpotlight";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/content/projects";

/**
 * Projects showcase (Phase 6): featured projects render as large alternating
 * spotlight rows, the rest as a responsive 2-up grid of compact cards. Server
 * component — reuses the Section primitive (keeps the #projects anchor + focus);
 * interactivity lives in ProjectSpotlight / the cards' CSS hover.
 */
export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const secondary = PROJECTS.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      index="03"
      label="Projects"
      title={
        <>
          Selected work, <GradientText>shipped</GradientText>.
        </>
      }
    >
      {/* Featured spotlights. */}
      <div className="space-y-20 lg:space-y-28">
        {featured.map((project, index) => (
          <ProjectSpotlight
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Secondary grid. */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-24">
        {secondary.map((project, index) => (
          <RevealOnScroll
            key={project.slug}
            delay={index * 0.08}
            className="h-full"
          >
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}
