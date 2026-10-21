import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "../../lib/utils";

export const cardVariants = cva("block rounded-lg text-card-foreground", {
  variants: {
    variant: {
      tint: "bg-secondary",
      shadow: "bg-card shadow-md",
      outline: "border border-border bg-card",
      "outline-tint": "border border-border bg-secondary",
      plain: "bg-card",
    },
  },
  defaultVariants: { variant: "tint" },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  /** Render the single child (e.g. `<li>` or a link) with card styles instead of a `<div>`. */
  asChild?: boolean;
}

/** Plain surface for grouping content. */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant, asChild, className, ...rest },
  ref,
) {
  const Component = asChild ? Slot.Root : "div";
  return <Component ref={ref} className={cn(cardVariants({ variant }), className)} {...rest} />;
});
