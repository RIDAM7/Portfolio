"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  /** Render as a different motion element (default: div). */
  as?: "div" | "section" | "li" | "span";
};

/**
 * Fades and lifts its children into view the first time they enter the
 * viewport. Honors prefers-reduced-motion by rendering statically.
 */
export function RevealOnScroll({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
}: RevealOnScrollProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
