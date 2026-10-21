import * as React from "react";

/** Attach an event listener that always calls the latest handler and is removed on unmount. */
export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | Document | HTMLElement | null | undefined,
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
): void {
  const handlerRef = React.useRef(handler);
  handlerRef.current = handler;
  const capture = options?.capture;
  const passive = options?.passive;
  React.useEffect(() => {
    if (!target) return;
    const listener = (event: Event) => handlerRef.current(event as WindowEventMap[K]);
    target.addEventListener(type, listener, { capture, passive });
    return () => target.removeEventListener(type, listener, { capture });
  }, [target, type, capture, passive]);
}
