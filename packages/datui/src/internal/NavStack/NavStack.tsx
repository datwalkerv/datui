import * as React from "react";
import { useDirection } from "../../components/DirectionProvider/DirectionProvider";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsomorphicLayoutEffect";
import { cn } from "../../lib/utils";
import { NavTransitionDirectionProvider, NavTransitionProvider } from "../NavContext/NavContext";

export interface NavTransitionEvent {
  isBack: boolean;
  from: string;
  to: string;
}

export interface NavSwipeOptions {
  /** Id revealed under the current item while swiping back; swipe is off without it. */
  prev?: string;
  onSwipeBack?: () => void;
  onSwipeBackStart?: (active: string | null) => undefined | "prevent";
  onSwipeBackCancel?: () => void;
}

export interface NavStackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  active: string;
  isBack: (from: string, to: string) => boolean;
  animate: boolean;
  /** `back` restores saved scroll only when navigating back; `always` on every switch (tabs). */
  restoreScroll: "back" | "always";
  onTransition?: (event: NavTransitionEvent) => void;
  swipe?: NavSwipeOptions;
}

/** Fallback for when `animationend` never fires (hidden tab, jsdom). Longer than `--dt-duration-slow`. */
const TRANSITION_TIMEOUT = 600;
const EDGE = 24;
const SLOP = 10;
const VELOCITY = 250;
/** Underlay parallax: the revealed layer starts this fraction of the width behind. */
const PARALLAX = 0.3;

type Swipe = { dx: number; phase: "drag" | "commit" | "cancel" };

function idOf(node: React.ReactNode): string | undefined {
  if (!React.isValidElement<{ id?: unknown }>(node)) return undefined;
  return typeof node.props.id === "string" ? node.props.id : undefined;
}

function scrollParent(el: HTMLElement): HTMLElement | null {
  for (let p = el.parentElement; p; p = p.parentElement) {
    const overflow = getComputedStyle(p).overflowY;
    if (overflow === "auto" || overflow === "scroll") return p;
  }
  return null;
}

const pageScroller = () => document.scrollingElement ?? document.documentElement;
const readScroll = (scroller: HTMLElement | null) => (scroller ?? pageScroller()).scrollTop;

/**
 * Shared engine of Root, View and Epic: renders the active child (plus the outgoing one while animating),
 * remembers scroll per id, moves focus after a switch and optionally drives edge swipe-back.
 */
export const NavStack = React.forwardRef<HTMLDivElement, NavStackProps>(function NavStack(
  { children, active, isBack, animate, restoreScroll, onTransition, swipe, className, ...rest },
  forwardedRef,
) {
  const rtl = useDirection() === "rtl";
  const containerRef = React.useRef<HTMLDivElement>(null);
  const layers = React.useRef(new Map<string, HTMLDivElement>());
  const scrolls = React.useRef(new Map<string, number>());
  const scroller = React.useRef<HTMLElement | null>(null);
  const [state, setState] = React.useState({ active, leaving: null as string | null, back: false, changed: false });
  const [leavingTop, setLeavingTop] = React.useState(0);
  const [swipeState, setSwipeState] = React.useState<Swipe | null>(null);
  const skipNextAnimation = React.useRef(false);
  const callbacks = React.useRef({ onTransition, swipe });
  callbacks.current = { onTransition, swipe };

  // Derived state: switch during render so the outgoing layer is still in the tree on the commit that changes it.
  if (state.active !== active) {
    const back = isBack(state.active, active);
    const run = animate && !skipNextAnimation.current;
    skipNextAnimation.current = false;
    setState({ active, leaving: run ? state.active : null, back, changed: true });
    if (swipeState) setSwipeState(null);
  }

  const setRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      containerRef.current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    },
    [forwardedRef],
  );

  // Remember the scroll position of whatever is active.
  const activeRef = React.useRef(state.active);
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    scroller.current = scrollParent(el);
    const target: HTMLElement | Window = scroller.current ?? window;
    const onScroll = () => scrolls.current.set(activeRef.current, readScroll(scroller.current));
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  const pending = React.useRef<NavTransitionEvent | null>(null);

  const finish = React.useCallback(() => {
    const done = pending.current;
    if (!done) return;
    pending.current = null;
    setState((s) => (s.leaving ? { ...s, leaving: null } : s));
    const layer = layers.current.get(done.to);
    const focused = document.activeElement;
    const container = containerRef.current;
    if (layer && (!focused || focused === document.body || container?.contains(focused))) {
      const heading = layer.querySelector<HTMLElement>("[data-nav-title]");
      (heading ?? layer).focus({ preventScroll: true });
    }
    callbacks.current.onTransition?.(done);
  }, []);

  // React to a committed switch: save/restore scroll, release focus from the outgoing layer, schedule the end.
  const lastActive = React.useRef(state.active);
  useIsomorphicLayoutEffect(() => {
    const from = lastActive.current;
    const to = state.active;
    if (from === to) return;
    lastActive.current = to;
    activeRef.current = to;
    const fromScroll = scrolls.current.get(from) ?? readScroll(scroller.current);
    scrolls.current.set(from, fromScroll);
    const el = scroller.current ?? pageScroller();
    el.scrollTop = restoreScroll === "always" || state.back ? (scrolls.current.get(to) ?? 0) : 0;
    const toScroll = el.scrollTop;
    scrolls.current.set(to, toScroll);
    const outgoing = layers.current.get(from);
    const focused = document.activeElement;
    if (outgoing && focused instanceof HTMLElement && outgoing.contains(focused)) focused.blur();
    pending.current = { isBack: state.back, from, to };
    if (!state.leaving) {
      finish();
      return;
    }
    // Keep the outgoing layer visually where it was while the scroll container jumped.
    setLeavingTop(toScroll - fromScroll);
    const timer = setTimeout(finish, TRANSITION_TIMEOUT);
    return () => clearTimeout(timer);
  }, [state.active]);

  // Edge swipe-back (touch only).
  const swipePrev = swipe?.prev;
  const swipeRef = React.useRef(swipeState);
  swipeRef.current = swipeState;
  const busy = Boolean(state.leaving);
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !swipePrev || busy) return;
    const sign = rtl ? -1 : 1;
    let start: { x: number; y: number } | null = null;
    let dragging = false;
    let last = { dx: 0, t: 0 };
    let velocity = 0;

    const reset = () => {
      start = null;
      dragging = false;
      velocity = 0;
    };
    const onStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (e.touches.length !== 1 || !touch || swipeRef.current) return;
      const rect = el.getBoundingClientRect();
      const fromEdge = rtl ? rect.right - touch.clientX : touch.clientX - rect.left;
      if (fromEdge > EDGE) return;
      if (e.target instanceof Element && e.target.closest("[data-no-swipe-back]")) return;
      start = { x: touch.clientX, y: touch.clientY };
      last = { dx: 0, t: e.timeStamp };
    };
    const onMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!start || !touch) return;
      const dx = (touch.clientX - start.x) * sign;
      const dy = touch.clientY - start.y;
      if (!dragging) {
        if (Math.abs(dy) > SLOP && Math.abs(dy) > Math.abs(dx)) return reset();
        if (dx < SLOP) return;
        if (callbacks.current.swipe?.onSwipeBackStart?.(activeRef.current) === "prevent") return reset();
        dragging = true;
      }
      if (e.cancelable) e.preventDefault();
      const dt = e.timeStamp - last.t;
      if (dt > 0) velocity = ((dx - last.dx) / dt) * 1000;
      last = { dx, t: e.timeStamp };
      setSwipeState({ dx: Math.max(0, dx), phase: "drag" });
    };
    const onEnd = () => {
      if (dragging) {
        const width = el.getBoundingClientRect().width;
        const commit = (width > 0 && last.dx > width / 2) || velocity > VELOCITY;
        setSwipeState({ dx: last.dx, phase: commit ? "commit" : "cancel" });
      }
      reset();
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [swipePrev, busy, rtl]);

  const settled = React.useCallback(() => {
    const s = swipeRef.current;
    if (!s || s.phase === "drag") return;
    setSwipeState(null);
    if (s.phase === "commit") {
      skipNextAnimation.current = true;
      callbacks.current.swipe?.onSwipeBack?.();
    } else {
      callbacks.current.swipe?.onSwipeBackCancel?.();
    }
  }, []);

  const phase = swipeState?.phase;
  React.useEffect(() => {
    if (phase !== "commit" && phase !== "cancel") return;
    if (!animate) return settled();
    const timer = setTimeout(settled, TRANSITION_TIMEOUT);
    return () => clearTimeout(timer);
  }, [phase, animate, settled]);

  const items = React.Children.toArray(children);
  const underlay = swipeState ? swipePrev : undefined;
  const sign = rtl ? -1 : 1;
  const swipeX = (layer: "top" | "under") => {
    if (!swipeState) return undefined;
    const done = swipeState.phase === "commit";
    const reset = swipeState.phase === "cancel";
    if (layer === "top") return `translateX(${done ? `${100 * sign}%` : `${reset ? 0 : swipeState.dx * sign}px`})`;
    if (done) return "translateX(0)";
    const width = containerRef.current?.getBoundingClientRect().width ?? 0;
    const progress = reset || width <= 0 ? 0 : Math.min(1, swipeState.dx / width);
    return `translateX(${-PARALLAX * (1 - progress) * 100 * sign}%)`;
  };
  const underlayTop = underlay ? readScroll(scroller.current) - (scrolls.current.get(underlay) ?? 0) : 0;

  return (
    <div
      ref={setRef}
      className={cn("relative", (state.leaving || swipeState) && "overflow-x-clip", className)}
      {...rest}
    >
      {items.map((child) => {
        const id = idOf(child);
        if (id === undefined) return null;
        const isActive = id === state.active;
        const isLeaving = id === state.leaving;
        const isUnder = id === underlay;
        if (!isActive && !isLeaving && !isUnder) return null;
        const animation = state.leaving
          ? isActive
            ? state.back
              ? "animate-nav-pop-in"
              : "animate-nav-push-in"
            : state.back
              ? "animate-nav-pop-out"
              : "animate-nav-push-out"
          : undefined;
        return (
          <div
            key={id}
            ref={(el) => {
              if (el) layers.current.set(id, el);
              else layers.current.delete(id);
            }}
            data-nav-layer={isActive ? "active" : isLeaving ? "leaving" : "underlay"}
            tabIndex={isActive ? -1 : undefined}
            inert={!isActive || undefined}
            aria-hidden={!isActive || undefined}
            className={cn(
              "outline-none",
              isActive ? "relative z-1" : "pointer-events-none absolute inset-x-0 top-0",
              isLeaving && (state.back ? "z-2" : "z-0"),
              isUnder && "z-0",
              swipeState && swipeState.phase !== "drag" && "transition-transform duration-normal ease-standard",
              animation,
            )}
            style={{
              top: isLeaving ? leavingTop : isUnder ? underlayTop : undefined,
              transform: isActive ? swipeX("top") : isUnder ? swipeX("under") : undefined,
            }}
            onAnimationEnd={isActive ? (e) => e.target === e.currentTarget && finish() : undefined}
            onTransitionEnd={isActive && swipeState ? (e) => e.target === e.currentTarget && settled() : undefined}
          >
            <NavTransitionProvider
              entering={isActive && Boolean(state.leaving)}
              animating={!isActive || Boolean(state.leaving || swipeState)}
            >
              <NavTransitionDirectionProvider isBack={isActive ? (state.changed ? state.back : undefined) : true}>
                {child}
              </NavTransitionDirectionProvider>
            </NavTransitionProvider>
          </div>
        );
      })}
    </div>
  );
});
