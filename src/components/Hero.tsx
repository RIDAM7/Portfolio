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

// Max content tilt in degrees at the hero's edges (kept subtle/premium).
const MAX_TILT = 5;

// Per-element entrance: each item fades + rises, delayed by its order index so
// the reveal reads name -> role -> value -> CTAs -> badge even though the badge
// sits at the top of the layout. Used for the badge + CTAs.
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.reveal,
      ease: EASE,
      delay: 0.1 + i * 0.09,
    },
  }),
};

// Transform-only entrance for the hero text (name / role / value prop). Opacity
// stays 1 the whole time so this text — the LCP node — paints on the very first
// frame and just slides into place, instead of fading up from invisible.
const textItem: Variants = {
  hidden: { y: 12 },
  show: (i: number) => ({
    y: 0,
    transition: {
      duration: DURATION.reveal,
      ease: EASE,
      delay: 0.1 + i * 0.09,
    },
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

  // Subtle grid scale that swells toward 1.03 while the pointer is over the hero,
  // so the engineering grid feels like it bulges around the cursor.
  const gridScaleRaw = useMotionValue(1);
  const gridScale = useSpring(gridScaleRaw, { stiffness: 120, damping: 20 });

  // Aurora glow: lags well behind the pointer so it feels dragged through space
  // (soft spring). Stored as absolute px within the hero box.
  const auroraXRaw = useMotionValue(0);
  const auroraYRaw = useMotionValue(0);
  const auroraX = useSpring(auroraXRaw, { stiffness: 120, damping: 30 });
  const auroraY = useSpring(auroraYRaw, { stiffness: 120, damping: 30 });

  // Grid lens: tracks the pointer more closely (snappier spring). Stored as an
  // offset from the hero centre; the inner grid is counter-translated so the
  // lit lines stay pinned to the base grid (no doubling).
  const lensXRaw = useMotionValue(0);
  const lensYRaw = useMotionValue(0);
  const lensX = useSpring(lensXRaw, { stiffness: 200, damping: 30 });
  const lensY = useSpring(lensYRaw, { stiffness: 200, damping: 30 });
  const lensInnerX = useTransform(lensX, (v) => -v);
  const lensInnerY = useTransform(lensY, (v) => -v);

  // Cursor layers (aurora + lens) fade in on the first mouse move, so they never
  // flash in at a corner on load and stay hidden on touch devices.
  const cursorOpacity = useSpring(0, { stiffness: 80, damping: 20 });

  // Content tilt toward the cursor (rotateX/rotateY, capped at MAX_TILT).
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const tiltX = useSpring(tiltXRaw, { stiffness: 150, damping: 18 });
  const tiltY = useSpring(tiltYRaw, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(tiltX, (v) => `${v}deg`);
  const rotateY = useTransform(tiltY, (v) => `${v}deg`);

  function handlePointer(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse" || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const nx = relX / rect.width - 0.5; // -0.5 .. 0.5
    const ny = relY / rect.height - 0.5;

    px.set(nx * 16);
    py.set(ny * 16);
    auroraXRaw.set(relX);
    auroraYRaw.set(relY);
    lensXRaw.set(relX - rect.width / 2);
    lensYRaw.set(relY - rect.height / 2);
    tiltYRaw.set(nx * MAX_TILT * 2);
    tiltXRaw.set(-ny * MAX_TILT * 2);
    gridScaleRaw.set(1.03);
    cursorOpacity.set(1);
  }

  // Settle everything back to rest when the pointer leaves the hero.
  function handleLeave() {
    if (reduced) return;
    px.set(0);
    py.set(0);
    tiltXRaw.set(0);
    tiltYRaw.set(0);
    gridScaleRaw.set(1);
    cursorOpacity.set(0);
  }

  // Scroll cue fades out as the user begins to scroll.
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // When reduced, motion.* elements with no variants just render statically.
  const reveal = (i: number) => (reduced ? {} : { variants: item, custom: i });
  // Transform-only variant for the LCP text (visible from first paint).
  const revealText = (i: number) =>
    reduced ? {} : { variants: textItem, custom: i };

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      tabIndex={-1}
      onPointerMove={handlePointer}
      onPointerLeave={handleLeave}
      className="gradient-mesh relative flex min-h-screen scroll-mt-24 flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24 text-center outline-none"
    >
      {/* Faint engineering grid for depth (parallaxed + subtly scaled on move). */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { x: sx, y: sy, scale: gridScale }}
        className="grid-backdrop pointer-events-none absolute inset-0 -z-10 opacity-60"
      />

      {/* Cursor-following aurora glow — lags behind the pointer (mouse only). */}
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ opacity: cursorOpacity }}
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <motion.div
            style={{ x: auroraX, y: auroraY }}
            className="absolute left-0 top-0"
          >
            <div className="aurora-glow -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </motion.div>
      )}

      {/* Grid "lens": a brighter grid clipped to a circle that tracks the cursor
          and makes the engineering grid light up / bulge around the pointer. */}
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ x: lensX, y: lensY, opacity: cursorOpacity }}
          className="grid-lens pointer-events-none absolute inset-0 -z-10"
        >
          <motion.div
            style={{ x: lensInnerX, y: lensInnerY }}
            className="grid-lens__lines absolute -inset-[40vmax]"
          />
        </motion.div>
      )}

      <div
        className="flex flex-col items-center"
        style={reduced ? undefined : { perspective: 1200 }}
      >
      <motion.div
        className="flex flex-col items-center"
        initial={reduced ? false : "hidden"}
        animate={reduced ? false : "show"}
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
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
          {...revealText(0)}
          id="hero-heading"
          className="font-display text-fluid-display font-bold leading-[1.02] tracking-tight"
        >
          Ridam <GradientText>Agrawal</GradientText>
        </motion.h1>

        {/* Role */}
        <motion.p
          {...revealText(1)}
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
          {...revealText(2)}
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
      </div>

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
