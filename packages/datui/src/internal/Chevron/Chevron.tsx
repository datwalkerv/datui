import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ChevronProps {
  /** @default "m" */
  size?: "s" | "m";
  className?: string;
}

/** Trailing "navigates further" arrow for rows. Mirrors in RTL. */
export function Chevron({ size = "m", className }: ChevronProps) {
  return (
    <ChevronRight
      aria-hidden
      data-chevron=""
      className={cn(
        "shrink-0 text-icon-tertiary rtl:-scale-x-100",
        size === "s" ? "size-icon-sm" : "size-icon-lg",
        className,
      )}
    />
  );
}
