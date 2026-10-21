import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Clickable, type ClickableProps } from "../Clickable/Clickable";

export interface LinkProps extends ClickableProps {
  /** Icon before the text. Decorative. */
  before?: React.ReactNode;
  /** Icon after the text. Decorative. */
  after?: React.ReactNode;
  /** Never underline, even on hover. */
  noUnderline?: boolean;
  /** Style visited links differently. */
  hasVisited?: boolean;
  /** Merge link styles onto the single child element, e.g. a router link. */
  asChild?: boolean;
  /** Announced after the text when `target="_blank"`. @default "(opens in a new tab)" */
  newTabLabel?: string;
}

/** Inline text link. Renders `<a>` with `href`, a `<button>` with only `onClick`. */
export const Link = React.forwardRef<HTMLElement, LinkProps>(function Link(
  {
    before,
    after,
    noUnderline,
    hasVisited,
    asChild,
    newTabLabel = "(opens in a new tab)",
    className,
    children,
    ...rest
  },
  ref,
) {
  const classes = cn(
    "inline cursor-pointer rounded-xs border-0 bg-transparent p-0 text-link no-underline outline-none [font:inherit] focus-visible:focus-ring",
    !noUnderline && "hover:underline",
    hasVisited && "visited:text-link-visited",
    "disabled:cursor-default disabled:no-underline disabled:opacity-(--dt-opacity-disabled) aria-disabled:cursor-default aria-disabled:no-underline aria-disabled:opacity-(--dt-opacity-disabled)",
    className,
  );
  const icon = (node: React.ReactNode, side: string) =>
    node ? (
      <span aria-hidden className={cn("inline-flex align-middle [&_svg]:size-[1em]", side)}>
        {node}
      </span>
    ) : null;
  const newTab =
    rest.target === "_blank" ? (
      <>
        {" "}
        <span className="sr-only">{newTabLabel}</span>
      </>
    ) : null;
  if (asChild) {
    // Slot needs the parts as direct children to find the Slottable.
    return (
      <Slot.Root ref={ref} className={classes} {...rest}>
        {icon(before, "me-1")}
        <Slot.Slottable>{children}</Slot.Slottable>
        {icon(after, "ms-1")}
        {newTab}
      </Slot.Root>
    );
  }
  return (
    <Clickable ref={ref} className={classes} {...rest}>
      {icon(before, "me-1")}
      {children}
      {icon(after, "ms-1")}
      {newTab}
    </Clickable>
  );
});
