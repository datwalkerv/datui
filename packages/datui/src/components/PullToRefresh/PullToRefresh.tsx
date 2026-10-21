import * as React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PullToRefreshSpinner } from "../../internal/PullToRefreshSpinner/PullToRefreshSpinner";
import { useTouch } from "../../internal/Touch/useTouch";
import { cn } from "../../lib/utils";

export interface PullToRefreshProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Called once per completed pull, or when the refresh button is activated. */
  onRefresh: () => void;
  /** Set while data loads; the spinner stays until it turns false (and for at least a short moment). */
  isFetching?: boolean;
  /** Label of the refresh button shown to keyboard and assistive-tech users. @default "Refresh" */
  refreshLabel?: string;
  /** Announced while refreshing. @default "Refreshing…" */
  refreshingLabel?: string;
  /** Accessible name of the region. @default "Refreshable content" */
  "aria-label"?: string;
}

/** Pull distance (px, after resistance) that triggers a refresh. */
const PULL_THRESHOLD = 64;
const MAX_PULL = 112;
const RESISTANCE = 0.5;
/** Minimum time the spinner stays so a fast refresh doesn't flash. */
const MIN_SPIN_MS = 1000;

const atScrollTop = (node: HTMLElement) => {
  for (let n: HTMLElement | null = node; n; n = n.parentElement) if (n.scrollTop > 0) return false;
  return true;
};

/**
 * Touch pull-down-to-refresh around page content. Mouse and keyboard users get a refresh button that
 * appears on focus; the gesture only runs for touch.
 */
export const PullToRefresh = React.forwardRef<HTMLDivElement, PullToRefreshProps>(function PullToRefresh(
  {
    onRefresh,
    isFetching = false,
    refreshLabel = "Refresh",
    refreshingLabel = "Refreshing…",
    "aria-label": ariaLabel = "Refreshable content",
    className,
    children,
    ...rest
  },
  ref,
) {
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [pull, setPull] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const startedAt = React.useRef(0);
  const pullRef = React.useRef(0);
  const tracking = React.useRef(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const spinning = refreshing || isFetching;
  const busy = React.useRef(spinning);
  busy.current = spinning;
  const onRefreshRef = React.useRef(onRefresh);
  onRefreshRef.current = onRefresh;

  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      setElement(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const trigger = React.useCallback(() => {
    startedAt.current = Date.now();
    setRefreshing(true);
    onRefreshRef.current();
  }, []);

  const setPullDistance = (value: number) => {
    pullRef.current = value;
    setPull(value);
  };

  useTouch(element, {
    mouse: false,
    onStart: () => {
      tracking.current = !busy.current && element !== null && atScrollTop(element);
    },
    onMove: (g) => {
      if (!tracking.current) return;
      if (g.isSlideX) {
        tracking.current = false;
        return;
      }
      if (!g.isSlideY) return;
      if (g.shiftY <= 0) {
        setPullDistance(0);
        return;
      }
      if (g.originalEvent.cancelable) g.originalEvent.preventDefault();
      setDragging(true);
      setPullDistance(Math.min(MAX_PULL, g.shiftY * RESISTANCE));
    },
    onEnd: () => {
      const shouldRefresh = tracking.current && pullRef.current >= PULL_THRESHOLD;
      tracking.current = false;
      setDragging(false);
      setPullDistance(0);
      if (shouldRefresh) trigger();
    },
  });

  React.useEffect(() => {
    if (!refreshing || isFetching) return;
    const timer = setTimeout(() => setRefreshing(false), Math.max(0, MIN_SPIN_MS - (Date.now() - startedAt.current)));
    return () => clearTimeout(timer);
  }, [refreshing, isFetching]);

  const offset = spinning ? PULL_THRESHOLD : pull;
  const transition = !dragging && !reducedMotion && "transition-transform duration-normal ease-standard";

  return (
    // biome-ignore lint/a11y/useSemanticElements: a labelled region wraps arbitrary content; <section> would add heading expectations.
    <div
      ref={setRootRef}
      role="region"
      aria-label={ariaLabel}
      aria-busy={spinning}
      className={cn("relative overflow-hidden", className)}
      {...rest}
    >
      <button
        type="button"
        disabled={spinning}
        onClick={trigger}
        className="sr-only z-sticky rounded-md bg-secondary px-3 text-subhead text-secondary-foreground focus-visible:not-sr-only focus-visible:absolute focus-visible:start-2 focus-visible:top-2 focus-visible:min-h-control-s focus-visible:focus-ring"
      >
        {refreshLabel}
      </button>
      <span role="status" className="sr-only">
        {spinning ? refreshingLabel : ""}
      </span>
      <div
        data-state={spinning ? "refreshing" : pull > 0 ? "pulling" : "idle"}
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 flex justify-center",
          transition,
          !spinning && pull === 0 && "invisible",
        )}
        style={{ transform: `translateY(${offset / 2}px) translateY(-50%)` }}
      >
        <span className="size-pull-spinner rounded-full bg-card p-1 shadow-md">
          <PullToRefreshSpinner progress={pull / PULL_THRESHOLD} on={spinning} />
        </span>
      </div>
      <div
        className={cn(transition || undefined)}
        style={offset ? { transform: `translateY(${offset}px)` } : undefined}
      >
        {children}
      </div>
    </div>
  );
});
