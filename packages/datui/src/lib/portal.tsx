import * as React from "react";
import { createPortal } from "react-dom";

const PortalContainerContext = React.createContext<HTMLElement | null>(null);

export const PortalContainerProvider = PortalContainerContext.Provider;

const noopSubscribe = () => () => {};

/**
 * Where overlays should portal to: the nearest `AppRoot` portal layer (so they inherit theme/density), else
 * `document.body`. Returns `null` on the server and during hydration so open overlays hydrate without a mismatch.
 */
export function usePortalContainer(): HTMLElement | null {
  const container = React.useContext(PortalContainerContext);
  const hydrated = React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  if (container) return container;
  return hydrated ? document.body : null;
}

export interface PortalProps {
  children?: React.ReactNode;
  /** Render in place instead of portalling. */
  disabled?: boolean;
  container?: HTMLElement | null;
}

export function Portal({ children, disabled, container }: PortalProps) {
  const fallback = usePortalContainer();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (disabled) return <>{children}</>;
  const target = container ?? fallback;
  if (!mounted || !target) return null;
  return createPortal(children, target);
}
