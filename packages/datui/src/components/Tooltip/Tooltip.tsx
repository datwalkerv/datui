import { Tooltip as TooltipPrimitive } from "radix-ui";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { type Placement, toSideAlign } from "../../internal/Popper/placement";
import {
  type TooltipAppearance,
  TooltipBody,
  tooltipAppearances,
  tooltipBubble,
} from "../../internal/TooltipBase/TooltipBase";
import { usePortalContainer } from "../../lib/portal";
import { cn } from "../../lib/utils";

export type { Placement, TooltipAppearance };

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  /** The anchor: one element that can hold a ref and receive focus. */
  children: React.ReactElement;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** @default "neutral" */
  appearance?: TooltipAppearance;
  /** @default "bottom" */
  placement?: Placement;
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Delay before showing on hover, in ms. @default 150 */
  hoverDelay?: number;
  /** Do not open when the anchor receives keyboard focus. */
  disableFocusTrigger?: boolean;
  /** Keep the tooltip open while the pointer is over it, so it can hold links or a close button. */
  interactive?: boolean;
  /** Show a close button (implies `interactive`). */
  closable?: boolean;
  /** @default "Close" */
  closeLabel?: string;
  hideArrow?: boolean;
  /** Max width as a CSS length. @default 220px token */
  maxWidth?: number | string;
  /** Distance from the anchor in px. @default 8 */
  offset?: number;
}

/** Short hint shown on hover and focus of its anchor. Not for essential content. */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    children,
    title,
    description,
    appearance = "neutral",
    placement = "bottom",
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    hoverDelay = 150,
    disableFocusTrigger = false,
    interactive = false,
    closable = false,
    closeLabel = "Close",
    hideArrow = false,
    maxWidth,
    offset = 8,
    className,
    style,
    ...rest
  },
  ref,
) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const container = usePortalContainer();
  const { side, align } = toSideAlign(placement);
  const colors = tooltipAppearances[appearance];
  return (
    <TooltipPrimitive.Provider delayDuration={hoverDelay} disableHoverableContent={!(interactive || closable)}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger
          asChild
          onFocus={disableFocusTrigger ? (e: React.FocusEvent) => e.preventDefault() : undefined}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal container={container}>
          <TooltipPrimitive.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={offset}
            collisionPadding={8}
            className={cn(
              tooltipBubble,
              "z-tooltip max-w-tooltip data-[state=closed]:animate-fade-out data-[state=delayed-open]:animate-fade-in data-[state=instant-open]:animate-fade-in",
              colors.bubble,
              className,
            )}
            style={{ maxWidth, ...style }}
            {...rest}
          >
            <TooltipBody
              title={title}
              description={description}
              onClose={closable ? () => setOpen(false) : undefined}
              closeLabel={closeLabel}
            />
            {!hideArrow && <TooltipPrimitive.Arrow width={12} height={6} className={colors.arrow} />}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
});
