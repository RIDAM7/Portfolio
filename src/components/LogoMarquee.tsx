import { MARQUEE_ICONS } from "@/lib/techIcons";

/**
 * Thin, infinite brand-logo strip shown under the skills grid as engineered
 * texture. The track holds the icon set twice and scrolls -50% on a pure CSS
 * transform loop (see .logo-marquee in globals.css) so the wrap is seamless;
 * it pauses on hover and is frozen static under prefers-reduced-motion.
 *
 * Decorative only (aria-hidden) — every brand here is already named in the
 * adjacent skills list, so screen readers lose nothing.
 */
export function LogoMarquee() {
  return (
    <div aria-hidden className="logo-marquee mt-12 overflow-hidden sm:mt-16">
      <ul className="logo-marquee__track flex items-center gap-12 text-fg-subtle/50">
        {[...MARQUEE_ICONS, ...MARQUEE_ICONS].map((icon, i) => (
          <li key={`${icon.slug}-${i}`} className="flex-none">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              focusable={false}
              className="h-5 w-5"
            >
              <title>{icon.title}</title>
              <path d={icon.path} />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
