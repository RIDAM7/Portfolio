"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { staggerContainer, staggerItem } from "@/lib/motion";

const list = staggerContainer(0.08, 0.1);
const item = staggerItem(12, 0.5);

/** A bullet row: accent marker + text. Shared by both motion states. */
function BulletRow({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex gap-3 text-fluid-sm text-fg-muted">
      <span
        aria-hidden
        className="mt-[0.5em] h-1 w-1 flex-none rounded-full bg-accent"
      />
      <span>{children}</span>
    </span>
  );
}

/**
 * Renders a role's bullets, staggering each one in as they enter view (house
 * motion). Under prefers-reduced-motion they render statically with no
 * transforms. Client component — the rest of an entry stays server-rendered.
 */
export function StaggerBullets({ bullets }: { bullets: readonly string[] }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <ul className="mt-4 space-y-2.5">
        {bullets.map((bullet) => (
          <li key={bullet}>
            <BulletRow>{bullet}</BulletRow>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className="mt-4 space-y-2.5"
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {bullets.map((bullet) => (
        <motion.li key={bullet} variants={item}>
          <BulletRow>{bullet}</BulletRow>
        </motion.li>
      ))}
    </motion.ul>
  );
}
