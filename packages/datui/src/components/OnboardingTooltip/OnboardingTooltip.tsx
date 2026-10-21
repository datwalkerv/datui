import {
  arrow,
  autoUpdate,
  FloatingArrow,
  FloatingFocusManager,
  flip,
  offset as offsetMiddleware,
  type Placement,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { Slot } from "radix-ui";
import * as React from "react";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsomorphicLayoutEffect";
import { devWarning } from "../../internal/devWarning/devWarning";
import {
  type TooltipAppearance,
  TooltipBody,
  tooltipAppearances,
  tooltipBubble,
} from "../../internal/TooltipBase/TooltipBase";
import { Portal } from "../../lib/portal";
import { cn } from "../../lib/utils";

export interface OnboardingTooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  /** The element the hint points at: one element that can hold a ref. */
  children: React.ReactElement;
  open: boolean;
  /** Called on Escape and on any click outside the hint. */
  onClose?: () => void;
  /** Labels the hint dialog. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** @default "accent" */
  appearance?: TooltipAppearance;
  /** @default "bottom" */
  placement?: Placement;
  /** Distance from the anchor in px. @default 8 */
  offset?: number;
  /** Shift along the anchor edge in px. @default 0 */
  crossOffset?: number;
  hideArrow?: boolean;
  /** Pin the arrow this far (px) from the bubble's start edge instead of pointing at the anchor center. */
  arrowOffset?: number;
  /** Max width as a CSS length. @default 220px token */
  maxWidth?: number | string;
  /** Accessible name of the full-screen layer that closes the hint. @default "Close hint" */
  overlayLabel?: string;
  /** Return focus to the anchor's previously focused element on close. @default true */
  restoreFocus?: boolean;
  /** Let focus leave the hint. */
  disableFocusTrap?: boolean;
}

/** Remembers the focused element when the hint opens and focuses it again when the hint closes. */
function FocusMemory() {
  useIsomorphicLayoutEffect(() => {
    const previous = document.activeElement;
    return () => {
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, []);
  return null;
}

/** Spotlight hint for onboarding: points at an element and blocks the page until dismissed. */
export const OnboardingTooltip = React.forwardRef<HTMLDivElement, OnboardingTooltipProps>(function OnboardingTooltip(
  {
    children,
    open,
    onClose,
    title,
    description,
    appearance = "accent",
    placement = "bottom",
    offset = 8,
    crossOffset = 0,
    hideArrow = false,
    arrowOffset,
    maxWidth,
    overlayLabel = "Close hint",
    restoreFocus = true,
    disableFocusTrap = false,
    className,
    style,
    ...rest
  },
  ref,
) {
  const arrowRef = React.useRef<SVGSVGElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: (next) => {
      if (!next) onClose?.();
    },
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetMiddleware({ mainAxis: offset, crossAxis: crossOffset }),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });
  const { getFloatingProps } = useInteractions([useDismiss(context, { outsidePress: false })]);
  const floatingRef = React.useMemo(() => {
    return (node: HTMLDivElement | null) => {
      refs.setFloating(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };
  }, [refs, ref]);
  const labelled = Boolean(title || rest["aria-label"] || rest["aria-labelledby"]);
  React.useEffect(() => {
    if (open && !labelled) devWarning("OnboardingTooltip needs `title`, `aria-label` or `aria-labelledby`.");
  }, [open, labelled]);
  const colors = tooltipAppearances[appearance];

  return (
    <>
      <Slot.Root ref={refs.setReference} aria-describedby={open && description ? descriptionId : undefined}>
        {children}
      </Slot.Root>
      {open && (
        <Portal>
          {/* Placed before the focus manager so it reads focus before the manager moves it. */}
          {restoreFocus && <FocusMemory />}
          <button
            type="button"
            aria-label={overlayLabel}
            onClick={onClose}
            className="fixed inset-0 z-modal block size-full cursor-default bg-overlay-light animate-fade-in"
          />
          <FloatingFocusManager context={context} modal={!disableFocusTrap} returnFocus={false}>
            <div
              ref={floatingRef}
              role="dialog"
              aria-modal={!disableFocusTrap || undefined}
              aria-labelledby={title ? titleId : undefined}
              aria-describedby={description ? descriptionId : undefined}
              tabIndex={-1}
              className={cn(tooltipBubble, "z-tooltip max-w-tooltip animate-fade-in", colors.bubble, className)}
              style={{ ...floatingStyles, maxWidth, ...style }}
              {...getFloatingProps(rest)}
            >
              <TooltipBody title={title} titleId={titleId} description={description} descriptionId={descriptionId} />
              {!hideArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  width={12}
                  height={6}
                  staticOffset={arrowOffset}
                  className={colors.arrow}
                />
              )}
            </div>
          </FloatingFocusManager>
        </Portal>
      )}
    </>
  );
});
