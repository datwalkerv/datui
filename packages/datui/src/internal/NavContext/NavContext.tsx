import * as React from "react";

export const NavViewIdContext = React.createContext<string | undefined>(undefined);
export const NavPanelIdContext = React.createContext<string | undefined>(undefined);

/** Ids of the nearest `View` and `Panel` the caller is rendered in. */
export function useNavId(): { view?: string; panel?: string } {
  return { view: React.useContext(NavViewIdContext), panel: React.useContext(NavPanelIdContext) };
}

export interface NavTransitionState {
  /** The surrounding panel/view is the incoming one of a running transition. */
  entering: boolean;
  /** A transition is running around the caller. */
  animating: boolean;
}

const NavTransitionContext = React.createContext<NavTransitionState>({ entering: false, animating: false });

/** Provides transition state; nested providers OR-merge with their parent. */
export function NavTransitionProvider({
  entering,
  animating,
  children,
}: NavTransitionState & { children?: React.ReactNode }) {
  const parent = React.useContext(NavTransitionContext);
  const e = parent.entering || entering;
  const a = parent.animating || animating;
  const value = React.useMemo(() => ({ entering: e, animating: a }), [e, a]);
  return <NavTransitionContext.Provider value={value}>{children}</NavTransitionContext.Provider>;
}

/** Whether the surrounding panel/view is mid-transition. Defer autofocus or heavy work until `animating` is false. */
export function useNavTransition(): NavTransitionState {
  return React.useContext(NavTransitionContext);
}

export type NavDirection = "forwards" | "backwards" | undefined;

const NavDirectionContext = React.createContext<NavDirection>(undefined);

/** Tells descendants whether they mounted through forward or back navigation. The value is frozen on mount. */
export function NavTransitionDirectionProvider({ isBack, children }: { isBack?: boolean; children?: React.ReactNode }) {
  const parent = React.useContext(NavDirectionContext);
  const [mounted] = React.useState<NavDirection>(isBack === undefined ? undefined : isBack ? "backwards" : "forwards");
  return <NavDirectionContext.Provider value={mounted ?? parent}>{children}</NavDirectionContext.Provider>;
}

/** `"forwards"` or `"backwards"` depending on how the surrounding panel/view was reached; `undefined` on first render. */
export function useNavDirection(): NavDirection {
  return React.useContext(NavDirectionContext);
}
