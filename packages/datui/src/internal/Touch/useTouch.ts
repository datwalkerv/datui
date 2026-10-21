import * as React from "react";

export interface Gesture {
  startX: number;
  startY: number;
  /** Movement since start, in px. */
  shiftX: number;
  shiftY: number;
  /** Axis locked once movement passed `slideThreshold`; only one is ever true. */
  isSlideX: boolean;
  isSlideY: boolean;
  /** Milliseconds since start. */
  duration: number;
  originalEvent: TouchEvent | MouseEvent;
}

export interface UseTouchOptions {
  onStart?: (gesture: Gesture) => void;
  /** Called on every move. Call `gesture.originalEvent.preventDefault()` to stop native scrolling (touch). */
  onMove?: (gesture: Gesture) => void;
  onEnd?: (gesture: Gesture) => void;
  /** Movement in px before an axis is locked. @default 5 */
  slideThreshold?: number;
  /** Also track mouse drags. @default true */
  mouse?: boolean;
  /** Swallow the click that follows a slide. @default false */
  noSlideClick?: boolean;
}

const point = (event: TouchEvent | MouseEvent) => {
  const p = "touches" in event ? (event.touches[0] ?? event.changedTouches[0]) : event;
  return { x: p?.clientX ?? 0, y: p?.clientY ?? 0 };
};

/**
 * Tracks a single touch or mouse drag on `element` and reports shift, axis and duration.
 * Touch listeners are non-passive so `onMove` can prevent native scrolling. All listeners are removed on unmount.
 */
export function useTouch(element: HTMLElement | null, options: UseTouchOptions): void {
  const optionsRef = React.useRef(options);
  optionsRef.current = options;
  const mouse = options.mouse ?? true;

  React.useEffect(() => {
    if (!element) return;
    let gesture: Gesture | null = null;
    let startTime = 0;
    let slid = false;

    const update = (event: TouchEvent | MouseEvent): Gesture | null => {
      if (!gesture) return null;
      const { x, y } = point(event);
      const shiftX = x - gesture.startX;
      const shiftY = y - gesture.startY;
      const threshold = optionsRef.current.slideThreshold ?? 5;
      let { isSlideX, isSlideY } = gesture;
      if (!isSlideX && !isSlideY && Math.max(Math.abs(shiftX), Math.abs(shiftY)) >= threshold) {
        isSlideX = Math.abs(shiftX) > Math.abs(shiftY);
        isSlideY = !isSlideX;
      }
      gesture = {
        ...gesture,
        shiftX,
        shiftY,
        isSlideX,
        isSlideY,
        duration: Date.now() - startTime,
        originalEvent: event,
      };
      return gesture;
    };

    const start = (event: TouchEvent | MouseEvent) => {
      if ("button" in event && event.button !== 0) return;
      const { x, y } = point(event);
      startTime = Date.now();
      slid = false;
      gesture = {
        startX: x,
        startY: y,
        shiftX: 0,
        shiftY: 0,
        isSlideX: false,
        isSlideY: false,
        duration: 0,
        originalEvent: event,
      };
      optionsRef.current.onStart?.(gesture);
      if (!("touches" in event)) {
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", end);
      }
    };
    const move = (event: TouchEvent | MouseEvent) => {
      const g = update(event);
      if (g) optionsRef.current.onMove?.(g);
    };
    const end = (event: TouchEvent | MouseEvent) => {
      const g = update(event);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      gesture = null;
      if (!g) return;
      slid = g.isSlideX || g.isSlideY;
      optionsRef.current.onEnd?.(g);
    };
    const click = (event: MouseEvent) => {
      if (slid && optionsRef.current.noSlideClick) {
        event.preventDefault();
        event.stopPropagation();
      }
      slid = false;
    };

    element.addEventListener("touchstart", start, { passive: true });
    element.addEventListener("touchmove", move, { passive: false });
    element.addEventListener("touchend", end);
    element.addEventListener("touchcancel", end);
    element.addEventListener("click", click, true);
    if (mouse) element.addEventListener("mousedown", start);
    return () => {
      element.removeEventListener("touchstart", start);
      element.removeEventListener("touchmove", move);
      element.removeEventListener("touchend", end);
      element.removeEventListener("touchcancel", end);
      element.removeEventListener("click", click, true);
      element.removeEventListener("mousedown", start);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
    };
  }, [element, mouse]);
}
