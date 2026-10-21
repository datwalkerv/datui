import * as React from "react";
import { gapValue, type SpacingSize } from "../../lib/spacing";
import { cn } from "../../lib/utils";
import { type BoxLayoutProps, extractLayoutStyle } from "../Box/Box";

export interface SimpleGridProps extends BoxLayoutProps, React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** Fixed column count. @default 1 */
  columns?: number;
  /** When set, columns auto-fill with at least this width (px) and `columns` is ignored. */
  minColWidth?: number;
  gap?: SpacingSize | number | [SpacingSize | number, SpacingSize | number];
  align?: "start" | "end" | "center" | "stretch" | "baseline";
  display?: "grid" | "inline-grid" | "none";
}

const aligns = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;
const displays = { grid: "grid", "inline-grid": "inline-grid", none: "hidden" } as const;

/** CSS grid with equal columns. */
export const SimpleGrid = React.forwardRef<HTMLElement, SimpleGridProps>(function SimpleGrid(props, ref) {
  const [
    layout,
    {
      as: Component = "div",
      columns = 1,
      minColWidth,
      gap,
      align = "stretch",
      display = "grid",
      className,
      style,
      ...rest
    },
  ] = extractLayoutStyle(props);
  const gridTemplateColumns = minColWidth
    ? `repeat(auto-fill, minmax(min(${minColWidth}px, 100%), 1fr))`
    : `repeat(${columns}, minmax(0, 1fr))`;
  return (
    <Component
      ref={ref}
      className={cn(displays[display], aligns[align], className)}
      style={{ gridTemplateColumns, gap: gapValue(gap), ...layout, ...style }}
      {...rest}
    />
  );
});
