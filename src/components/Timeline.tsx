"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Timeline rail: a static vertical track with a scroll-linked progress line that
 * "draws" as the list scrolls through the viewport. Client component (owns the
 * scroll math); the entries themselves are passed in as server-rendered <li>
 * children. Under prefers-reduced-motion the progress line renders fully drawn.
 */
export function Timeline({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Progress runs 0 -> 1 as the rail travels from near the bottom of the
  // viewport up past its middle, so the fill tracks the user's reading position.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative">
      {/* Static track (inset top/bottom so it begins and ends at the nodes). */}
      <span
        aria-hidden
        className="absolute bottom-2 left-2 top-2 w-px -translate-x-1/2 bg-[var(--border-strong)]"
      />
      {/* Scroll-linked fill — fully drawn (scaleY: 1) under reduced motion. */}
      <motion.span
        aria-hidden
        style={reduced ? undefined : { scaleY }}
        className="absolute bottom-2 left-2 top-2 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent via-accent-bright to-accent-2"
      />

      <ol className="space-y-12 sm:space-y-16">{children}</ol>
    </div>
  );
}
