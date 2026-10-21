import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { Portal } from "../../lib/portal";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { Button } from "../Button/Button";
import { useTransitionMotion } from "../ConfigProvider/ConfigProvider";

export type SnackbarCloseReason = "swipe" | "timeout" | "click-action" | "escape-key";
export type SnackbarPlacement = "top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end";

export interface SnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Controlled visibility. Mount the Snackbar to show it, or drive it with `open`. */
  open?: boolean;
  /** @default true */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: (reason: SnackbarCloseReason) => void;
  /** Called after the exit animation; unmount the Snackbar here. */
  onClosed?: () => void;
  /** The message. */
  children?: React.ReactNode;
  /** Second line of text. */
  subtitle?: React.ReactNode;
  /** Label of the action button. Clicking it closes the Snackbar. */
  action?: React.ReactNode;
  onActionClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Icon or avatar before the text. */
  before?: React.ReactNode;
  /** Content after the text and action. */
  after?: React.ReactNode;
  /** `vertical` puts the action under the text. @default "horizontal" */
  layout?: "horizontal" | "vertical";
  /** @default "default" */
  mode?: "default" | "dark";
  /** Compact width maps `top-*` to `top` and `bottom` to `bottom-start`. @default "bottom-start" */
  placement?: SnackbarPlacement;
  /** Milliseconds before closing on its own; `null` keeps it until dismissed. Paused while hovered or focused. @default 4000 */
  duration?: number | null;
}

/** Distance in px a swipe has to travel to dismiss. */
const SWIPE_DISTANCE = 48;

const positions: Record<SnackbarPlacement, string> = {
  "top-start": "top-0 start-0 items-start",
  top: "top-0 inset-x-0 items-center",
  "top-end": "top-0 end-0 items-end",
  "bottom-start": "bottom-0 start-0 items-start",
  bottom: "bottom-0 inset-x-0 items-center",
  "bottom-end": "bottom-0 end-0 items-end",
};

/** Temporary notification with an optional action. Auto-hides; swipe or Escape dismisses it. */
export interface SnackbarBasicProps
  extends Pick<SnackbarProps, "subtitle" | "action" | "onActionClick" | "before" | "after" | "layout" | "mode">,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
}

/** The snackbar surface without positioning, timers or gestures — for inline use or custom toast hosts. */
export const SnackbarBasic = React.forwardRef<HTMLDivElement, SnackbarBasicProps>(function SnackbarBasic(
  {
    children,
    subtitle,
    action,
    onActionClick,
    before,
    after,
    layout = "horizontal",
    mode = "default",
    className,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-3 rounded-xl px-4 py-3 shadow-md",
        mode === "dark" ? "bg-snackbar-dark text-snackbar-dark-foreground" : "bg-popover text-popover-foreground",
        layout === "vertical" ? "flex-col" : "items-center",
        className,
      )}
      {...rest}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {before && <span className="inline-flex shrink-0">{before}</span>}
        <div className="min-w-0 flex-1">
          <div className="text-subhead">{children}</div>
          {subtitle && <div className="text-footnote opacity-70">{subtitle}</div>}
        </div>
      </div>
      {action && (
        <Button
          variant="tertiary"
          size="s"
          className={cn("shrink-0", layout === "vertical" && "self-start px-0")}
          onClick={onActionClick}
        >
          {action}
        </Button>
      )}
      {after && <span className="inline-flex shrink-0">{after}</span>}
    </div>
  );
});

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(function Snackbar(
  {
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    onClose,
    onClosed,
    children,
    subtitle,
    action,
    onActionClick,
    before,
    after,
    layout = "horizontal",
    mode = "default",
    placement: placementProp = "bottom-start",
    duration = 4000,
    className,
    style,
    ...rest
  },
  ref,
) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const [rendered, setRendered] = React.useState(open);
  const [paused, setPaused] = React.useState(false);
  const [drag, setDrag] = React.useState<{ x: number; y: number } | null>(null);
  const start = React.useRef<{ x: number; y: number } | null>(null);
  const motion = useTransitionMotion();
  const compact = useAdaptivity().sizeX === "compact";
  const placement: SnackbarPlacement = compact
    ? placementProp.startsWith("top")
      ? "top"
      : placementProp === "bottom"
        ? "bottom-start"
        : placementProp
    : placementProp;
  const onTop = placement.startsWith("top");
  const horizontalSwipe = placement !== "top" && placement !== "bottom";

  const closeRef = React.useRef<(reason: SnackbarCloseReason) => void>(() => {});
  closeRef.current = (reason) => {
    if (!open) return;
    onClose?.(reason);
    setOpen(false);
  };
  const onClosedRef = React.useRef(onClosed);
  onClosedRef.current = onClosed;
  const finish = React.useCallback(() => {
    setRendered(false);
    onClosedRef.current?.();
  }, []);

  React.useEffect(() => {
    if (open) setRendered(true);
    else if (!motion) finish();
  }, [open, motion, finish]);

  React.useEffect(() => {
    if (!open || paused || duration === null) return;
    const timer = setTimeout(() => closeRef.current("timeout"), duration);
    return () => clearTimeout(timer);
  }, [open, paused, duration]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current("escape-key");
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!rendered && !open) return null;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    start.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
    setPaused(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const dy = e.clientY - start.current.y;
    // Vertical drags only count toward the screen edge.
    setDrag({ x: horizontalSwipe ? e.clientX - start.current.x : 0, y: onTop ? Math.min(dy, 0) : Math.max(dy, 0) });
  };
  const onPointerUp = () => {
    if (!start.current) return;
    start.current = null;
    setPaused(false);
    if (drag && Math.max(Math.abs(drag.x), Math.abs(drag.y)) >= SWIPE_DISTANCE) closeRef.current("swipe");
    else setDrag(null);
  };

  return (
    <Portal>
      <div
        role="presentation"
        className={cn(
          "pointer-events-none fixed z-snackbar flex p-4",
          positions[placement],
          compact && "inset-x-0 items-stretch",
        )}
      >
        <SnackbarBasic
          ref={ref}
          before={before}
          after={after}
          subtitle={subtitle}
          action={action}
          layout={layout}
          mode={mode}
          onActionClick={(e) => {
            onActionClick?.(e);
            closeRef.current("click-action");
          }}
          role="status"
          aria-live="polite"
          data-state={open ? "open" : "closed"}
          className={cn(
            "pointer-events-auto w-full touch-none select-none",
            !compact && "max-w-snackbar",
            open ? "animate-fade-in" : "animate-fade-out",
            !drag && "transition-transform duration-fast",
            className,
          )}
          style={{
            transform: drag ? `translate(${drag.x}px, ${drag.y}px)` : undefined,
            ...style,
          }}
          onAnimationEnd={(e) => {
            if (!open && e.target === e.currentTarget) finish();
          }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => !start.current && setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          {...rest}
        >
          {children}
        </SnackbarBasic>
      </div>
    </Portal>
  );
});
