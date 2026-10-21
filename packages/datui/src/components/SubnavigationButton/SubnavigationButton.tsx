import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export const subnavigationButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium no-underline [&_svg]:size-icon-sm",
  {
    variants: {
      variant: { primary: "", outline: "border", tertiary: "bg-transparent" },
      appearance: { accent: "", neutral: "" },
      size: {
        s: "min-h-control-s px-2.5 text-footnote",
        m: "min-h-control-m px-3 text-subhead",
        l: "min-h-control-l px-4 text-body",
      },
      selected: { true: "", false: "" },
    },
    compoundVariants: [
      { variant: "primary", selected: false, class: "bg-secondary text-foreground" },
      { variant: "primary", selected: true, appearance: "accent", class: "bg-primary text-primary-foreground" },
      { variant: "primary", selected: true, appearance: "neutral", class: "bg-foreground text-background" },
      { variant: "outline", selected: false, class: "border-border text-foreground" },
      { variant: "outline", selected: true, appearance: "accent", class: "border-primary bg-primary/12 text-primary" },
      { variant: "outline", selected: true, appearance: "neutral", class: "border-foreground text-foreground" },
      { variant: "tertiary", selected: false, class: "text-muted-foreground" },
      { variant: "tertiary", selected: true, appearance: "accent", class: "bg-primary/12 text-primary" },
      { variant: "tertiary", selected: true, appearance: "neutral", class: "bg-secondary text-foreground" },
    ],
    defaultVariants: { variant: "primary", appearance: "accent", size: "m", selected: false },
  },
);

export interface SubnavigationButtonProps extends Omit<TappableProps, "feedback" | "activated"> {
  /** @default "primary" */
  variant?: "primary" | "outline" | "tertiary";
  /** Color of the selected state. @default "accent" */
  appearance?: "accent" | "neutral";
  /** @default "m" */
  size?: "s" | "m" | "l";
  /** Toggle state; exposed as `aria-pressed` on buttons. Leave undefined for plain actions. */
  selected?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
  /** Show a down chevron (the button opens a menu; pass `aria-haspopup`/`aria-expanded`). */
  chevron?: boolean;
}

/** Chip-like filter or section button for `SubnavigationBar`. */
export const SubnavigationButton = React.forwardRef<HTMLElement, SubnavigationButtonProps>(function SubnavigationButton(
  { variant, appearance, size, selected, before, after, chevron = false, className, children, ...rest },
  ref,
) {
  const link = Boolean(rest.href);
  return (
    <Tappable
      ref={ref}
      as={link ? "a" : "button"}
      aria-pressed={!link && selected !== undefined ? selected : undefined}
      aria-current={link && selected ? "page" : undefined}
      data-selected={selected || undefined}
      className={cn(subnavigationButtonVariants({ variant, appearance, size, selected: Boolean(selected) }), className)}
      {...rest}
    >
      {before && (
        <span aria-hidden className="inline-flex shrink-0">
          {before}
        </span>
      )}
      <span>{children}</span>
      {after && <span className="inline-flex shrink-0">{after}</span>}
      {chevron && <ChevronDown aria-hidden data-chevron="" />}
    </Tappable>
  );
});
