"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ProjectContent } from "@/components/ProjectContent";
import type { Project } from "@/content/projects";

/** Max card tilt in degrees at the edges (kept subtle/premium). */
const MAX_TILT = 6;

/**
 * Compact secondary project card. Client component: on mouse hover it tilts
 * toward the cursor (rotateX/rotateY, springs) and a radial spotlight follows
 * the pointer inside the card (--spot-x/--spot-y, rAF-throttled). Under
 * prefers-reduced-motion it renders as the original static, CSS-only card (lift +
 * accent border + glow on hover) with no JS interaction.
 */
export function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18 });

  function handleMove(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const nx = relX / rect.width - 0.5;
    const ny = relY / rect.height - 0.5;
    ry.set(nx * MAX_TILT * 2);
    rx.set(-ny * MAX_TILT * 2);
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

  // Reduced motion: the original static card (CSS-only hover affordances).
  if (reduced) {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-bg-elevated transition-[border-color,box-shadow] duration-300 ease-out-expo hover:border-accent/40 hover:shadow-glow">
        <div className="p-3 pb-0">
          <ProjectVisual project={project} compact />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <ProjectContent project={project} variant="card" />
        </div>
      </article>
    );
  }

  return (
    <div className="h-full [perspective:1000px]">
      <motion.article
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-bg-elevated transition-[border-color,box-shadow] duration-300 ease-out-expo hover:border-accent/40 hover:shadow-glow"
      >
        {/* Cursor spotlight (mouse only; not rendered under reduced motion). */}
        <span
          aria-hidden
          className="card-spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="p-3 pb-0">
          <ProjectVisual project={project} compact />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <ProjectContent project={project} variant="card" />
        </div>
      </motion.article>
    </div>
  );
}
