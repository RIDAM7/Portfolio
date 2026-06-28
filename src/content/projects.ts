/**
 * Projects showcase data (Phase 6). Single source of truth for the cards
 * rendered by <Projects>. Typed data only — never hardcode JSX — so the same
 * shape can power case-study pages later if we add them.
 */
export type ProjectMetric = {
  /** Short caption, e.g. "Users migrated". */
  label: string;
  /** The headline figure/term, e.g. "350K+". Rendered in the display font. */
  value: string;
};

export type ProjectLinks = {
  live?: string;
  github?: string;
  caseStudy?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** The problem → approach → impact narrative. */
  problem: string;
  approach: string;
  impact: string;
  tech: readonly string[];
  metrics: readonly ProjectMetric[];
  /** Who/where, e.g. "MoonPhase Solutions". */
  role: string;
  /** Display year or range, e.g. "2026" or "2025–2026". */
  year: string;
  /** Featured projects get a large alternating spotlight row. */
  featured: boolean;
  /** Only set when a real URL exists — never invent links. */
  links?: ProjectLinks;
  /** "private" renders a "Private · proprietary" tag (no public links). */
  status?: "private";
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "local-coding-agent",
    title: "Local Coding Agent",
    tagline:
      "A local-first, multi-agent coding agent with repository intelligence and self-healing repair.",
    problem:
      "Cloud coding agents are costly and opaque, send your codebase to a third party, and still apply edits with no validation loop.",
    approach:
      "Built in Python on Ollama/Qwen models. A retrieval layer (Ripgrep + Tree-sitter) indexes repository symbols, routes, and components for precise context; a 14B planner model decomposes a task into a structured plan, and a 30B/32B coder model emits structured file operations against retrieved context only. A validation layer checks every file op, then runs build/lint/test; a self-healing repair loop classifies failures (build/lint/test), retrieves error-relevant context, generates repair patches, and rolls back if it can't fix within a max-attempts budget. A confidence-gated Claude reviewer arbitrates low-confidence changes under a token budget, with async execution and Markdown run reports.",
    impact:
      "An offline-capable engineering agent that plans, edits, validates, and repairs code on its own — escalating to Claude review only when it's unsure.",
    metrics: [
      { value: "Local-first", label: "Ollama + Qwen" },
      { value: "Tree-sitter", label: "+ Ripgrep retrieval" },
      { value: "Self-healing", label: "repair loop" },
    ],
    tech: [
      "Python",
      "asyncio",
      "Pydantic",
      "Tree-sitter",
      "Ripgrep",
      "Ollama",
      "Qwen",
      "Claude API",
    ],
    role: "Open source · personal project",
    year: "2026",
    featured: true,
    // TODO: open-source repo goes public soon — add `links: { github }` here
    // (left undefined for now; the ProjectLinks shape already supports it).
  },
  {
    slug: "geoai",
    title: "GEOai",
    tagline:
      "Autonomous multi-agent platform for generative-engine optimization.",
    problem:
      "Brands need to surface inside AI answers, not just Google — but researching, writing, and publishing across that surface is slow and manual.",
    approach:
      "Orchestrated 20+ specialized AI agents across 3 LLM providers (Claude, OpenAI, Gemini) with Pinecone RAG in an autonomous weekly loop; built a Next.js 14 control plane with 8+ dashboards on PostgreSQL, Redis and BullMQ, secured with NextAuth, JWT and RBAC.",
    impact:
      "A self-running pipeline that researches, generates, and ships optimized content every week with minimal human input.",
    metrics: [
      { value: "20+", label: "AI agents" },
      { value: "3", label: "LLM providers" },
      { value: "8+", label: "Dashboards" },
    ],
    tech: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Pinecone",
      "Claude",
      "OpenAI",
      "Gemini",
      "NextAuth",
    ],
    role: "MoonPhase Solutions",
    year: "2026",
    featured: true,
    status: "private",
  },
  {
    slug: "easinvy",
    title: "EasInvy",
    tagline: "Multi-tenant inventory and billing SaaS for small businesses.",
    problem:
      "Small retailers need affordable multi-tenant inventory + invoicing without enterprise complexity.",
    approach:
      "Built a multi-tenant Next.js + Node/Express/MongoDB app with HTTP-only JWT cookie auth and bcrypt, barcode scanning, PDF invoice generation, and WhatsApp notifications; deployed on Vercel + Railway.",
    impact:
      "A complete billing workflow — scan, invoice, notify — that small shops can run end to end.",
    metrics: [
      { value: "Multi-tenant", label: "Architecture" },
      { value: "Barcode + PDF", label: "Invoicing" },
      { value: "WhatsApp", label: "Notifications" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Vercel",
      "Railway",
    ],
    role: "Personal project",
    year: "2025–2026",
    featured: true,
    // TODO: add EasInvy live + GitHub links when available (left undefined for now).
  },
  {
    slug: "masterchef",
    title: "MasterChef Platform",
    tagline: "Large-scale recipe platform with an admin console.",
    problem:
      "Scale a content platform and migrate a large existing user base reliably.",
    approach:
      "Built a Node/Express/MongoDB backend across 6 REST domains with a React + TypeScript admin; integrated AWS S3/SES, Firebase, and a lead pipeline.",
    impact: "Migrated 350,000+ users with no data loss.",
    metrics: [
      { value: "350K+", label: "Users migrated" },
      { value: "6", label: "REST domains" },
    ],
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "TypeScript",
      "AWS (S3, SES)",
      "Firebase",
    ],
    role: "MoonPhase Solutions (Intern)",
    year: "2026",
    featured: false,
    status: "private",
  },
  {
    slug: "black-raven",
    title: "Black Raven Esports",
    tagline: "Backend for a 30,000+ member esports community.",
    problem:
      "Run teams, tournaments and scrims for a large gaming community with safe access control.",
    approach:
      "Built a MongoDB/Mongoose backend with Discord + Google OAuth (Passport), JWT, RBAC, audit logging and bans.",
    impact:
      "A reliable community backbone handling membership, competitions and moderation at scale.",
    metrics: [
      { value: "30K+", label: "Members" },
      { value: "Teams", label: "& tournaments" },
    ],
    tech: [
      "Node.js",
      "MongoDB",
      "Mongoose",
      "Passport",
      "OAuth 2.0",
      "JWT",
      "Discord API",
    ],
    role: "Freelance",
    year: "2026",
    featured: false,
    status: "private",
  },
];
