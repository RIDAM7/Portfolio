"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { EASE, DURATION } from "@/lib/motion";
import { MonoLabel } from "@/components/MonoLabel";

/**
 * Animated section eyebrow: the mono index/label slides in and a short accent
 * rule draws itself out (scaleX 0 -> 1, origin-left) the first time the section
 * scrolls into view. Renders statically (label visible, full rule) under
 * prefers-reduced-motion. Client island so <Section> can stay a server component.
 */
export function SectionEyebrow({
  index,
  label,
}: {
  index?: string;
  label: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="flex items-center gap-4">
        <MonoLabel index={index}>{label}</MonoLabel>
        <span aria-hidden className="h-px w-10 bg-accent" />
      </div>
    );
  }

  return (
    <motion.div
      className="flex items-center gap-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: DURATION.base, ease: EASE },
          },
        }}
      >
        <MonoLabel index={index}>{label}</MonoLabel>
      </motion.div>
      <motion.span
        aria-hidden
        className="h-px w-10 origin-left bg-accent"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: DURATION.reveal, ease: EASE, delay: 0.1 },
          },
        }}
      />
    </motion.div>
  );
}
