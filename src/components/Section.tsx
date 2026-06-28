import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";
import { MonoLabel } from "@/components/MonoLabel";

type SectionProps = {
  children: React.ReactNode;
  /** Anchor id used by the nav (e.g. "experience"). */
  id?: string;
  /** Two-digit index for the eyebrow, e.g. "01". */
  index?: string;
  /** Eyebrow label, e.g. "EXPERIENCE". */
  label?: string;
  /** Optional large section heading. */
  title?: React.ReactNode;
  className?: string;
  /** Set false to opt out of the centered Container wrapper. */
  contained?: boolean;
};

/**
 * Standard page section: consistent vertical rhythm, an optional mono eyebrow
 * + heading, and a centered Container. The backbone every content block reuses.
 */
export function Section({
  children,
  id,
  index,
  label,
  title,
  className,
  contained = true,
}: SectionProps) {
  // Give the section an accessible name via its heading when both exist.
  const headingId = id && title ? `${id}-heading` : undefined;

  const header = (label || title) && (
    <header className="mb-10 flex flex-col gap-4 sm:mb-14">
      {label && <MonoLabel index={index}>{label}</MonoLabel>}
      {title && (
        <h2
          id={headingId}
          className="max-w-3xl font-display text-fluid-3xl font-semibold leading-[1.05] tracking-tight text-fg"
        >
          {title}
        </h2>
      )}
    </header>
  );

  const body = (
    <>
      {header}
      {children}
    </>
  );

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      // tabIndex lets keyboard focus land here after an anchor jump (a11y).
      tabIndex={-1}
      className={cn(
        "scroll-mt-24 py-20 outline-none sm:py-28 lg:py-32",
        className,
      )}
    >
      {contained ? <Container>{body}</Container> : body}
    </section>
  );
}
