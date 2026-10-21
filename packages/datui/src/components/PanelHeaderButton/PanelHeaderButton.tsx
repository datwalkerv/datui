import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export interface PanelHeaderButtonProps extends Omit<TappableProps, "feedback" | "activated"> {
  /** Visible text next to (or instead of) the icon. */
  label?: React.ReactNode;
  /** Accent color and semibold label for the main action. */
  primary?: boolean;
  /** Merge behavior and styles onto the single child element (e.g. a router link). */
  asChild?: boolean;
}

const base =
  "inline-flex min-h-control-l min-w-control-l shrink-0 items-center justify-center gap-1 rounded-md px-2 text-body no-underline [&_svg]:size-icon-md";

/** Icon and/or text button for the `before`/`after` slots of `PanelHeader`. Icon-only buttons need `aria-label`. */
export const PanelHeaderButton = React.forwardRef<HTMLElement, PanelHeaderButtonProps>(function PanelHeaderButton(
  { label, primary = false, asChild = false, className, children, ...rest },
  ref,
) {
  const classes = cn(base, primary ? "font-semibold text-primary" : "text-foreground", className);
  if (asChild) {
    return (
      <Slot.Root ref={ref} className={cn(classes, "focus-visible:focus-ring outline-none")} {...rest}>
        {children}
      </Slot.Root>
    );
  }
  return (
    <Tappable ref={ref} as={rest.href ? "a" : "button"} className={classes} {...rest}>
      {children}
      {label !== undefined && label !== null && <span className="truncate">{label}</span>}
    </Tappable>
  );
});
