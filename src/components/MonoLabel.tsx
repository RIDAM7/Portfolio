import { cn } from "@/lib/utils";

type MonoLabelProps = {
  children: React.ReactNode;
  /** Optional two-digit index shown before the label, e.g. "01". */
  index?: string;
  className?: string;
};

/**
 * Small uppercase monospace label used as a section eyebrow,
 * e.g. "01 / EXPERIENCE". Carries the engineering aesthetic.
 */
export function MonoLabel({ children, index, className }: MonoLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-fluid-xs uppercase tracking-[0.2em] text-fg-subtle",
        className,
      )}
    >
      {index && <span className="text-accent-bright">{index}</span>}
      {index && (
        <span aria-hidden className="text-fg-subtle/50">
          /
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
