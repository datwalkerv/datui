import * as React from "react";
import { type SpacingSize, spacingValue } from "../../lib/spacing";
import { cn } from "../../lib/utils";

type Space = SpacingSize | number | string;
type Length = number | string;

export interface BoxLayoutProps {
  padding?: Space;
  paddingInline?: Space;
  paddingBlock?: Space;
  margin?: Space;
  marginInline?: Space;
  marginBlock?: Space;
  width?: Length;
  height?: Length;
  minWidth?: Length;
  maxWidth?: Length;
  minHeight?: Length;
  maxHeight?: Length;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: Length;
  alignSelf?: React.CSSProperties["alignSelf"];
  position?: React.CSSProperties["position"];
}

export interface BoxProps extends BoxLayoutProps, React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  display?: "none" | "inline" | "inline-block" | "block" | "contents" | "flex" | "inline-flex" | "grid";
}

const px = (v: Length | undefined) => (typeof v === "number" ? `${v}px` : v);

/** Pull layout props out of a props object and turn them into inline styles. */
export function extractLayoutStyle<P extends BoxLayoutProps>(
  props: P,
): [React.CSSProperties, Omit<P, keyof BoxLayoutProps>] {
  const {
    padding,
    paddingInline,
    paddingBlock,
    margin,
    marginInline,
    marginBlock,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    flexGrow,
    flexShrink,
    flexBasis,
    alignSelf,
    position,
    ...rest
  } = props;
  const style: React.CSSProperties = {
    padding: spacingValue(padding),
    paddingInline: spacingValue(paddingInline),
    paddingBlock: spacingValue(paddingBlock),
    margin: spacingValue(margin),
    marginInline: spacingValue(marginInline),
    marginBlock: spacingValue(marginBlock),
    width: px(width),
    height: px(height),
    minWidth: px(minWidth),
    maxWidth: px(maxWidth),
    minHeight: px(minHeight),
    maxHeight: px(maxHeight),
    flexGrow,
    flexShrink,
    flexBasis: px(flexBasis),
    alignSelf,
    position,
  };
  for (const key of Object.keys(style) as (keyof React.CSSProperties)[]) {
    if (style[key] === undefined) delete style[key];
  }
  return [style, rest];
}

const displays = {
  none: "hidden",
  inline: "inline",
  "inline-block": "inline-block",
  block: "block",
  contents: "contents",
  flex: "flex",
  "inline-flex": "inline-flex",
  grid: "grid",
} as const;

/** Generic layout element with spacing and sizing props on datui's spacing scale. */
export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(props, ref) {
  const [layout, { as: Component = "div", display, className, style, ...rest }] = extractLayoutStyle(props);
  return (
    <Component
      ref={ref}
      className={cn(display && displays[display], className)}
      style={{ ...layout, ...style }}
      {...rest}
    />
  );
});
