import * as React from "react";
import { cn } from "../../lib/utils";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

/** Hides content visually while keeping it available to screen readers. */
export const VisuallyHidden = React.forwardRef<HTMLElement, VisuallyHiddenProps>(function VisuallyHidden(
  { as: Component = "span", className, ...rest },
  ref,
) {
  return <Component ref={ref} className={cn("sr-only", className)} {...rest} />;
});
