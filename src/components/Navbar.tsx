"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, RESUME_HREF } from "@/lib/nav";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { EASE, DURATION } from "@/lib/motion";
import { Container } from "@/components/Container";
import { MagneticButton } from "@/components/MagneticButton";

/**
 * Sticky top navigation: brand, in-page anchor links with an active-section
 * underline (driven by IntersectionObserver), a Resume button, and an animated
 * full-screen mobile menu. Smooth scrolling itself is handled by
 * SmoothScrollProvider; these are plain `#hash` links it intercepts.
 */
export function Navbar() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string>(NAV_LINKS[0]?.id ?? "home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu and return focus to the toggle that opened it (a11y).
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Show the navbar background/border once scrolled away from the very top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-depth driven backdrop: the bar's tint + blur ramp up over the first
  // ~500px so it feels more "engineered" the further you scroll. Scroll-linked
  // (not autonomous motion), so it stays on under reduced motion via the class
  // fallback below. The rgb() mirrors --bg (#0a0a0b = 10 10 11).
  const { scrollY } = useScroll();
  const bgAlpha = useTransform(scrollY, [0, 500], [0, 0.85]);
  const blurPx = useTransform(scrollY, [0, 500], [0, 14]);
  const backgroundColor = useMotionTemplate`rgb(10 10 11 / ${bgAlpha})`;
  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;

  // Track which section is in view to highlight the matching link.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Bias the "active" band toward the upper-middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled ? "border-border" : "border-transparent",
          // Reduced-motion fallback: static tint/blur instead of scroll-linked.
          reduced && scrolled && "bg-bg/80 backdrop-blur-md",
        )}
        style={
          reduced
            ? undefined
            : {
                backgroundColor,
                backdropFilter,
                WebkitBackdropFilter: backdropFilter,
              }
        }
      >
        <Container>
          <nav className="flex h-16 items-center justify-between gap-4">
            {/* Brand */}
            <a
              href="#home"
              aria-label="Ridam Agrawal — back to top"
              className="font-display text-fluid-base font-medium tracking-tight text-fg"
            >
              Ridam <span className="text-accent">Agrawal</span>
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative px-3 py-2 text-fluid-sm transition-colors",
                        isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {link.label}
                      {isActive &&
                        (reduced ? (
                          <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" />
                        ) : (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                            transition={{ duration: 0.3, ease: EASE }}
                          />
                        ))}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Desktop resume */}
            <div className="hidden md:block">
              <MagneticButton
                href={RESUME_HREF}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Résumé (opens in a new tab)"
              >
                Résumé
              </MagneticButton>
            </div>

            {/* Mobile toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>
        </Container>
      </motion.div>

      <MobileMenu
        open={menuOpen}
        active={active}
        reduced={reduced}
        onClose={closeMenu}
      />
    </header>
  );
}

function MobileMenu({
  open,
  active,
  reduced,
  onClose,
}: {
  open: boolean;
  active: string;
  reduced: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Keep Tab focus inside the open menu (focus trap). The close button
  // (autoFocus) moves focus in on open; Navbar returns it to the toggle on close.
  function trapTab(e: React.KeyboardEvent) {
    if (e.key !== "Tab") return;
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const overlay = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: "100%" },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: "100%" },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={trapTab}
          className="bg-bg/95 fixed inset-0 z-50 flex flex-col backdrop-blur-lg md:hidden"
          {...overlay}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-display text-fluid-base font-medium tracking-tight text-fg">
              Ridam <span className="text-accent">Agrawal</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              autoFocus
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={onClose}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "font-display text-fluid-2xl font-semibold tracking-tight transition-colors",
                  active === link.id ? "text-fg" : "text-fg-muted",
                )}
                initial={reduced ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: DURATION.base,
                  ease: EASE,
                  delay: reduced ? 0 : 0.1 + i * 0.05,
                }}
              >
                <span className="mr-3 font-mono text-fluid-xs text-accent-bright">
                  0{i + 1}
                </span>
                {link.label}
              </motion.a>
            ))}
          </nav>

          <div className="px-8 pb-10">
            <a
              href={RESUME_HREF}
              onClick={onClose}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-md border border-strong px-5 py-3 text-fluid-sm font-medium text-fg"
            >
              Résumé
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
