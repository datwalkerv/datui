import * as React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ScrollArrow } from "../../internal/ScrollArrow/ScrollArrow";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { useDirection } from "../DirectionProvider/DirectionProvider";

/**
 * Returns the next logical scroll offset (distance from the inline start, always ≥ 0, RTL included)
 * given the current offset and the scrolling viewport.
 */
export type HorizontalScrollStep = (position: number, viewport: HTMLElement) => number;

export interface HorizontalScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `true` shows arrows on devices with a fine pointer, `"always"` on every device. @default true */
  showArrows?: boolean | "always";
  /** @default "m" */
  arrowSize?: "s" | "m";
  /** Distance of the arrows from the inline edges (CSS length or px). */
  arrowOffsetX?: number | string;
  /** Vertical shift of the arrows from the center (CSS length or px). */
  arrowOffsetY?: number | string;
  /** Target offset for the "previous" arrow. Defaults to one viewport width back. */
  getScrollToPrev?: HorizontalScrollStep;
  /** Target offset for the "next" arrow. Defaults to one viewport width forward. */
  getScrollToNext?: HorizontalScrollStep;
  /** Map vertical mouse-wheel movement to horizontal scrolling. Shift+wheel always works natively. @default false */
  scrollOnAnyWheel?: boolean;
  /** Element rendered inside the viewport around the children, e.g. `"ul"`. @default "div" */
  contentAs?: React.ElementType;
  contentClassName?: string;
  /** Classes for the scrolling viewport element. */
  viewportClassName?: string;
  /** Ref to the scrolling viewport element. */
  viewportRef?: React.Ref<HTMLDivElement>;
}

const pageStep =
  (dir: 1 | -1): HorizontalScrollStep =>
  (pos, viewport) =>
    pos + dir * viewport.clientWidth;
const defaultPrev = pageStep(-1);
const defaultNext = pageStep(1);

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as React.RefObject<T | null>).current = value;
}

/**
 * Horizontal strip that scrolls natively (touch, trackpad, Shift+wheel, keyboard on the focusable viewport)
 * and adds prev/next arrows for pointer users. Arrows hide at the start/end.
 */
export const HorizontalScroll = React.forwardRef<HTMLDivElement, HorizontalScrollProps>(function HorizontalScroll(
  {
    showArrows = true,
    arrowSize = "m",
    arrowOffsetX = 0,
    arrowOffsetY = 0,
    getScrollToPrev = defaultPrev,
    getScrollToNext = defaultNext,
    scrollOnAnyWheel = false,
    contentAs: Content = "div",
    contentClassName,
    viewportClassName,
    viewportRef,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [viewport, setViewport] = React.useState<HTMLDivElement | null>(null);
  const [edges, setEdges] = React.useState({ prev: false, next: false });
  const rtl = useDirection() === "rtl";
  const { hasPointer } = useAdaptivity();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const attachViewport = React.useCallback(
    (node: HTMLDivElement | null) => {
      setViewport(node);
      setRef(viewportRef, node);
    },
    [viewportRef],
  );

  React.useEffect(() => {
    if (!viewport) return;
    const update = () => {
      // RTL browsers report negative scrollLeft; work with the distance from the inline start.
      const pos = Math.abs(viewport.scrollLeft);
      const max = viewport.scrollWidth - viewport.clientWidth;
      setEdges((prev) => {
        const next = { prev: pos > 1, next: pos < max - 1 };
        return prev.prev === next.prev && prev.next === next.next ? prev : next;
      });
    };
    update();
    viewport.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    if (viewport.firstElementChild) observer.observe(viewport.firstElementChild);
    return () => {
      viewport.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [viewport]);

  React.useEffect(() => {
    if (!viewport || !scrollOnAnyWheel) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const pos = Math.abs(viewport.scrollLeft);
      const max = viewport.scrollWidth - viewport.clientWidth;
      // Let the page scroll once the strip is at the matching edge.
      if ((event.deltaY < 0 && pos <= 0) || (event.deltaY > 0 && pos >= max)) return;
      event.preventDefault();
      viewport.scrollLeft += rtl ? -event.deltaY : event.deltaY;
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [viewport, scrollOnAnyWheel, rtl]);

  const scrollBy = (step: HorizontalScrollStep) => {
    if (!viewport) return;
    const max = viewport.scrollWidth - viewport.clientWidth;
    const target = Math.min(max, Math.max(0, step(Math.abs(viewport.scrollLeft), viewport)));
    viewport.scrollTo({ left: rtl ? -target : target, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const arrowsAllowed = showArrows === "always" || (showArrows && hasPointer);
  const offsetY = typeof arrowOffsetY === "number" ? `${arrowOffsetY}px` : arrowOffsetY;
  const top = `calc(50% + ${offsetY})`;
  const arrowClass = "absolute z-sticky -translate-y-1/2";

  return (
    <div ref={ref} className={cn("relative", className)} {...rest}>
      <div
        ref={attachViewport}
        // Focusable only when there is something to scroll, so keyboard users can use arrow keys.
        tabIndex={edges.prev || edges.next ? 0 : undefined}
        className={cn(
          "scrollbar-none overflow-x-auto overflow-y-hidden overscroll-x-contain outline-none focus-visible:focus-ring",
          viewportClassName,
        )}
      >
        <Content className={cn("flex w-max min-w-full", contentClassName)}>{children}</Content>
      </div>
      {arrowsAllowed && edges.prev && (
        <ScrollArrow
          direction={rtl ? "right" : "left"}
          size={arrowSize}
          className={arrowClass}
          style={{ top, insetInlineStart: arrowOffsetX }}
          onClick={() => scrollBy(getScrollToPrev)}
          data-arrow="prev"
        />
      )}
      {arrowsAllowed && edges.next && (
        <ScrollArrow
          direction={rtl ? "left" : "right"}
          size={arrowSize}
          className={arrowClass}
          style={{ top, insetInlineEnd: arrowOffsetX }}
          onClick={() => scrollBy(getScrollToNext)}
          data-arrow="next"
        />
      )}
    </div>
  );
});
