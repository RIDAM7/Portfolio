"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Thin wrapper over Framer Motion's reduced-motion detector so every animated
 * primitive imports motion preferences from one place. Returns true when the
 * user has requested reduced motion at the OS level.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
