import * as React from "react";
import { cn } from "../../lib/utils";

export interface SplitColContextValue {
  /** Whether panel transitions inside this column animate. */
  animate: boolean;
  colRef: React.RefObject<HTMLElement | null>;
}

export const SplitColContext = React.createContext<SplitColContextValue | null>(null);

/** The surrounding `SplitCol`, if any. */
export function useSplitCol(): SplitColContextValue | null {
  return React.useContext(SplitColContext);
}

export interface SplitColProps extends React.HTMLAttributes<HTMLElement> {
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  /** Keep the column's content pinned to the viewport (sticky, scrolls on its own). */
  fixed?: boolean;
  /** Add side gutters from tablet width up. */
  autoSpaced?: boolean;
  /** Take the full width below tablet width, ignoring `width` bounds. */
  stretchedOnMobile?: boolean;
  /** Animate `View`/`Root` transitions inside this column. @default true */
  animate?: boolean;
  /** Element to render, e.g. `nav`, `aside` or `main`. @default "div" */
  as?: React.ElementType;
}

const size = (v: number | string | undefined) => (typeof v === "number" ? `${v}px` : v);

/** A column of `SplitLayout` with width bounds and an optional sticky (fixed) mode. */
export const SplitCol = React.forwardRef<HTMLElement, SplitColProps>(function SplitCol(
  {
    width,
    minWidth,
    maxWidth,
    fixed = false,
    autoSpaced = false,
    stretchedOnMobile = false,
    animate = true,
    as: Component = "div",
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const colRef = React.useRef<HTMLElement | null>(null);
  const setRef = (el: HTMLElement | null) => {
    colRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };
  const value = React.useMemo(() => ({ animate, colRef }), [animate]);
  const vars = {
    "--dt-split-w": size(width),
    "--dt-split-min": size(minWidth),
    "--dt-split-max": size(maxWidth),
  } as React.CSSProperties;
  return (
    <SplitColContext.Provider value={value}>
      <Component
        ref={setRef}
        className={cn(
          "relative min-w-0",
          width === undefined ? "flex-1" : "w-(--dt-split-w) shrink-0",
          minWidth !== undefined && "min-w-(--dt-split-min)",
          maxWidth !== undefined && "max-w-(--dt-split-max)",
          autoSpaced && "tablet:px-4",
          stretchedOnMobile && "max-tablet:w-full max-tablet:min-w-0 max-tablet:max-w-none max-tablet:flex-1",
          className,
        )}
        style={{ ...vars, ...style }}
        {...rest}
      >
        {fixed ? (
          <div data-split-fixed="" className="sticky top-0 max-h-dvh overflow-y-auto">
            {children}
          </div>
        ) : (
          children
        )}
      </Component>
    </SplitColContext.Provider>
  );
});
