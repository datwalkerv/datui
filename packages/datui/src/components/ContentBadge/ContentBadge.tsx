import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

type Size = "s" | "m" | "l";
const SizeContext = React.createContext<Size>("m");

export const contentBadgeVariants = cva(
  "inline-flex max-w-full shrink-0 items-center justify-center gap-0.5 whitespace-nowrap align-middle",
  {
    variants: {
      variant: { primary: "", secondary: "", outline: "border bg-transparent" },
      appearance: { accent: "", neutral: "", positive: "", negative: "", overlay: "", custom: "" },
      size: {
        s: "h-3.5 rounded-xs px-1 text-caption-3",
        m: "h-5 rounded-sm px-1.5 text-caption-1",
        l: "h-6 rounded-sm px-2 text-footnote",
      },
      capsule: { true: "rounded-full", false: "" },
      weight: { "1": "font-semibold", "2": "font-medium", "3": "font-normal" },
      iconOnly: { true: "aspect-square px-0", false: "" },
    },
    compoundVariants: [
      { variant: "primary", appearance: "accent", class: "bg-primary text-primary-foreground" },
      { variant: "primary", appearance: "neutral", class: "bg-muted-foreground text-background" },
      { variant: "primary", appearance: "positive", class: "bg-positive text-positive-foreground" },
      { variant: "primary", appearance: "negative", class: "bg-destructive text-destructive-foreground" },
      { variant: "primary", appearance: "overlay", class: "bg-black/64 text-white" },
      // Filled custom badges read their text color from --dt-content-badge-foreground (white by default).
      {
        variant: "primary",
        appearance: "custom",
        class: "bg-(--dt-content-badge-color) text-[var(--dt-content-badge-foreground,white)]",
      },
      { variant: "secondary", appearance: "accent", class: "bg-accent text-accent-foreground" },
      { variant: "secondary", appearance: "neutral", class: "bg-secondary text-subtle-foreground" },
      { variant: "secondary", appearance: "positive", class: "bg-positive/8 text-positive" },
      { variant: "secondary", appearance: "negative", class: "bg-destructive/8 text-destructive" },
      { variant: "secondary", appearance: "overlay", class: "bg-white/16 text-white" },
      {
        variant: "secondary",
        appearance: "custom",
        class: "bg-(--dt-content-badge-color)/16 text-(--dt-content-badge-color)",
      },
      { variant: "outline", appearance: "accent", class: "border-primary text-primary" },
      { variant: "outline", appearance: "neutral", class: "border-border text-subtle-foreground" },
      { variant: "outline", appearance: "positive", class: "border-positive text-positive" },
      { variant: "outline", appearance: "negative", class: "border-destructive text-destructive" },
      { variant: "outline", appearance: "overlay", class: "border-white/48 text-white" },
      {
        variant: "outline",
        appearance: "custom",
        class: "border-(--dt-content-badge-color) text-(--dt-content-badge-color)",
      },
      { size: "s", capsule: true, class: "rounded-xs" },
    ],
    defaultVariants: { variant: "primary", appearance: "accent", size: "m", capsule: false, weight: "2" },
  },
);

const namedAppearances = new Set(["accent", "neutral", "positive", "negative", "overlay"]);

export interface ContentBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "primary" */
  variant?: "primary" | "secondary" | "outline";
  /** A named intent, or any CSS color (`#rrggbb`, `var(--x)`). Custom colors fill / tint 16% / outline per variant. @default "accent" */
  appearance?: "accent" | "neutral" | "positive" | "negative" | "overlay" | (string & {});
  /** @default "m" */
  size?: Size;
  /** Fully rounded pill. Ignored at size `s`. */
  capsule?: boolean;
  /** Font weight, `1` boldest. @default "2" */
  weight?: "1" | "2" | "3";
}

export type ContentBadgeIconSlotProps = React.HTMLAttributes<HTMLSpanElement>;

/** Icon inside a `ContentBadge`; sized by the badge. Dropped at size `s`. Decorative. */
export const ContentBadgeIconSlot = React.forwardRef<HTMLSpanElement, ContentBadgeIconSlotProps>(
  function ContentBadgeIconSlot({ className, ...rest }, ref) {
    const size = React.useContext(SizeContext);
    if (size === "s") return null;
    return (
      <span
        ref={ref}
        aria-hidden
        className={cn(
          "inline-flex shrink-0",
          size === "m" ? "[&_svg]:size-icon-xs" : "[&_svg]:size-icon-sm",
          className,
        )}
        {...rest}
      />
    );
  },
);

const ContentBadgeRoot = React.forwardRef<HTMLSpanElement, ContentBadgeProps>(function ContentBadge(
  { variant, appearance = "accent", size = "m", capsule, weight, className, style, children, ...rest },
  ref,
) {
  const named = namedAppearances.has(appearance);
  const items = React.Children.toArray(children);
  const iconOnly =
    size !== "s" && items.length > 0 && items.every((c) => React.isValidElement(c) && c.type === ContentBadgeIconSlot);
  return (
    <SizeContext.Provider value={size}>
      <span
        ref={ref}
        className={cn(
          contentBadgeVariants({
            variant,
            appearance: named ? (appearance as "accent") : "custom",
            size,
            capsule,
            weight,
            iconOnly,
          }),
          className,
        )}
        style={named ? style : ({ "--dt-content-badge-color": appearance, ...style } as React.CSSProperties)}
        // A labelled icon-only badge is an image to assistive tech; aria-label is not allowed on a plain span.
        role={iconOnly && rest["aria-label"] ? "img" : undefined}
        {...rest}
      >
        {children}
      </span>
    </SizeContext.Provider>
  );
});

/** Small label pill for status or category, with optional `ContentBadge.IconSlot` icons. */
export const ContentBadge = Object.assign(ContentBadgeRoot, { IconSlot: ContentBadgeIconSlot });
