import * as React from "react";
import { cn } from "../../lib/utils";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

type Align = "start" | "center" | "end";
const selfAlign: Record<Align, string> = { start: "self-start", center: "self-center", end: "self-end" };

export interface RichCellProps extends Omit<TappableProps, "feedback"> {
  /** Leading content, usually a large avatar or `RichCellIcon`. */
  before?: React.ReactNode;
  /** Trailing content, shown under `meta`/`submeta`. */
  after?: React.ReactNode;
  overTitle?: React.ReactNode;
  subtitle?: React.ReactNode;
  extraSubtitle?: React.ReactNode;
  /** Short trailing text next to the title, e.g. a time. */
  meta?: React.ReactNode;
  /** Trailing text under `meta`. */
  submeta?: React.ReactNode;
  /** Content under the text, e.g. a stack of avatars. */
  bottom?: React.ReactNode;
  /** Buttons rendered below the row, outside its tappable area, so they never nest inside it. */
  actions?: React.ReactNode;
  /** @default "start" */
  beforeAlign?: Align;
  /** @default "start" */
  contentAlign?: Align;
  /** @default "start" */
  afterAlign?: Align;
  /** Wrap long text instead of truncating it. @default false */
  multiline?: boolean;
}

/** Fixed-size wrapper for an icon in RichCell's `before`/`after`. */
export function RichCellIcon({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden
      className={cn("flex size-icon-xl shrink-0 items-center justify-center text-icon-secondary", className)}
      {...rest}
    />
  );
}

const RichCellBase = React.forwardRef<HTMLDivElement, RichCellProps>(function RichCell(
  {
    before,
    after,
    overTitle,
    subtitle,
    extraSubtitle,
    meta,
    submeta,
    bottom,
    actions,
    beforeAlign = "start",
    contentAlign = "start",
    afterAlign = "start",
    multiline = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const text = multiline ? "break-words" : "truncate";
  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      <Tappable
        className="flex w-full items-stretch gap-3 border-0 bg-transparent px-4 py-3 text-start text-foreground no-underline"
        {...rest}
      >
        {before && <span className={cn("flex shrink-0", selfAlign[beforeAlign])}>{before}</span>}
        <span className={cn("flex min-w-0 flex-1 flex-col items-start gap-0.5", selfAlign[contentAlign])}>
          {overTitle && (
            <span className={cn("max-w-full text-footnote text-subtle-foreground", text)}>{overTitle}</span>
          )}
          {overTitle && " "}
          <span className="flex w-full items-baseline gap-2">
            <span className={cn("min-w-0 flex-1 text-headline-1 font-medium", text)}>{children}</span>
            {meta && " "}
            {meta && <span className="shrink-0 text-footnote text-subtle-foreground">{meta}</span>}
          </span>
          {(subtitle || submeta) && " "}
          {(subtitle || submeta) && (
            <span className="flex w-full items-baseline gap-2 text-subhead text-subtle-foreground">
              <span className={cn("min-w-0 flex-1", text)}>{subtitle}</span>
              {submeta && " "}
              {submeta && <span className="shrink-0 text-footnote">{submeta}</span>}
            </span>
          )}
          {extraSubtitle && " "}
          {extraSubtitle && (
            <span className={cn("max-w-full text-subhead text-subtle-foreground", text)}>{extraSubtitle}</span>
          )}
          {bottom && <span className="mt-1.5 flex max-w-full">{bottom}</span>}
        </span>
        {after && <span className={cn("flex shrink-0", selfAlign[afterAlign])}>{after}</span>}
      </Tappable>
      {actions && <div className="flex flex-wrap gap-2 px-4 pb-3">{actions}</div>}
    </div>
  );
});

/**
 * Taller row for rich content: large media, title with meta, subtitles, a bottom slot and actions.
 * `ref` and `className` go to the outer element; other props to the tappable row.
 */
export const RichCell = Object.assign(RichCellBase, { Icon: RichCellIcon });
