"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GradientText } from "@/components/GradientText";
import { MagneticButton } from "@/components/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { EASE, DURATION } from "@/lib/motion";
import { RESUME_HREF } from "@/lib/nav";

// Per-element entrance: each item fades + rises, delayed by its order index so
// the reveal reads name -> role -> value -> CTAs -> badge even though the badge
// sits at the top of the layout.
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE, delay: 0.1 + i * 0.09 },
  }),
};

/**
 * The opening screen. Full-height, vertically centered (cleared of the fixed
 * navbar), on the animated gradient-mesh backdrop. Content animates in on mount
 * (the hero is already in view on load) and renders instantly + static under
 * prefers-reduced-motion.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Gentle pointer parallax on the decorative grid layer (transform only).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });

  function handlePointer(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse" || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    px.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
    py.set(((e.clientY - rect.top) / rect.height - 0.5) * 16);
  }

  // Scroll cue fades out as the user begins to scroll.
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // When reduced, motion.* elements with no variants just render statically.
  const reveal = (i: number) => (reduced ? {} : { variants: item, custom: i });

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      tabIndex={-1}
      onPointerMove={handlePointer}
      className="gradient-mesh relative flex min-h-screen scroll-mt-24 flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24 text-center outline-none"
    >
      {/* Faint engineering grid for depth (parallaxed on pointer move). */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { x: sx, y: sy }}
        className="grid-backdrop pointer-events-none absolute inset-0 -z-10 opacity-60"
      />

      <motion.div
        className="flex flex-col items-center"
        initial={reduced ? false : "hidden"}
        animate={reduced ? false : "show"}
      >
        {/* Availability badge (reveals last) */}
        <motion.div {...reveal(4)} className="mb-8">
          <span className="bg-bg-elevated/60 inline-flex items-center gap-2 rounded-full border border-strong px-3.5 py-1.5 text-fluid-xs font-medium text-fg-muted backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to opportunities
          </span>
        </motion.div>

        {/* Name — the centerpiece */}
        <motion.h1
          {...reveal(0)}
          id="hero-heading"
          className="font-display text-fluid-display font-bold leading-[1.02] tracking-tight"
        >
          Ridam <GradientText>Agrawal</GradientText>
        </motion.h1>

        {/* Role */}
        <motion.p
          {...reveal(1)}
          className="mt-5 text-fluid-lg font-medium text-fg-muted sm:text-fluid-xl"
        >
          Full-Stack Developer{" "}
          <span aria-hidden className="text-fg-subtle">
            ·
          </span>{" "}
          Backend &amp; AI Engineer
        </motion.p>

        {/* Value prop */}
        <motion.p
          {...reveal(2)}
          className="mt-6 max-w-2xl text-balance text-fluid-base text-fg-muted"
        >
          I build production SaaS and multi-agent AI systems end to end — from
          PostgreSQL data models and REST APIs to LLM/RAG pipelines and polished
          Next.js frontends.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...reveal(3)}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <MagneticButton href="#projects">View work</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in touch
            </MagneticButton>
          </div>
          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline rounded-sm text-fluid-sm text-fg-muted transition-colors hover:text-fg"
          >
            or view résumé →
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue (decorative, fades on scroll, clears the layout) */}
      <motion.div
        aria-hidden
        style={{ opacity: reduced ? 1 : cueOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown
          className={
            reduced
              ? "h-5 w-5 text-fg-subtle"
              : "h-5 w-5 animate-bounce text-fg-subtle"
          }
        />
      </motion.div>
    </section>
  );
}
