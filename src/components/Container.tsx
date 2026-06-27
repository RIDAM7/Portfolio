import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Render as a different element (default: div). */
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Centered, max-width content wrapper with consistent horizontal gutters.
 * Every section's content sits inside a Container so the grid stays aligned.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-container px-6 sm:px-8 lg:px-10",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
