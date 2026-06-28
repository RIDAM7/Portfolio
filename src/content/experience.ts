/**
 * Experience timeline data (Phase 5). Single source of truth for the roles
 * rendered by <Experience>. Kept as typed data — never hardcode JSX — so the
 * same shape can feed other surfaces later (e.g. a résumé export).
 */
export type ExperienceItem = {
  /** Job title, e.g. "Software Developer". */
  role: string;
  /** Organisation name. */
  company: string;
  /** Headline project shipped in the role, shown as an accent tag. */
  project: string;
  /** Start month + year, e.g. "Jun 2026". */
  start: string;
  /** End month + year, or "Present" for the current role. */
  end: string;
  /** Optional city/region — omitted for now until confirmed. */
  location?: string;
  /** 2–4 punchy, factual bullets. */
  bullets: readonly string[];
  /** Tech chips rendered under the bullets. */
  tech: readonly string[];
};

export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    role: "Software Developer",
    company: "MoonPhase Solutions",
    project: "GEOai",
    start: "Jun 2026",
    end: "Present",
    bullets: [
      "Built a 20+ agent AI pipeline orchestrating 3 LLM providers (Claude, OpenAI, Gemini) with Pinecone RAG, driving an autonomous weekly content loop.",
      "Shipped a Next.js 14 frontend with 8+ dashboards secured by NextAuth, JWT and RBAC.",
      "Designed the data layer on PostgreSQL with Redis + BullMQ for queues and background jobs.",
    ],
    tech: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "NextAuth/JWT",
      "RAG",
      "Pinecone",
      "Claude",
      "OpenAI",
      "Gemini",
    ],
  },
  {
    role: "Software Developer (Intern)",
    company: "MoonPhase Solutions",
    project: "MasterChef",
    start: "Mar 2026",
    end: "May 2026",
    bullets: [
      "Built a Node/Express/MongoDB platform spanning 6 REST domains with a React + TypeScript admin.",
      "Migrated 350,000+ users and integrated AWS S3/SES, Firebase, and a lead pipeline.",
    ],
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "TypeScript",
      "AWS (S3, SES)",
      "Firebase",
      "REST",
    ],
  },
  {
    role: "Backend Developer (Freelance)",
    company: "Black Raven Esports",
    project: "Community Platform",
    start: "Jan 2026",
    end: "Feb 2026",
    bullets: [
      "Built the backend for a 30,000+ member esports community: teams, tournaments, and scrims.",
      "Implemented Discord + Google OAuth (Passport) with JWT, RBAC, audit logging, and bans.",
    ],
    tech: [
      "Node.js",
      "MongoDB",
      "Mongoose",
      "Passport (OAuth 2.0)",
      "JWT",
      "Discord API",
    ],
  },
];

/**
 * Formats a role's period for display. Collapses a same-year range to a single
 * year ("Mar–May 2026"); keeps "Present" open-ended ("Jun 2026–Present").
 */
export function formatPeriod({
  start,
  end,
}: Pick<ExperienceItem, "start" | "end">): string {
  if (end === "Present") return `${start}–Present`;

  const [startMonth, startYear] = start.split(" ");
  const [endMonth, endYear] = end.split(" ");

  return startYear === endYear
    ? `${startMonth}–${endMonth} ${endYear}`
    : `${start}–${end}`;
}
