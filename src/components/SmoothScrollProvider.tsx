"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SCROLL_OFFSET } from "@/lib/nav";

const LenisContext = createContext<Lenis | null>(null);

/** Access the active Lenis instance, or null when smooth scroll is disabled. */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Mounts Lenis smooth scrolling around the whole app and intercepts in-page
 * anchor clicks so they glide (and move keyboard focus to the target for a11y).
 *
 * When the user prefers reduced motion, Lenis is never created: anchors fall
 * back to the browser's native (instant, per globals.css) jump and focus still
 * lands on the target section.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Set up / tear down Lenis based on the motion preference.
  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    let instance: Lenis | null = null;
    let cancelled = false;

    // Lenis ships only an ESM build; import it dynamically so the provider
    // stays a clean client component without bundler interop headaches.
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      instance = new LenisCtor({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out-cubic
        smoothWheel: true,
      });
      lenisRef.current = instance;
      setLenis(instance);

      const raf = (time: number) => {
        instance?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      instance?.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduced]);

  // Delegate in-page anchor clicks (works for nav + footer + anywhere).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (
        e.target as HTMLElement | null
      )?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      e.preventDefault();

      const instance = lenisRef.current;
      if (instance) {
        instance.scrollTo(target, { offset: SCROLL_OFFSET });
      } else {
        target.scrollIntoView();
      }

      // Move focus to the section so keyboard users follow the jump.
      target.focus({ preventScroll: true });
      history.replaceState(null, "", hash);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
