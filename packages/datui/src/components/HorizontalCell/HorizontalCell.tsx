import { ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export interface HorizontalCellProps extends Omit<TappableProps, "feedback" | "title"> {
  /** Text under the media. */
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extraSubtitle?: React.ReactNode;
  /** Tile width: a token size, `auto` (fits content) or a number of px. @default "s" */
  size?: "s" | "m" | "l" | "xl" | "auto" | number;
  /** Text alignment. Defaults to `center` for size `s`, otherwise `start`. */
  textAlign?: "start" | "center" | "end";
  /** Remove the inner padding. @default false */
  noPadding?: boolean;
  /** Element for the title. @default "span" */
  titleAs?: React.ElementType;
}

const widths = { s: "w-hcell-s", m: "w-hcell-m", l: "w-hcell-l", xl: "w-hcell-xl", auto: "w-auto" } as const;
const aligns = { start: "items-start text-start", center: "items-center text-center", end: "items-end text-end" };

/** Vertical tile (media on top, text below) for horizontally scrolling lists. */
export const HorizontalCell = React.forwardRef<HTMLElement, HorizontalCellProps>(function HorizontalCell(
  {
    title,
    subtitle,
    extraSubtitle,
    size = "s",
    textAlign = size === "s" ? "center" : "start",
    noPadding = false,
    titleAs: TitleTag = "span",
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const numeric = typeof size === "number";
  return (
    <Tappable
      ref={ref}
      className={cn(
        "flex shrink-0 flex-col gap-1 rounded-lg border-0 bg-transparent text-foreground no-underline",
        !numeric && widths[size],
        aligns[textAlign],
        !noPadding && "p-1.5",
        className,
      )}
      style={numeric ? { width: size, ...style } : style}
      {...rest}
    >
      {children && <span className="flex max-w-full self-stretch justify-center">{children}</span>}
      {title && <TitleTag className="max-w-full truncate text-subhead font-medium">{title}</TitleTag>}
      {subtitle && " "}
      {subtitle && <span className="max-w-full truncate text-footnote text-subtle-foreground">{subtitle}</span>}
      {extraSubtitle && " "}
      {extraSubtitle && (
        <span className="max-w-full truncate text-footnote text-subtle-foreground">{extraSubtitle}</span>
      )}
    </Tappable>
  );
});

export interface HorizontalCellShowMoreProps extends Omit<TappableProps, "feedback"> {
  /** Match the neighbouring `HorizontalCell` width. @default "s" */
  size?: "s" | "m";
  /** Height of the icon area in px, usually the neighbouring media height. @default 64 */
  height?: number;
  /** Center the tile vertically in the row. @default false */
  centered?: boolean;
}

/** "Show all" tile placed after the last `HorizontalCell` of a scrolling list. */
export const HorizontalCellShowMore = React.forwardRef<HTMLElement, HorizontalCellShowMoreProps>(
  function HorizontalCellShowMore(
    { size = "s", height = 64, centered = false, className, children = "Show all", ...rest },
    ref,
  ) {
    return (
      <Tappable
        ref={ref}
        className={cn(
          "flex shrink-0 flex-col items-center gap-1 rounded-lg border-0 bg-transparent p-1.5 text-center text-primary no-underline",
          widths[size],
          centered && "self-center",
          className,
        )}
        {...rest}
      >
        <span className="flex w-full items-center justify-center" style={{ height }}>
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary">
            <ChevronRight className="dt-icon-nudge size-icon-lg rtl:-scale-x-100" aria-hidden />
          </span>
        </span>
        <span className="max-w-full truncate text-subhead font-medium">{children}</span>
      </Tappable>
    );
  },
);
