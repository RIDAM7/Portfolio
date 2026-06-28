"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { staggerContainer, staggerItem } from "@/lib/motion";

const list = staggerContainer(0.05, 0.05);
const item = staggerItem(8);

export type StaggerChip = { key: string; node: ReactNode };

/**
 * Cascades a group's pre-rendered chips into view on scroll (house motion).
 * Under prefers-reduced-motion they render statically with no transforms.
 *
 * Chips are passed in already-rendered (server-side <TechChip>s) rather than
 * built here, so the simple-icons brand paths stay in the server tree and never
 * ship in this client bundle. Client component — surrounding markup stays server.
 */
export function StaggerChips({ chips }: { chips: readonly StaggerChip[] }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <ul className="mt-4 flex flex-wrap gap-2">
        {chips.map(({ key, node }) => (
          <li key={key}>{node}</li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className="mt-4 flex flex-wrap gap-2"
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {chips.map(({ key, node }) => (
        <motion.li key={key} variants={item}>
          {node}
        </motion.li>
      ))}
    </motion.ul>
  );
}
