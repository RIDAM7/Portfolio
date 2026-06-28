"use client";

import { useEffect, useState } from "react";

/**
 * Page-load intro overlay. The wipe + wordmark animation lives entirely in CSS
 * (.preloader in globals.css) so it covers the very first paint without a flash
 * and runs even before hydration. This component only layers on instant skip:
 * the first key / pointer / wheel / touch / scroll marks it done, fading it out.
 *
 * It is also hidden via CSS under prefers-reduced-motion; the effect below still
 * bails early there so no listeners or timers are attached.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Reduced motion: the overlay is display:none already — nothing to drive.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dismiss = () => setDone(true);
    // Auto-clear shortly after the CSS wipe completes (~0.95s), as a backstop.
    const timer = window.setTimeout(dismiss, 1100);
    const opts = { passive: true } as const;
    window.addEventListener("keydown", dismiss, opts);
    window.addEventListener("pointerdown", dismiss, opts);
    window.addEventListener("wheel", dismiss, opts);
    window.addEventListener("touchstart", dismiss, opts);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
    };
  }, []);

  return (
    <div className="preloader" data-done={done} aria-hidden>
      <span className="preloader__mark font-display text-fluid-2xl font-bold tracking-tight text-fg">
        R<span className="text-accent">A</span>
      </span>
    </div>
  );
}
