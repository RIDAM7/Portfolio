"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ProjectContent } from "@/components/ProjectContent";
import type { Project } from "@/content/projects";

/** Max tilt in degrees at the visual's edges (kept subtle/premium). */
const MAX_TILT = 5;

/**
 * Large featured project row: open content beside a framed visual, alternating
 * sides per row. Client component — the visual gets a subtle pointer-based 3D
 * tilt + accent glow (mouse only). Under prefers-reduced-motion the tilt is
 * disabled and it renders static. Content stays in <ProjectContent>.
 */
export function ProjectSpotlight({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 150, damping: 18 });
  const springRy = useSpring(ry, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(springRx, (v) => `${v}deg`);
  const rotateY = useTransform(springRy, (v) => `${v}deg`);

  function handleMove(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const px = relX / rect.width - 0.5; // -0.5 .. 0.5
    const py = relY / rect.height - 0.5;
    ry.set(px * MAX_TILT * 2);
    rx.set(-py * MAX_TILT * 2);
    // rAF-throttle the spotlight CSS var writes so we paint at most once a frame.
    if (frame.current == null) {
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        el.style.setProperty("--spot-x", `${relX}px`);
        el.style.setProperty("--spot-y", `${relY}px`);
      });
    }
  }

  function reset() {
    rx.set(0);
    ry.set(0);
  }

  // Even rows put the visual on the left (lg+); DOM keeps content first for
  // reading order regardless of visual placement.
  const visualOnLeft = index % 2 === 0;

  return (
    <RevealOnScroll className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <ProjectContent project={project} variant="spotlight" />

      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        className={cn(
          "group/visual [perspective:1200px]",
          visualOnLeft && "lg:order-first",
        )}
      >
        <motion.div
          style={
            reduced
              ? undefined
              : { rotateX, rotateY, transformStyle: "preserve-3d" }
          }
          className="relative rounded-xl transition-shadow duration-300 hover:shadow-glow"
        >
          <ProjectVisual project={project} featured />
          {/* Cursor spotlight (mouse only; not rendered under reduced motion). */}
          {!reduced && (
            <span
              aria-hidden
              className="card-spotlight pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover/visual:opacity-100"
            />
          )}
        </motion.div>
      </div>
    </RevealOnScroll>
  );
}
