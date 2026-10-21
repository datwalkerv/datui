import * as React from "react";
import { cn } from "../../lib/utils";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** @default "footer" */
  as?: React.ElementType;
}

/**
 * Centered secondary text at the end of a list or section, e.g. "12 items". Adds no landmark role;
 * a `<footer>` is only a `contentinfo` landmark when it is page-level.
 */
export const Footer = React.forwardRef<HTMLElement, FooterProps>(function Footer(
  { as: Component = "footer", className, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn("block px-4 py-4 text-center text-footnote text-muted-foreground", className)}
      {...rest}
    />
  );
});
