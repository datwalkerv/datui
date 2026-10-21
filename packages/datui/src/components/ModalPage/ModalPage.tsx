import * as React from "react";
import { type ModalCloseReason, ModalShell, type RestoreFocus } from "../../internal/ModalShell/ModalShell";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";

export type { ModalCloseReason, RestoreFocus };

const widths = { s: "max-w-modal-s", m: "max-w-modal-m", l: "max-w-modal-l" } as const;

export interface ModalPageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** @default false */
  open?: boolean;
  /** Called with `false` whenever the modal asks to close. */
  onOpenChange?: (open: boolean) => void;
  /** Called with the reason whenever the modal asks to close. */
  onClose?: (reason: ModalCloseReason) => void;
  /** Called once the modal has mounted. */
  onOpened?: () => void;
  /** Called after the exit animation, once the modal has unmounted. */
  onClosed?: () => void;
  /** Usually a `ModalPageHeader`; its title labels the dialog. */
  header?: React.ReactNode;
  footer?: React.ReactNode;
  /** Max width on regular width: a preset or any CSS length. @default "s" */
  size?: "s" | "m" | "l" | number | string;
  /** Fixed height (CSS length) on regular width. */
  height?: number | string;
  /**
   * Initial height of the compact sheet in percent of the viewport. Below 100 the sheet gets two snap points
   * (this height and full height) and can be dragged between them. Unset, the sheet fits its content.
   */
  settlingHeight?: 25 | 50 | 75 | 100;
  /** Block Escape, overlay click, swipe-down and hide the close button. */
  preventClose?: boolean;
  hideCloseButton?: boolean;
  /** @default "Close" */
  closeLabel?: string;
  /** Extra round buttons shown above the sheet on compact width (see `ModalOutsideButton`). */
  outsideButtons?: React.ReactNode;
  /** @default true */
  restoreFocus?: RestoreFocus;
  /** Keep the overlay transparent (it still blocks the page). */
  disableOverlay?: boolean;
  disableAnimation?: boolean;
}

/**
 * Modal panel with header, scrollable content and footer. A centered dialog on regular width and a
 * draggable bottom sheet on compact width.
 */
export const ModalPage = React.forwardRef<HTMLDivElement, ModalPageProps>(function ModalPage(
  {
    open = false,
    onOpenChange,
    onClose,
    header,
    footer,
    size = "s",
    height,
    settlingHeight,
    preventClose,
    hideCloseButton = false,
    closeLabel = "Close",
    outsideButtons,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const compact = useAdaptivity().sizeX === "compact";
  const handleClose = (reason: ModalCloseReason) => {
    onClose?.(reason);
    onOpenChange?.(false);
  };
  const preset = typeof size === "string" && size in widths ? widths[size as keyof typeof widths] : undefined;
  const showClose = !hideCloseButton && !preventClose;
  const dismiss = showClose && (
    <ModalDismissButton
      onClick={() => handleClose("click-close-button")}
      className={compact ? undefined : "absolute end-3 top-3 z-1 size-control-s bg-secondary text-muted-foreground"}
    >
      {closeLabel}
    </ModalDismissButton>
  );
  return (
    <ModalShell
      ref={ref}
      open={open}
      compact={compact}
      onClose={handleClose}
      preventClose={preventClose}
      snapPoints={settlingHeight && settlingHeight < 100 ? [settlingHeight / 100, 1] : undefined}
      outsideButtons={
        compact && (dismiss || outsideButtons) ? (
          <>
            {outsideButtons}
            {dismiss}
          </>
        ) : undefined
      }
      className={cn("overflow-hidden rounded-2xl", preset, className)}
      sheetClassName={cn("rounded-t-2xl bg-background text-foreground", className)}
      style={compact ? style : { maxWidth: preset ? undefined : size, height, ...style }}
      {...rest}
    >
      {compact && <div aria-hidden className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-sheet-handle" />}
      {!compact && dismiss}
      {header}
      {children}
      {footer && <div className="shrink-0 p-4">{footer}</div>}
    </ModalShell>
  );
});
