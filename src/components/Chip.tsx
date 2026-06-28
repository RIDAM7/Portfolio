import { cn } from "@/lib/utils";

type ChipProps = {
  children: React.ReactNode;
  className?: string;
  /** "accent" tints the chip violet to flag a key project/tag. */
  variant?: "default" | "accent";
};

/**
 * Small monospace pill used for tech tags and project labels. Server component
 * (purely presentational) so it stays cheap to reuse across Experience,
 * Projects, and Skills.
 */
export function Chip({ children, className, variant = "default" }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-fluid-xs tracking-tight",
        variant === "accent"
          ? "border-accent/30 bg-accent/10 text-accent-bright"
          : "bg-bg-elevated text-fg-muted transition-colors hover:border-accent/40 hover:text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}
