import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

export const gradientVariants = cva("to-transparent", {
  variants: {
    /** `default` fades the page background, `tint` the secondary background, `overlay` a dark scrim. */
    variant: { default: "from-background", tint: "from-background-secondary", overlay: "from-overlay" },
    /** Direction the gradient fades toward (its transparent end). */
    to: { top: "bg-linear-to-t", bottom: "bg-linear-to-b" },
  },
  defaultVariants: { variant: "default", to: "top" },
});

export interface GradientProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gradientVariants> {}

/** Background fade block, e.g. behind content over an image. Purely decorative; text on `overlay` must keep contrast. */
export const Gradient = React.forwardRef<HTMLDivElement, GradientProps>(function Gradient(
  { variant, to, className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(gradientVariants({ variant, to }), className)} {...rest} />;
});
