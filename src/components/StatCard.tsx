"use client";

import { useRef } from "react";
import { GradientText } from "@/components/GradientText";
import { CountUp } from "@/components/CountUp";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

/**
 * One About stat card. On mouse hover it lifts (transform-only) and a radial
 * spotlight tracks the cursor (--x/--y, rAF-throttled), with border -> accent.
 * Under prefers-reduced-motion it renders as a plain static card (border colour
 * affordance only — no lift, no spotlight). The GradientText CountUp number is
 * unchanged and still counts up the first time it scrolls into view.
 */
export function StatCard({ stat }: { stat: Stat }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const frame = useRef<number | null>(null);

  function handleMove(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // rAF-throttle the CSS var writes so we paint at most once per frame.
    if (frame.current == null) {
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
      });
    }
  }

  const inner = (
    <>
      <div className="font-display text-fluid-3xl font-bold leading-none tracking-tight">
        <GradientText>
          <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
        </GradientText>
      </div>
      <div className="mt-3 font-mono text-fluid-xs uppercase tracking-[0.15em] text-fg-muted">
        {stat.label}
      </div>
    </>
  );

  if (reduced) {
    return (
      <li className="border-border rounded-lg border bg-bg-elevated p-5 transition-colors hover:border-accent/50 sm:p-6">
        {inner}
      </li>
    );
  }

  return (
    <li
      ref={ref}
      onPointerMove={handleMove}
      className="stat-card border-border relative overflow-hidden rounded-lg border bg-bg-elevated p-5 transition-[transform,border-color] duration-300 ease-out-expo hover:-translate-y-[3px] hover:border-accent/50 sm:p-6"
    >
      {inner}
    </li>
  );
}
