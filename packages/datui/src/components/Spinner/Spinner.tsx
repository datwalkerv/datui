import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

export const spinnerVariants = cva(
  "inline-block shrink-0 animate-spin text-current motion-reduce:[animation-duration:1.6s]",
  {
    variants: {
      size: { s: "size-icon-sm", m: "size-icon-md", l: "size-icon-lg", xl: "size-icon-xl" },
    },
    defaultVariants: { size: "m" },
  },
);

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof spinnerVariants> {
  /** Accessible label. Pass `null` when a parent already announces the busy state. @default "Loading…" */
  label?: string | null;
  /** Pause the animation (e.g. for screenshots). */
  paused?: boolean;
}

/** Indeterminate loading indicator. */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size, label = "Loading…", paused, className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role={label === null ? undefined : "status"}
      aria-hidden={label === null ? true : undefined}
      className={cn(spinnerVariants({ size }), paused && "[animation-play-state:paused]", className)}
      {...rest}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden>
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
        <path d="M21.5 12A9.5 9.5 0 0 0 12 2.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {label !== null && <span className="sr-only">{label}</span>}
    </span>
  );
});
