import * as React from "react";
import { Chevron } from "../../internal/Chevron";
import { cn } from "../../lib/utils";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export interface MiniInfoCellProps extends Omit<TappableProps, "feedback"> {
  /** Small leading icon. */
  before?: React.ReactNode;
  after?: React.ReactNode;
  /** `base` plain info, `accent` link-colored, `add` call to add info, `more` "show more" row. @default "base" */
  mode?: "base" | "accent" | "add" | "more";
  /** `nowrap` truncates to one line, `short` clamps to 3 lines, `full` wraps freely. @default "nowrap" */
  textWrap?: "nowrap" | "short" | "full";
  /** @default false */
  chevron?: boolean;
}

const modes = {
  base: "text-foreground [&_[data-before]]:text-icon-secondary",
  accent: "text-link [&_[data-before]]:text-icon-secondary",
  add: "text-link [&_[data-before]]:text-link",
  more: "font-medium text-foreground [&_[data-before]]:text-icon-secondary",
} as const;
const wraps = { nowrap: "truncate", short: "line-clamp-3 break-words", full: "break-words" } as const;

/** Compact info line with a small icon, e.g. profile details. Renders a button with `onClick`. */
export const MiniInfoCell = React.forwardRef<HTMLElement, MiniInfoCellProps>(function MiniInfoCell(
  { before, after, mode = "base", textWrap = "nowrap", chevron = false, className, children, ...rest },
  ref,
) {
  return (
    <Tappable
      ref={ref}
      className={cn(
        "flex w-full items-start gap-3 border-0 bg-transparent px-4 py-1.5 text-start text-subhead no-underline",
        modes[mode],
        className,
      )}
      {...rest}
    >
      {before && (
        <span data-before="" className="flex size-icon-md shrink-0 items-center justify-center">
          {before}
        </span>
      )}
      <span className={cn("min-w-0 flex-1 self-center", wraps[textWrap])}>{children}</span>
      {after && <span className="flex shrink-0 items-center self-center">{after}</span>}
      {chevron && <Chevron size="s" className="self-center" />}
    </Tappable>
  );
});
