import * as React from "react";
import { cn } from "../../lib/utils";
import {
  HorizontalScroll,
  type HorizontalScrollProps,
  type HorizontalScrollStep,
} from "../HorizontalScroll/HorizontalScroll";

export interface CardScrollProps
  extends Omit<HorizontalScrollProps, "contentAs" | "getScrollToPrev" | "getScrollToNext"> {
  /** Width of each card. `false` keeps each card's own width. @default "s" */
  size?: "s" | "m" | "l" | false;
  /** Adds inline gutters before the first and after the last card. @default false */
  padding?: boolean;
}

const sizeClass = {
  s: "*:w-card-scroll-s",
  m: "*:w-card-scroll-m",
  l: "*:w-card-scroll-l",
};

// One arrow click moves by one card (its width plus the gap), never less than one card.
const cardStep =
  (dir: 1 | -1): HorizontalScrollStep =>
  (pos, viewport) => {
    const list = viewport.firstElementChild;
    const first = list?.firstElementChild as HTMLElement | null | undefined;
    if (!list || !first) return pos;
    const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0;
    return pos + dir * (first.offsetWidth + gap);
  };
const toPrev = cardStep(-1);
const toNext = cardStep(1);

/**
 * Horizontally scrolling row of cards rendered as a list. Each child becomes a list item,
 * cards snap to the start edge and arrows move by one card.
 */
export const CardScroll = React.forwardRef<HTMLDivElement, CardScrollProps>(function CardScroll(
  { size = "s", padding = false, contentClassName, viewportClassName, children, ...rest },
  ref,
) {
  return (
    <HorizontalScroll
      ref={ref}
      contentAs="ul"
      getScrollToPrev={toPrev}
      getScrollToNext={toNext}
      viewportClassName={cn("snap-x snap-mandatory", padding && "scroll-px-3", viewportClassName)}
      contentClassName={cn(
        "m-0 list-none gap-2 p-0 *:shrink-0 *:snap-start",
        padding && "px-3",
        size && sizeClass[size],
        contentClassName,
      )}
      {...rest}
    >
      {React.Children.map(children, (child) =>
        child === null || child === undefined || child === false ? null : <li>{child}</li>,
      )}
    </HorizontalScroll>
  );
});
