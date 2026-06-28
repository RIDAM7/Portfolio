/**
 * Skills data (Phase 7). Single source of truth for the grouped competencies
 * rendered by <Skills>. Typed data only — never hardcode JSX. Order is
 * intentional and mirrors the résumé exactly; the group icons live in the
 * component (presentation), keeping this shape pure data.
 */
export type SkillGroup = {
  title: string;
  items: string[];
};

export const SKILLS: readonly SkillGroup[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "BullMQ", "Redis"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "Mongoose", "PostgreSQL", "Pinecone"],
  },
  {
    title: "AI / ML",
    items: [
      "Generative AI",
      "LLMs",
      "Prompt Engineering",
      "RAG",
      "AI Agents",
      "Ollama",
    ],
  },
  {
    title: "Cloud & Tools",
    items: [
      "AWS (S3, SES)",
      "Firebase",
      "Vercel",
      "Railway",
      "Git",
      "LangSmith",
      "Tree-sitter",
      "Ripgrep",
    ],
  },
  {
    title: "Concepts",
    items: [
      "System Design",
      "Multi-Tenant",
      "OAuth 2.0",
      "JWT",
      "RBAC",
      "SaaS",
    ],
  },
];
