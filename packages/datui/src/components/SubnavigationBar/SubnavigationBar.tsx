import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { useTransitionMotion } from "../ConfigProvider/ConfigProvider";
import { useDirection } from "../DirectionProvider/DirectionProvider";

export interface SubnavigationBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Arrow buttons that scroll by a page, on hover-capable pointers when content overflows. @default true */
  showArrows?: boolean;
  /** @default "s" */
  arrowSize?: "s" | "m";
  /** Equal-width items that fit without scrolling. */
  fixed?: boolean;
  /** Remove the side gutters. */
  noPadding?: boolean;
}

/** Fraction of the visible width an arrow press scrolls. */
const PAGE = 0.8;

/** Horizontally scrolling row of `SubnavigationButton`s inside a `<nav>`. Label it with `aria-label`. */
export const SubnavigationBar = React.forwardRef<HTMLElement, SubnavigationBarProps>(function SubnavigationBar(
  { showArrows = true, arrowSize = "s", fixed = false, noPadding = false, className, children, ...rest },
  ref,
) {
  const { hasHover } = useAdaptivity();
  const motion = useTransitionMotion();
  const rtl = useDirection() === "rtl";
  const scroller = React.useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = React.useState({ start: false, end: false });
  const arrows = showArrows && hasHover && !fixed;

  React.useEffect(() => {
    const el = scroller.current;
    if (!el || !arrows) return;
    const update = () => {
      const offset = Math.abs(el.scrollLeft); // negative in RTL
      const max = el.scrollWidth - el.clientWidth;
      setOverflow({ start: offset > 1, end: offset < max - 1 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [arrows]);

  const scroll = (towardsEnd: boolean) => {
    const el = scroller.current;
    if (!el) return;
    const step = el.clientWidth * PAGE * (towardsEnd ? 1 : -1) * (rtl ? -1 : 1);
    el.scrollBy?.({ left: step, behavior: motion ? "smooth" : "auto" });
  };

  const arrow = (side: "start" | "end") => {
    const Icon = side === "start" ? ChevronLeft : ChevronRight;
    return (
      // Arrows are a pointer convenience; keyboard users Tab through the items, which scroll into view.
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        data-arrow={side}
        onClick={() => scroll(side === "end")}
        className={cn(
          "absolute top-1/2 z-1 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background text-foreground shadow-md",
          side === "start" ? "start-1" : "end-1",
          arrowSize === "s" ? "size-control-s" : "size-control-m",
        )}
      >
        <Icon className="size-icon-sm rtl:-scale-x-100" />
      </button>
    );
  };

  return (
    <nav ref={ref} className={cn("relative w-full", className)} {...rest}>
      <div
        ref={scroller}
        className={cn(
          "flex gap-2 py-2",
          !noPadding && "px-4",
          fixed ? "[&>*]:flex-1" : "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {children}
      </div>
      {arrows && overflow.start && arrow("start")}
      {arrows && overflow.end && arrow("end")}
    </nav>
  );
});
