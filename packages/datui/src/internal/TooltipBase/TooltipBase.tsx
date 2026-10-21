import { X } from "lucide-react";
import type * as React from "react";
import { cn } from "../../lib/utils";

/**
 * The inventory's TooltipBase: bubble colors and inner layout shared by Tooltip and OnboardingTooltip.
 * Arrows come from Radix `Tooltip.Arrow` / floating-ui `FloatingArrow` (the inventory's FloatingArrow), colored here.
 */
export type TooltipAppearance = "neutral" | "accent" | "white" | "black" | "inversion";

export const tooltipAppearances: Record<TooltipAppearance, { bubble: string; arrow: string }> = {
  neutral: { bubble: "bg-tooltip-neutral text-tooltip-neutral-foreground", arrow: "fill-tooltip-neutral" },
  accent: { bubble: "bg-primary text-primary-foreground", arrow: "fill-primary" },
  white: { bubble: "bg-white text-black shadow-md", arrow: "fill-white" },
  black: { bubble: "bg-black text-white", arrow: "fill-black" },
  inversion: { bubble: "bg-foreground text-background", arrow: "fill-foreground" },
};

export const tooltipBubble = "relative rounded-lg px-3 py-2 text-subhead outline-none";

export interface TooltipBodyProps {
  title?: React.ReactNode;
  titleId?: string;
  description?: React.ReactNode;
  descriptionId?: string;
  /** Renders a close button when set. */
  onClose?: () => void;
  closeLabel?: string;
}

export function TooltipBody({
  title,
  titleId,
  description,
  descriptionId,
  onClose,
  closeLabel = "Close",
}: TooltipBodyProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="min-w-0 flex-1">
        {title && (
          <div id={titleId} className="font-semibold">
            {title}
          </div>
        )}
        {description && (
          <div id={descriptionId} className={cn(title && "mt-0.5 opacity-90")}>
            {description}
          </div>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="-me-1 inline-flex shrink-0 rounded-full opacity-80 hover:opacity-100 focus-visible:focus-ring"
        >
          <X aria-hidden className="dt-icon-turn size-icon-sm" />
        </button>
      )}
    </div>
  );
}
