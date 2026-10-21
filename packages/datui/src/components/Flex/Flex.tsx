import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { gapValue, type SpacingSize } from "../../lib/spacing";
import { cn } from "../../lib/utils";
import { type BoxLayoutProps, extractLayoutStyle } from "../Box/Box";

type Gap = SpacingSize | number | [SpacingSize | number, SpacingSize | number];

export const flexVariants = cva("", {
  variants: {
    display: { flex: "flex", "inline-flex": "inline-flex", none: "hidden" },
    direction: { row: "flex-row", column: "flex-col" },
    reverse: { true: "", false: "" },
    noWrap: { true: "flex-nowrap", false: "flex-wrap" },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      "space-around": "justify-around",
      "space-between": "justify-between",
      "space-evenly": "justify-evenly",
    },
  },
  compoundVariants: [
    { direction: "row", reverse: true, class: "flex-row-reverse" },
    { direction: "column", reverse: true, class: "flex-col-reverse" },
  ],
  defaultVariants: { display: "flex", direction: "row", reverse: false, noWrap: false },
});

export interface FlexProps
  extends BoxLayoutProps,
    VariantProps<typeof flexVariants>,
    Omit<React.HTMLAttributes<HTMLElement>, "dir"> {
  as?: React.ElementType;
  /** Token, px number or `[row, column]` tuple. */
  gap?: Gap;
}

/** Flexbox container on datui's spacing scale. */
export const Flex = React.forwardRef<HTMLElement, FlexProps>(function Flex(props, ref) {
  const [
    layout,
    { as: Component = "div", display, direction, reverse, noWrap, align, justify, gap, className, style, ...rest },
  ] = extractLayoutStyle(props);
  return (
    <Component
      ref={ref}
      className={cn(flexVariants({ display, direction, reverse, noWrap, align, justify }), className)}
      style={{ gap: gapValue(gap), ...layout, ...style }}
      {...rest}
    />
  );
});

export interface FlexItemProps extends BoxLayoutProps, React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** Shorthand: `grow` fills free space, `shrink` gives way, `content` sizes to content. */
  flex?: "grow" | "shrink" | "content";
}

const flexItem = { grow: "flex-1 min-w-0", shrink: "shrink min-w-0", content: "flex-none" } as const;

/** Child of `Flex` with sizing helpers. */
export const FlexItem = React.forwardRef<HTMLElement, FlexItemProps>(function FlexItem(props, ref) {
  const [layout, { as: Component = "div", flex, className, style, ...rest }] = extractLayoutStyle(props);
  return (
    <Component ref={ref} className={cn(flex && flexItem[flex], className)} style={{ ...layout, ...style }} {...rest} />
  );
});
