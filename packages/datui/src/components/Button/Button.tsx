import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Spinner } from "../Spinner/Spinner";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap no-underline",
  {
    variants: {
      variant: { primary: "", secondary: "", tertiary: "bg-transparent", outline: "border bg-transparent", link: "" },
      appearance: { accent: "", positive: "", negative: "", neutral: "", overlay: "" },
      size: {
        s: "min-h-control-s px-3 text-subhead",
        m: "min-h-control-m px-4 text-subhead",
        l: "min-h-control-l px-5 text-body",
      },
      stretched: { true: "w-full", false: "" },
      align: { left: "justify-start", center: "justify-center", right: "justify-end" },
      rounded: { true: "rounded-full", false: "" },
      iconOnly: { true: "aspect-square px-0", false: "" },
    },
    compoundVariants: [
      { variant: "primary", appearance: "accent", class: "bg-primary text-primary-foreground" },
      { variant: "primary", appearance: "positive", class: "bg-positive text-positive-foreground" },
      { variant: "primary", appearance: "negative", class: "bg-destructive text-destructive-foreground" },
      { variant: "primary", appearance: "neutral", class: "bg-foreground text-background" },
      { variant: "primary", appearance: "overlay", class: "bg-white text-black" },
      { variant: "secondary", appearance: "accent", class: "bg-secondary text-secondary-foreground" },
      { variant: "secondary", appearance: "positive", class: "bg-positive/8 text-positive" },
      { variant: "secondary", appearance: "negative", class: "bg-destructive/8 text-destructive" },
      { variant: "secondary", appearance: "neutral", class: "bg-secondary text-foreground" },
      { variant: "secondary", appearance: "overlay", class: "bg-white/16 text-white" },
      { variant: ["tertiary", "outline", "link"], appearance: "accent", class: "text-primary" },
      { variant: ["tertiary", "outline", "link"], appearance: "positive", class: "text-positive" },
      { variant: ["tertiary", "outline", "link"], appearance: "negative", class: "text-destructive" },
      { variant: ["tertiary", "outline", "link"], appearance: "neutral", class: "text-foreground" },
      { variant: ["tertiary", "outline", "link"], appearance: "overlay", class: "text-white" },
      { variant: "outline", class: "border-current/40" },
      { variant: "link", class: "min-h-0 px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "accent",
      size: "m",
      stretched: false,
      align: "center",
      rounded: false,
      iconOnly: false,
    },
  },
);

export interface ButtonProps
  extends Omit<TappableProps, "feedback" | "activated">,
    Omit<VariantProps<typeof buttonVariants>, "iconOnly"> {
  /** Content before the label, usually an icon. */
  before?: React.ReactNode;
  /** Content after the label, e.g. an icon or `Counter`. */
  after?: React.ReactNode;
  /** Shows a spinner, blocks activation and sets `aria-busy`. */
  loading?: boolean;
  /** Accessible label announced while loading. @default "Loading…" */
  loadingLabel?: string;
}

/**
 * The main action control. Renders `<button>` by default and `<a>` when given `href`.
 * Icon-only buttons (no children) need an `aria-label`.
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    variant,
    appearance,
    size,
    stretched,
    align,
    rounded,
    before,
    after,
    loading = false,
    loadingLabel = "Loading…",
    disabled,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const hasLabel = children !== undefined && children !== null && children !== false;
  const iconOnly = !hasLabel && Boolean(before) !== Boolean(after);
  return (
    <Tappable
      ref={ref}
      as={rest.href ? "a" : "button"}
      feedback={variant === "link" ? "opacity" : "background"}
      disabled={disabled}
      aria-busy={loading || undefined}
      onClick={loading ? (e: React.MouseEvent<HTMLElement>) => e.preventDefault() : onClick}
      className={cn(buttonVariants({ variant, appearance, size, stretched, align, rounded, iconOnly }), className)}
      {...rest}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size={size === "l" ? "m" : "s"} label={loadingLabel} />
        </span>
      )}
      <span className={cn("contents", loading && "[&>*]:invisible")}>
        {before && (
          <span className="inline-flex shrink-0" aria-hidden={hasLabel || undefined}>
            {before}
          </span>
        )}
        {hasLabel && <span className="min-w-0 truncate">{children}</span>}
        {after && <span className="inline-flex shrink-0">{after}</span>}
      </span>
    </Tappable>
  );
});
