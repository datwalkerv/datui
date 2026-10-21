import * as React from "react";
import { cn } from "../../lib/utils";

export interface FixedLayoutProps extends React.HTMLAttributes<HTMLElement> {
  /** Edge to pin to. @default "top" */
  vertical?: "top" | "bottom";
  /** Paint the panel background behind the content. */
  filled?: boolean;
  /** @default "div" */
  as?: React.ElementType;
}

/**
 * Pins content to the top or bottom of its panel or column while the rest scrolls (sticky positioning, so it always
 * matches the parent's width). The bottom variant pads for the device safe area.
 */
export const FixedLayout = React.forwardRef<HTMLElement, FixedLayoutProps>(function FixedLayout(
  { vertical = "top", filled = false, as: Component = "div", className, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      data-vertical={vertical}
      className={cn(
        "sticky z-fixed w-full",
        vertical === "top" ? "top-0" : "bottom-0 pb-[env(safe-area-inset-bottom)]",
        filled && "bg-background",
        className,
      )}
      {...rest}
    />
  );
});
