import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `accent` marks something new, `negative` is a prominent red dot. @default "accent" */
  appearance?: "accent" | "negative";
  /** Screen-reader-only label, e.g. "new". The dot itself is decorative. */
  children?: string;
}

/** Tiny dot indicator placed next to a title or icon. */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { appearance = "accent", className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-block size-2 shrink-0 rounded-full align-middle",
        appearance === "accent" ? "bg-primary" : "bg-destructive",
        className,
      )}
      {...rest}
    >
      {children && <span className="sr-only">{children}</span>}
    </span>
  );
});
