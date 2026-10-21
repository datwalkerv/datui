import * as React from "react";
import { cn } from "../../lib/utils";

export type TypographyWeight = "regular" | "medium" | "semibold" | "bold";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render. */
  as?: React.ElementType;
  weight?: TypographyWeight;
  /** Remove default margins so the text sits flush in layouts. @default true */
  normalize?: boolean;
  /** Render as `inline` instead of block. */
  inline?: boolean;
  /** Uppercase with letter spacing. */
  caps?: boolean;
}

const weights: Record<TypographyWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

/** Base text primitive. Prefer the semantic presets (`Title`, `Text`, `Caption`, ...). */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(function Typography(
  { as: Component = "span", weight, normalize = true, inline, caps, className, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        normalize && "m-0",
        inline ? "inline" : Component === "span" ? undefined : "block",
        weight && weights[weight],
        caps && "uppercase tracking-wide",
        className,
      )}
      {...rest}
    />
  );
});

type PresetProps<L extends number> = TypographyProps & { level?: L };

function preset<L extends number>(
  displayName: string,
  defaults: { as: (level: L) => React.ElementType; size: Record<L, string>; weight: TypographyWeight; level: L },
) {
  const Preset = React.forwardRef<HTMLElement, PresetProps<L>>(function Preset(
    { level = defaults.level, as, weight = defaults.weight, className, ...rest },
    ref,
  ) {
    return (
      <Typography
        ref={ref}
        as={as ?? defaults.as(level)}
        weight={weight}
        className={cn(defaults.size[level], className)}
        {...rest}
      />
    );
  });
  Preset.displayName = displayName;
  return Preset;
}

export type DisplayTitleProps = PresetProps<1 | 2 | 3 | 4>;
/** Hero-sized headings. Renders `h1`–`h4` by level. */
export const DisplayTitle = preset<1 | 2 | 3 | 4>("DisplayTitle", {
  level: 1,
  weight: "bold",
  as: (l) => `h${l}` as const,
  size: { 1: "text-display-1", 2: "text-display-2", 3: "text-display-3", 4: "text-display-4" },
});

export type TitleProps = PresetProps<1 | 2 | 3>;
/** Section and page headings. Renders `h1`–`h3` by level. */
export const Title = preset<1 | 2 | 3>("Title", {
  level: 1,
  weight: "semibold",
  as: (l) => `h${l}` as const,
  size: { 1: "text-title-1", 2: "text-title-2", 3: "text-title-3" },
});

export type HeadlineProps = PresetProps<1 | 2>;
/** Emphasized short text such as card titles. */
export const Headline = preset<1 | 2>("Headline", {
  level: 1,
  weight: "medium",
  as: () => "h4",
  size: { 1: "text-headline-1", 2: "text-headline-2" },
});

export type TextProps = TypographyProps;
/** Default body text. */
export const Text = preset<1>("Text", { level: 1, weight: "regular", as: () => "span", size: { 1: "text-body" } });

export type ParagraphProps = TypographyProps;
/** Multi-line body copy. */
export const Paragraph = preset<1>("Paragraph", {
  level: 1,
  weight: "regular",
  as: () => "p",
  size: { 1: "text-paragraph" },
});

export type SubheadProps = TypographyProps;
/** Secondary text under titles. Renders a `span`; pass `as` for a heading. */
export const Subhead = preset<1>("Subhead", {
  level: 1,
  weight: "regular",
  as: () => "span",
  size: { 1: "text-subhead" },
});

export type FootnoteProps = TypographyProps;
/** Small supporting text. */
export const Footnote = preset<1>("Footnote", {
  level: 1,
  weight: "regular",
  as: () => "span",
  size: { 1: "text-footnote" },
});

export type CaptionProps = PresetProps<1 | 2 | 3>;
/** Labels, metadata and fine print. */
export const Caption = preset<1 | 2 | 3>("Caption", {
  level: 1,
  weight: "regular",
  as: () => "span",
  size: { 1: "text-caption-1", 2: "text-caption-2", 3: "text-caption-3" },
});

export interface EllipsisTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Clamp to this many lines. @default 1 */
  maxLines?: number;
  /** Max width of the text box (CSS length or px number). */
  maxWidth?: number | string;
}

/** Truncates text with an ellipsis after `maxLines` lines and exposes the full text as a tooltip. */
export const EllipsisText = React.forwardRef<HTMLSpanElement, EllipsisTextProps>(function EllipsisText(
  { maxLines = 1, maxWidth, className, style, children, title, ...rest },
  ref,
) {
  const clamp: React.CSSProperties =
    maxLines > 1 ? { display: "-webkit-box", WebkitLineClamp: maxLines, WebkitBoxOrient: "vertical" } : {};
  return (
    <span
      ref={ref}
      title={title ?? (typeof children === "string" ? children : undefined)}
      className={cn("block min-w-0 overflow-hidden", maxLines === 1 && "truncate", className)}
      style={{ maxWidth, ...clamp, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
});
