"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { EASE } from "@/lib/motion";

type CountUpProps = {
  /** The numeric value to count up to (e.g. 350 for "350K+"). */
  value: number;
  /** Text rendered before the number, e.g. "$". */
  prefix?: string;
  /** Text rendered after the number, e.g. "K+" or "+". */
  suffix?: string;
  /** Count duration in seconds. */
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 up to `value` the first time it scrolls into view. The numeric
 * part animates; `prefix`/`suffix` (e.g. "K+", "+") render statically around it
 * so formatting stays clean. Under prefers-reduced-motion the final value shows
 * immediately with no counting.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
