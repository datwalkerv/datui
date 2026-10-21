import * as React from "react";
import { NavStack, type NavTransitionEvent } from "../../internal/NavStack/NavStack";
import { useTransitionMotion } from "../ConfigProvider/ConfigProvider";
import { useSplitCol } from "../SplitCol/SplitCol";

export interface RootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Id of the `View` to show. */
  activeView: string;
  /** Fires once each transition has finished. Going to an earlier child counts as back. */
  onTransition?: (event: NavTransitionEvent) => void;
  /** `View`s with unique `id`s. */
  children?: React.ReactNode;
}

function ids(children: React.ReactNode): string[] {
  return React.Children.toArray(children).flatMap((c) =>
    React.isValidElement<{ id?: unknown }>(c) && typeof c.props.id === "string" ? [c.props.id] : [],
  );
}

/**
 * Top-level stack of `View`s. Shows only `activeView`; switching slides forward (later child) or back (earlier
 * child), restores scroll on back and focuses the incoming view's panel title.
 */
export const Root = React.forwardRef<HTMLDivElement, RootProps>(function Root(
  { activeView, onTransition, children, ...rest },
  ref,
) {
  const motion = useTransitionMotion();
  const col = useSplitCol();
  const isBack = (from: string, to: string) => {
    const order = ids(children);
    return order.indexOf(to) < order.indexOf(from);
  };
  return (
    <NavStack
      ref={ref}
      active={activeView}
      isBack={isBack}
      animate={motion && (col?.animate ?? true)}
      restoreScroll="back"
      onTransition={onTransition}
      {...rest}
    >
      {children}
    </NavStack>
  );
});
