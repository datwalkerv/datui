import { Progress as ProgressPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface ProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 0–100; clamped. @default 0 */
  value?: number;
  /** Named intent or any CSS color (`#rrggbb`, `var(--x)`). @default "accent" */
  appearance?: "accent" | "positive" | "negative" | (string & {});
  /** Bar height in px. @default 4 */
  height?: number;
  /** Transparent track. */
  noTrack?: boolean;
}

const fills = { accent: "bg-primary", positive: "bg-positive", negative: "bg-destructive" } as const;

/** Determinate linear progress bar (`role="progressbar"`). Label it with `aria-label` or `aria-labelledby`. */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = 0, appearance = "accent", height = 4, noTrack, className, style, ...rest },
  ref,
) {
  const clamped = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
  const named = appearance in fills ? fills[appearance as keyof typeof fills] : undefined;
  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={clamped}
      max={100}
      className={cn(
        "relative w-full overflow-hidden rounded-full",
        noTrack ? "bg-transparent" : "bg-control-track",
        className,
      )}
      style={{ height, ...style }}
      {...rest}
    >
      <ProgressPrimitive.Indicator
        className={cn("size-full rounded-full transition-transform duration-normal ease-standard", named)}
        style={{
          transform: `translateX(-${100 - clamped}%)`,
          backgroundColor: named ? undefined : appearance,
        }}
      />
    </ProgressPrimitive.Root>
  );
});
