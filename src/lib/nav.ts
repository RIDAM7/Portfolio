/**
 * Single source of truth for the in-page navigation.
 * Reused by the Navbar (links + active-section tracking) and the Footer.
 * Section ids are wired now; the real section content arrives in later phases.
 */
export type NavLink = {
  /** Matches the target `<section id>` and the `#hash` href. */
  id: string;
  label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

/** Vertical offset (px) applied when scrolling to an anchor, to clear the sticky navbar. */
export const SCROLL_OFFSET = -80;

/** Path to the résumé PDF in /public. Centralized so every link stays in sync. */
export const RESUME_HREF = "/Ridam_Agrawal_Resume.pdf";
