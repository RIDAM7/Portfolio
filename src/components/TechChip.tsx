import { cn } from "@/lib/utils";
import { getTechIcon } from "@/lib/techIcons";

/**
 * Skill pill with an optional 14px monochrome brand logo before the label. The
 * logo is an inline simple-icons path tinted with `currentColor`, so it inherits
 * the chip's text colour — calm `fg-muted` by default, shifting to the violet
 * accent (logo + label together) on hover, with a subtle transform-only lift.
 *
 * Server component (purely presentational). Skills with no brand mark render the
 * label alone — never a broken/empty icon (see src/lib/techIcons.ts).
 */
export function TechChip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const icon = getTechIcon(label);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-bg-elevated px-2.5 py-1 font-mono text-fluid-xs tracking-tight text-fg-muted transition-[transform,color,border-color] duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent",
        className,
      )}
    >
      {icon && (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          focusable={false}
          className="h-3.5 w-3.5 flex-none"
        >
          <path d={icon.path} />
        </svg>
      )}
      {label}
    </span>
  );
}
