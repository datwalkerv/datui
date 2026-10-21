/**
 * The inventory's Popper: Radix-based overlays (Popover, Tooltip, ActionSheet menu) position through Radix Popper,
 * OnboardingTooltip through @floating-ui/react. This maps datui's `placement` strings onto Radix side/align.
 */
export type Side = "top" | "bottom" | "left" | "right";
export type Placement = Side | `${Side}-start` | `${Side}-end`;

export function toSideAlign(placement: Placement): { side: Side; align: "start" | "center" | "end" } {
  const [side, align = "center"] = placement.split("-") as [Side, "start" | "end" | undefined];
  return { side, align };
}
