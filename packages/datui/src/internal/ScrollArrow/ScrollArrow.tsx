import { ChevronLeft } from "lucide-react";
import * as React from "react";
import { Tappable, type TappableProps } from "../../components/Tappable/Tappable";
import { cn } from "../../lib/utils";

export type ScrollArrowDirection = "up" | "right" | "down" | "left";

export interface ScrollArrowProps extends Omit<TappableProps, "as" | "feedback"> {
  /** Physical direction the chevron points to. */
  direction: ScrollArrowDirection;
  /** @default "m" */
  size?: "s" | "m";
  /** Accessible name. Without it the arrow is hidden from assistive tech and the tab order. */
  label?: string;
}

const rotate: Record<ScrollArrowDirection, string> = {
  left: "",
  up: "rotate-90",
  right: "rotate-180",
  down: "-rotate-90",
};

/** Round chevron button used to page a scroll strip or carousel. Positioning is up to the owner. */
export const ScrollArrow = React.forwardRef<HTMLElement, ScrollArrowProps>(function ScrollArrow(
  { direction, size = "m", label, className, children, ...rest },
  ref,
) {
  return (
    <Tappable
      ref={ref}
      as="button"
      feedback="background"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      tabIndex={label ? undefined : -1}
      data-direction={direction}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-scroll-arrow text-scroll-arrow-foreground shadow-md",
        size === "s" ? "size-control-s" : "size-control-l",
        className,
      )}
      {...rest}
    >
      {children ?? (
        <ChevronLeft aria-hidden className={cn(size === "s" ? "size-icon-sm" : "size-icon-lg", rotate[direction])} />
      )}
    </Tappable>
  );
});
