import * as React from "react";
import { NavViewIdContext } from "../../internal/NavContext/NavContext";
import { NavStack, type NavTransitionEvent } from "../../internal/NavStack/NavStack";
import { useTransitionMotion } from "../ConfigProvider/ConfigProvider";
import { useSplitCol } from "../SplitCol/SplitCol";

export {
  type NavDirection,
  type NavTransitionState,
  useNavDirection,
  useNavId,
  useNavTransition,
} from "../../internal/NavContext/NavContext";
export type { NavTransitionEvent } from "../../internal/NavStack/NavStack";

export interface ViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Id used by `Root`/`Epic` to pick this view. */
  id?: string;
  /** Id of the `Panel` to show. */
  activePanel: string;
  /**
   * Stack of visited panel ids, ending with `activePanel`. Shrinking it means "back"; with two or more
   * entries, touch users can swipe from the start edge to go back to `history.at(-2)`.
   */
  history?: string[];
  /** Override back detection, e.g. for histories where the same id repeats. */
  isBackCheck?: (p: { from: string; to: string }) => boolean;
  /** Fires once each transition (animated or not) has finished. */
  onTransition?: (event: NavTransitionEvent) => void;
  /** Swipe-back committed: pop your history here. Without it swipe-back is off. */
  onSwipeBack?: () => void;
  /** Swipe-back gesture recognized; return `"prevent"` to cancel it. */
  onSwipeBackStart?: (activePanel: string | null) => undefined | "prevent";
  /** Swipe released below the threshold; the panel springs back. */
  onSwipeBackCancel?: () => void;
  /** `Panel`s with unique `id`s. */
  children?: React.ReactNode;
}

function panelIds(children: React.ReactNode): string[] {
  return React.Children.toArray(children).flatMap((c) =>
    React.isValidElement<{ id?: unknown }>(c) && typeof c.props.id === "string" ? [c.props.id] : [],
  );
}

/**
 * Stack of `Panel`s showing `activePanel`. Switching panels slides forward or back, restores the scroll position
 * when going back and moves focus to the new panel's title. Touch users can swipe back from the start edge.
 */
export const View = React.forwardRef<HTMLDivElement, ViewProps>(function View(
  {
    id,
    activePanel,
    history,
    isBackCheck,
    onTransition,
    onSwipeBack,
    onSwipeBackStart,
    onSwipeBackCancel,
    children,
    ...rest
  },
  ref,
) {
  const motion = useTransitionMotion();
  const col = useSplitCol();
  const prevHistory = React.useRef(history);
  React.useEffect(() => {
    prevHistory.current = history;
  });
  const isBack = (from: string, to: string) => {
    if (isBackCheck) return isBackCheck({ from, to });
    const before = prevHistory.current;
    if (history && before) return history.length < before.length;
    const ids = panelIds(children);
    return ids.indexOf(to) < ids.indexOf(from);
  };
  const prev = history && history.length > 1 && onSwipeBack ? history[history.length - 2] : undefined;
  return (
    <NavViewIdContext.Provider value={id}>
      <NavStack
        ref={ref}
        data-view={id}
        active={activePanel}
        isBack={isBack}
        animate={motion && (col?.animate ?? true)}
        restoreScroll="back"
        onTransition={onTransition}
        swipe={{ prev, onSwipeBack, onSwipeBackStart, onSwipeBackCancel }}
        {...rest}
      >
        {children}
      </NavStack>
    </NavViewIdContext.Provider>
  );
});
