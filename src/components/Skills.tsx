import {
  Code2,
  Server,
  Layout,
  Database,
  Sparkles,
  Cloud,
  Network,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/Section";
import { GradientText } from "@/components/GradientText";
import { MonoLabel } from "@/components/MonoLabel";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { StaggerChips } from "@/components/StaggerChips";
import { TechChip } from "@/components/TechChip";
import { LogoMarquee } from "@/components/LogoMarquee";
import { SKILLS } from "@/content/skills";

// Per-group icon (presentation only — keeps the data file pure). Keyed by the
// group title so it stays obvious which icon maps to which group.
const GROUP_ICONS: Record<string, LucideIcon> = {
  Languages: Code2,
  Backend: Server,
  Frontend: Layout,
  Databases: Database,
  "AI / ML": Sparkles,
  "Cloud & Tools": Cloud,
  Concepts: Network,
};

/**
 * Skills section (Phase 7): seven résumé-ordered groups of competencies, each a
 * heading + <Chip> pills — no proficiency bars or fake percentages. Server
 * component; only the per-group chip cascade (StaggerChips) is client.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      label="Skills"
      title={
        <>
          A broad, <GradientText>production-tested</GradientText> toolkit.
        </>
      }
    >
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((group, index) => {
          const Icon = GROUP_ICONS[group.title];
          return (
            <div key={group.title}>
              <RevealOnScroll delay={index * 0.05}>
                <h3 className="flex items-center gap-2.5">
                  {Icon && (
                    <Icon
                      className="h-4 w-4 flex-none text-accent"
                      aria-hidden
                    />
                  )}
                  <MonoLabel>{group.title}</MonoLabel>
                </h3>
              </RevealOnScroll>
              <StaggerChips
                chips={group.items.map((skill) => ({
                  key: skill,
                  node: <TechChip label={skill} />,
                }))}
              />
            </div>
          );
        })}
      </div>

      {/* Decorative brand-logo strip — texture, not content (aria-hidden). */}
      <LogoMarquee />
    </Section>
  );
}
