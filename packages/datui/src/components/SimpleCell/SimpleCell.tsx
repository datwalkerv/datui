import * as React from "react";
import { Chevron } from "../../internal/Chevron";
import { cn } from "../../lib/utils";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export interface SimpleCellProps extends Omit<TappableProps, "feedback"> {
  /** Leading content, e.g. an icon or avatar. */
  before?: React.ReactNode;
  /** Trailing content, e.g. a switch, counter or button-free text. */
  after?: React.ReactNode;
  /** Secondary value shown before `after`, e.g. the current setting. */
  indicator?: React.ReactNode;
  /** Small text above the title. */
  overTitle?: React.ReactNode;
  subtitle?: React.ReactNode;
  extraSubtitle?: React.ReactNode;
  badgeBeforeTitle?: React.ReactNode;
  badgeAfterTitle?: React.ReactNode;
  badgeBeforeSubtitle?: React.ReactNode;
  badgeAfterSubtitle?: React.ReactNode;
  /** Show a trailing chevron for navigational rows. @default false */
  chevron?: boolean;
  /** @default "m" */
  chevronSize?: "s" | "m";
  /** Wrap long text instead of truncating it. @default false */
  multiline?: boolean;
  /** Background tint on hover. @default true */
  hasHover?: boolean;
  /** Background tint while pressed. @default true */
  hasActive?: boolean;
}

/**
 * Base list row: before slot, title with badges, subtitle lines, indicator, after slot and chevron.
 * Renders a `button` with `onClick`, an `a` with `href`, otherwise a `div`.
 */
export const SimpleCell = React.forwardRef<HTMLElement, SimpleCellProps>(function SimpleCell(
  {
    before,
    after,
    indicator,
    overTitle,
    subtitle,
    extraSubtitle,
    badgeBeforeTitle,
    badgeAfterTitle,
    badgeBeforeSubtitle,
    badgeAfterSubtitle,
    chevron = false,
    chevronSize = "m",
    multiline = false,
    hasHover = true,
    hasActive = true,
    className,
    children,
    ...rest
  },
  ref,
) {
  const text = multiline ? "break-words" : "truncate";
  const hasSubtitle = subtitle || badgeBeforeSubtitle || badgeAfterSubtitle;
  return (
    <Tappable
      ref={ref}
      className={cn(
        "flex w-full min-h-cell items-center gap-3 border-0 bg-transparent px-4 text-start text-foreground no-underline",
        !hasHover && "hover:after:opacity-0",
        !hasActive && "active:after:opacity-0",
        className,
      )}
      {...rest}
    >
      {before && <span className="flex shrink-0 items-center py-2">{before}</span>}
      <span data-cell-content="" className="flex min-w-0 flex-1 flex-col items-start py-2">
        {overTitle && <span className={cn("max-w-full text-footnote text-subtle-foreground", text)}>{overTitle}</span>}
        {overTitle && " "}
        <span className="flex max-w-full items-center gap-1">
          {badgeBeforeTitle && <span className="inline-flex shrink-0">{badgeBeforeTitle}</span>}
          <span className={cn("min-w-0 text-body", text)}>{children}</span>
          {badgeAfterTitle && <span className="inline-flex shrink-0">{badgeAfterTitle}</span>}
        </span>
        {/* Bare spaces between line elements: flex ignores them visually, the accessible name keeps them. */}
        {hasSubtitle && " "}
        {hasSubtitle && (
          <span className="flex max-w-full items-center gap-1 text-subhead text-subtle-foreground">
            {badgeBeforeSubtitle && <span className="inline-flex shrink-0">{badgeBeforeSubtitle}</span>}
            {subtitle && <span className={cn("min-w-0", text)}>{subtitle}</span>}
            {badgeAfterSubtitle && <span className="inline-flex shrink-0">{badgeAfterSubtitle}</span>}
          </span>
        )}
        {extraSubtitle && " "}
        {extraSubtitle && (
          <span className={cn("max-w-full text-subhead text-subtle-foreground", text)}>{extraSubtitle}</span>
        )}
      </span>
      {indicator && " "}
      {indicator && <span className="shrink-0 text-body text-muted-foreground">{indicator}</span>}
      {after && <span className="flex shrink-0 items-center">{after}</span>}
      {chevron && <Chevron size={chevronSize} />}
    </Tappable>
  );
});
