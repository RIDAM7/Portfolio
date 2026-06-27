import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Violet -> blue gradient text. Used to highlight a key word inside a heading.
 * Keep it to one phrase per heading so it stays an accent, not a default.
 */
export function GradientText({
  children,
  className,
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-accent via-accent-bright to-accent-2 bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
