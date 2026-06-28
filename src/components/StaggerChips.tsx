"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Chip } from "@/components/Chip";
import { staggerContainer, staggerItem } from "@/lib/motion";

const list = staggerContainer(0.05, 0.05);
const item = staggerItem(8);

/**
 * Renders a group's skills as <Chip> pills that cascade in on scroll (house
 * motion). Under prefers-reduced-motion they render statically with no
 * transforms. Client component — the surrounding group markup stays server-side.
 */
export function StaggerChips({ items }: { items: readonly string[] }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((skill) => (
          <li key={skill}>
            <Chip>{skill}</Chip>
          </li>
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
      {items.map((skill) => (
        <motion.li key={skill} variants={item}>
          <Chip>{skill}</Chip>
        </motion.li>
      ))}
    </motion.ul>
  );
}
