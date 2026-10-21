import * as React from "react";
import { cn } from "../../lib/utils";
import { Separator, type SeparatorProps } from "../Separator/Separator";

export type CellButtonGroupProps = React.HTMLAttributes<HTMLDivElement>;

export type CellButtonGroupSeparatorProps = Omit<SeparatorProps, "direction" | "padding">;

/** Inset horizontal line between CellButtons in a group. */
export const CellButtonGroupSeparator = React.forwardRef<HTMLDivElement, CellButtonGroupSeparatorProps>(
  function CellButtonGroupSeparator({ className, ...rest }, ref) {
    return <Separator ref={ref} direction="horizontal" className={cn("px-4", className)} {...rest} />;
  },
);

const CellButtonGroupBase = React.forwardRef<HTMLDivElement, CellButtonGroupProps>(function CellButtonGroup(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn("flex flex-col overflow-hidden rounded-lg bg-card", className)} {...rest} />;
});

/** Stacks CellButtons into one rounded block. Pass `role="group"` and `aria-label` when the group needs a name. */
export const CellButtonGroup = Object.assign(CellButtonGroupBase, { Separator: CellButtonGroupSeparator });
