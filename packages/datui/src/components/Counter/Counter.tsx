import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

export const counterVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-medium tabular-nums leading-none",
  {
    variants: {
      variant: { primary: "", contrast: "", tertiary: "bg-transparent", inherit: "bg-current/16" },
      appearance: { accent: "", neutral: "", positive: "", negative: "", custom: "" },
      size: { s: "h-4 min-w-4 px-1 text-caption-2", m: "h-5 min-w-5 px-1.5 text-caption-1" },
    },
    compoundVariants: [
      { variant: "primary", appearance: "accent", class: "bg-primary text-primary-foreground" },
      { variant: "primary", appearance: "neutral", class: "bg-muted-foreground text-background" },
      { variant: "primary", appearance: "positive", class: "bg-positive text-positive-foreground" },
      { variant: "primary", appearance: "negative", class: "bg-destructive text-destructive-foreground" },
      {
        variant: "primary",
        appearance: "custom",
        class: "bg-(--dt-counter-color) text-[var(--dt-counter-foreground,white)]",
      },
      { variant: ["contrast", "tertiary"], appearance: "accent", class: "text-primary" },
      { variant: ["contrast", "tertiary"], appearance: "neutral", class: "text-subtle-foreground" },
      { variant: ["contrast", "tertiary"], appearance: "positive", class: "text-positive" },
      { variant: ["contrast", "tertiary"], appearance: "negative", class: "text-destructive" },
      // The pill takes the intent's on-color, so it inverts correctly when the intent color is light (dark theme).
      { variant: "contrast", appearance: "accent", class: "bg-primary-foreground" },
      { variant: "contrast", appearance: "neutral", class: "bg-background" },
      { variant: "contrast", appearance: "positive", class: "bg-positive-foreground" },
      { variant: "contrast", appearance: "negative", class: "bg-destructive-foreground" },
      { variant: "contrast", appearance: "custom", class: "bg-[var(--dt-counter-foreground,white)]" },
      { variant: ["contrast", "tertiary"], appearance: "custom", class: "text-(--dt-counter-color)" },
    ],
    defaultVariants: { variant: "primary", appearance: "accent", size: "m" },
  },
);

export interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `primary` filled, `contrast` inverted pill for colored surfaces, `tertiary` text only, `inherit` tinted with the current color. @default "primary" */
  variant?: "primary" | "contrast" | "tertiary" | "inherit";
  /** @default "accent" */
  appearance?: "accent" | "neutral" | "positive" | "negative" | "custom";
  /**
   * Any CSS color; used when `appearance="custom"`. Set `--dt-counter-foreground` for the text on filled custom
   * counters (and the pill of `contrast` ones); it defaults to white. Pick values with 4.5:1 contrast per theme.
   */
  color?: string;
  /** @default "m" */
  size?: "s" | "m";
}

/**
 * Small count pill, e.g. unread items. Renders nothing without children. The number alone has no
 * context for screen readers — add visually hidden text such as "unread" next to it.
 */
export const Counter = React.forwardRef<HTMLSpanElement, CounterProps>(function Counter(
  { variant, appearance, color, size, className, style, children, ...rest },
  ref,
) {
  if (children === undefined || children === null || children === "" || children === false) return null;
  const custom =
    appearance === "custom" && color ? ({ "--dt-counter-color": color } as React.CSSProperties) : undefined;
  return (
    <span
      ref={ref}
      className={cn(counterVariants({ variant, appearance, size }), className)}
      style={{ ...custom, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
});
