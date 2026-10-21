import * as React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export type ViewWidth = "smallMobile" | "mobile" | "smallTablet" | "tablet" | "desktop";
export type SizeType = "compact" | "regular";

export interface Adaptivity {
  viewWidth: ViewWidth;
  /** Horizontal size: `compact` below the tablet breakpoint. Drives structural changes (sheet vs dialog). */
  sizeX: SizeType;
  /** Vertical density: `compact` for wide layouts operated by a fine pointer. */
  sizeY: SizeType;
  hasPointer: boolean;
  hasHover: boolean;
  isDesktop: boolean;
}

export type AdaptivityProviderProps = Partial<Omit<Adaptivity, "isDesktop">> & { children?: React.ReactNode };

const AdaptivityContext = React.createContext<Partial<Adaptivity> | null>(null);

/** Breakpoints in px; mirror the `mobile`/`tablet`/`desktop`/`wide` Tailwind breakpoints. */
export const BREAKPOINTS = { mobile: 375, tablet: 768, desktop: 1024, wide: 1280 } as const;

function useDetectedAdaptivity(): Adaptivity {
  // Server render assumes a regular, pointer-driven desktop layout.
  const mobile = useMediaQuery(`(min-width: ${BREAKPOINTS.mobile}px)`, true);
  const tablet = useMediaQuery(`(min-width: ${BREAKPOINTS.tablet}px)`, true);
  const desktop = useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`, true);
  const wide = useMediaQuery(`(min-width: ${BREAKPOINTS.wide}px)`, true);
  const hasPointer = useMediaQuery("(pointer: fine)", true);
  const hasHover = useMediaQuery("(hover: hover)", true);
  const viewWidth: ViewWidth = wide
    ? "desktop"
    : desktop
      ? "tablet"
      : tablet
        ? "smallTablet"
        : mobile
          ? "mobile"
          : "smallMobile";
  const sizeX: SizeType = tablet ? "regular" : "compact";
  const sizeY: SizeType = hasPointer && tablet ? "compact" : "regular";
  return { viewWidth, sizeX, sizeY, hasPointer, hasHover, isDesktop: sizeX === "regular" && hasPointer };
}

/** Overrides detected adaptivity values for a subtree. Unset values keep being detected from media queries. */
export function AdaptivityProvider({ children, ...overrides }: AdaptivityProviderProps) {
  const parent = React.useContext(AdaptivityContext);
  const { viewWidth, sizeX, sizeY, hasPointer, hasHover } = overrides;
  const value = React.useMemo(() => {
    const merged: Partial<Adaptivity> = { ...parent };
    if (viewWidth !== undefined) merged.viewWidth = viewWidth;
    if (sizeX !== undefined) merged.sizeX = sizeX;
    if (sizeY !== undefined) merged.sizeY = sizeY;
    if (hasPointer !== undefined) merged.hasPointer = hasPointer;
    if (hasHover !== undefined) merged.hasHover = hasHover;
    return merged;
  }, [parent, viewWidth, sizeX, sizeY, hasPointer, hasHover]);
  return <AdaptivityContext.Provider value={value}>{children}</AdaptivityContext.Provider>;
}

export function useAdaptivity(): Adaptivity {
  const detected = useDetectedAdaptivity();
  const overrides = React.useContext(AdaptivityContext);
  if (!overrides) return detected;
  const merged = { ...detected, ...overrides };
  merged.isDesktop = merged.sizeX === "regular" && merged.hasPointer;
  return merged;
}
