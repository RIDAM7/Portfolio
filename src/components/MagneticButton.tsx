"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  /** Visual weight: solid violet or bordered ghost. */
  variant?: "solid" | "ghost";
  /** How strongly the button leans toward the cursor (px range). */
  strength?: number;
  /** Anchor target (link mode only), e.g. "_blank". */
  target?: React.HTMLAttributeAnchorTarget;
  /** Anchor rel (link mode only). Defaults to a safe value when target="_blank". */
  rel?: string;
  /** Accessible label, e.g. to note a link opens in a new tab. */
  "aria-label"?: string;
};

/**
 * Button (or link) whose label gently leans toward the cursor on hover.
 * Falls back to a plain, static button when reduced motion is requested.
 */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "solid",
  strength = 10,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-fluid-sm font-medium transition-colors duration-200",
    variant === "solid"
      ? "bg-accent text-white hover:bg-accent-bright shadow-glow"
      : "border border-strong text-fg hover:border-accent hover:text-fg",
    className,
  );

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({
      x: (x / rect.width) * strength * 2,
      y: (y / rect.height) * strength * 2,
    });
  }

  const reset = () => setPos({ x: 0, y: 0 });

  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.span>
  );

  const motionProps = {
    onMouseMove: handleMove,
    onMouseLeave: reset,
    animate: { x: pos.x, y: pos.y },
    transition: { type: "spring" as const, stiffness: 150, damping: 15 },
  };

  if (href) {
    // Default to a safe rel when opening in a new tab.
    const safeRel =
      rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={safeRel}
        aria-label={ariaLabel}
        className={base}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel}
      className={base}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
