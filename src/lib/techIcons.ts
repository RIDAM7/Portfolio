import {
  siTypescript,
  siJavascript,
  siNodedotjs,
  siExpress,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siMongodb,
  siMongoose,
  siPostgresql,
  siRedis,
  siFirebase,
  siVercel,
  siRailway,
  siGit,
  siPython,
  siOllama,
  type SimpleIcon,
} from "simple-icons";

/**
 * Skill label -> simple-icons brand logo. Used by <TechChip> to render a tiny
 * inline brand mark (currentColor-tinted SVG path) before the label.
 *
 * Tree-shaken: each icon is a named import, so only the marks listed here ship.
 * Skills with no brand logo (SQL, REST APIs, BullMQ, System Design, OAuth 2.0,
 * Pinecone, RAG, AI Agents, AWS, LangSmith, Tree-sitter, Ripgrep, …) are simply
 * absent from this map and render with no logo — never a broken/empty icon.
 *
 * Keys match the exact display strings in src/content/skills.ts. Guard with
 * `getTechIcon` rather than indexing directly so a missing key is always safe.
 */
const TECH_ICONS: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Node.js": siNodedotjs,
  Express: siExpress,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  MongoDB: siMongodb,
  Mongoose: siMongoose,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  Firebase: siFirebase,
  Vercel: siVercel,
  Railway: siRailway,
  Git: siGit,
  Python: siPython,
  Ollama: siOllama,
};

/**
 * Returns the brand icon for a skill label, or `undefined` when none exists.
 * `undefined` is the intended "render no logo" signal — callers must handle it.
 */
export function getTechIcon(label: string): SimpleIcon | undefined {
  return TECH_ICONS[label];
}

/**
 * Ordered brand marks for the decorative logo marquee under the skills grid.
 * Kept monochrome/low-opacity in the UI so it reads as engineered texture.
 */
export const MARQUEE_ICONS: readonly SimpleIcon[] = [
  siNextdotjs,
  siReact,
  siTypescript,
  siNodedotjs,
  siPython,
  siPostgresql,
  siMongodb,
  siRedis,
  siTailwindcss,
  siExpress,
  siFirebase,
  siVercel,
  siRailway,
  siGit,
  siOllama,
  siJavascript,
  siMongoose,
];
