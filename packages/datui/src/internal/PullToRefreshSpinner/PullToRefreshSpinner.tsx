import { cn } from "../../lib/utils";

export interface PullToRefreshSpinnerProps {
  /** Pull progress 0–1; the arc grows with it. */
  progress?: number;
  /** Spin with a fixed arc (refreshing). */
  on?: boolean;
  className?: string;
}

const RADIUS = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Decorative circular indicator for PullToRefresh. The busy state is announced by the owner. */
export function PullToRefreshSpinner({ progress = 0, on = false, className }: PullToRefreshSpinnerProps) {
  // Cap at 80% so a full pull still reads as a spinner, not a closed ring.
  const arc = (on ? 0.8 : Math.min(Math.max(progress, 0), 1) * 0.8) * CIRCUMFERENCE;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-full text-primary", on && "animate-spin", className)}
      style={on ? undefined : { transform: `rotate(${progress * 270}deg)` }}
    >
      <circle
        cx="12"
        cy="12"
        r={RADIUS}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={`${arc} ${CIRCUMFERENCE}`}
        transform="rotate(-90 12 12)"
      />
    </svg>
  );
}
