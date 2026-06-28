import type { Variants } from "framer-motion";

/**
 * Shared motion tokens — the "house style" easing, named durations, and the
 * reveal/stagger variant factories. Imported everywhere instead of being
 * copy-pasted so the timing stays identical across components.
 *
 * EASE mirrors the --ease-out-expo CSS token in globals.css; keep them in sync.
 */

/** House easing ("ease-out-expo"), matching the CSS --ease-out-expo token. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Named durations (seconds) for the common motion beats. */
export const DURATION = {
  /** Micro-interactions and small UI affordances. */
  micro: 0.25,
  /** Default element entrance / stagger child. */
  base: 0.4,
  /** Section reveals and hero entrances. */
  reveal: 0.6,
} as const;

/** Container that cascades its children in (pair with staggerItem). */
export function staggerContainer(
  staggerChildren = 0.08,
  delayChildren = 0.1,
): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
  };
}

/** Child of a staggerContainer: fade + small lift. */
export function staggerItem(
  y = 12,
  duration: number = DURATION.base,
): Variants {
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
  };
}
