import { autoUpdate, flip, offset, size, useFloating } from "@floating-ui/react";
import * as React from "react";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsomorphicLayoutEffect";
import { setRefs } from "../../internal/formUtils/formUtils";
import { Portal } from "../../lib/portal";
import { cn } from "../../lib/utils";
import { Spinner } from "../Spinner/Spinner";

/** Dropdown side and alignment. Declared here so the public types don't depend on the positioning engine. */
export type CustomSelectDropdownPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";
type Placement = CustomSelectDropdownPlacement;

export interface CustomSelectDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Element the dropdown is attached to (usually the FormField shell). */
  targetRef: React.RefObject<HTMLElement | null>;
  /** Preferred side; flips when there is no room. @default "bottom-start" */
  placement?: Placement;
  /** Gap between target and dropdown in px. @default 4 */
  offsetDistance?: number;
  /** Size to content instead of matching the target width (never narrower than the target). @default false */
  autoWidth?: boolean;
  /** Render into the AppRoot portal layer. `false` renders in place. @default true */
  forcePortal?: boolean;
  /** Shows a spinner instead of the content. */
  fetching?: boolean;
  /** Accessible label of the spinner. @default "Loading…" */
  fetchingLabel?: string;
  /** Let the list grow to fit the viewport instead of capping it. @default false */
  noMaxHeight?: boolean;
  /** Called with the final placement after flipping. */
  onPlacementChange?: (placement: Placement) => void;
  /** Ref to the scrolling box, e.g. to keep the highlighted option in view. */
  scrollBoxRef?: React.Ref<HTMLDivElement>;
}

/**
 * Positioned, scrollable popup panel used by CustomSelect and ChipsSelect. It has no keyboard handling of its own:
 * put a `role="listbox"` inside and let the owning combobox drive it.
 */
export const CustomSelectDropdown = React.forwardRef<HTMLDivElement, CustomSelectDropdownProps>(
  function CustomSelectDropdown(
    {
      targetRef,
      placement = "bottom-start",
      offsetDistance = 4,
      autoWidth = false,
      forcePortal = true,
      fetching = false,
      fetchingLabel,
      noMaxHeight = false,
      onPlacementChange,
      scrollBoxRef,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const {
      refs,
      floatingStyles,
      placement: finalPlacement,
    } = useFloating({
      placement,
      strategy: "fixed",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(offsetDistance),
        flip({ padding: 8 }),
        size({
          padding: 8,
          apply({ rects, availableHeight, elements }) {
            const s = elements.floating.style;
            if (autoWidth) s.minWidth = `${rects.reference.width}px`;
            else s.width = `${rects.reference.width}px`;
            s.maxHeight = noMaxHeight
              ? `${availableHeight}px`
              : `min(${availableHeight}px, var(--dt-select-dropdown-max-height))`;
          },
        }),
      ],
    });

    useIsomorphicLayoutEffect(() => refs.setReference(targetRef.current), [refs, targetRef]);

    const placementRef = React.useRef(onPlacementChange);
    placementRef.current = onPlacementChange;
    React.useEffect(() => placementRef.current?.(finalPlacement), [finalPlacement]);

    return (
      <Portal disabled={!forcePortal}>
        <div
          ref={(node) => setRefs(node, refs.setFloating, ref)}
          data-placement={finalPlacement}
          className={cn(
            "z-popover flex flex-col overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
            className,
          )}
          style={{ ...floatingStyles, ...style }}
          {...rest}
        >
          <div ref={scrollBoxRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1">
            {fetching ? (
              <div className="flex justify-center py-3 text-muted-foreground">
                <Spinner size="m" label={fetchingLabel} />
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </Portal>
    );
  },
);
