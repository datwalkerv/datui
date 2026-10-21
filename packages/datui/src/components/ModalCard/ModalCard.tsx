import * as React from "react";
import {
  type ModalCloseReason,
  ModalDescription,
  ModalShell,
  ModalTitle,
  type RestoreFocus,
} from "../../internal/ModalShell/ModalShell";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";

export interface ModalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** @default false */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: (reason: ModalCloseReason) => void;
  onOpened?: () => void;
  onClosed?: () => void;
  icon?: React.ReactNode;
  /** Labels the dialog. */
  title?: React.ReactNode;
  /** @default "h2" */
  titleAs?: React.ElementType;
  /** Describes the dialog (`aria-describedby`). */
  description?: React.ReactNode;
  /** Buttons at the bottom, stacked full width. */
  actions?: React.ReactNode;
  /** Max width on regular width (CSS length). */
  size?: number | string;
  /**
   * Where the close button goes. `outside` (above the card) applies on compact width only; regular width
   * always places it inside. @default "outside"
   */
  dismissButtonMode?: "inside" | "outside" | "none";
  /** @default "Close" */
  closeLabel?: string;
  /** Extra round buttons beside the dismiss button on compact width. */
  outsideButtons?: React.ReactNode;
  /** Block Escape, overlay click, swipe-down and hide the close button. */
  preventClose?: boolean;
  /** @default true */
  restoreFocus?: RestoreFocus;
  disableOverlay?: boolean;
  disableAnimation?: boolean;
}

/** Small modal for one message or decision. A centered card on regular width, a card docked to the bottom on compact. */
export const ModalCard = React.forwardRef<HTMLDivElement, ModalCardProps>(function ModalCard(
  {
    open = false,
    onOpenChange,
    onClose,
    icon,
    title,
    titleAs: TitleTag = "h2",
    description,
    actions,
    size,
    dismissButtonMode = "outside",
    closeLabel = "Close",
    outsideButtons,
    preventClose,
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
  const mode = preventClose ? "none" : !compact && dismissButtonMode === "outside" ? "inside" : dismissButtonMode;
  const dismiss = mode !== "none" && (
    <ModalDismissButton
      onClick={() => handleClose("click-close-button")}
      className={
        mode === "inside" ? "absolute end-3 top-3 size-control-s bg-secondary text-muted-foreground" : undefined
      }
    >
      {closeLabel}
    </ModalDismissButton>
  );
  const outside = compact && (mode === "outside" || outsideButtons) && (
    <>
      {outsideButtons}
      {mode === "outside" && dismiss}
    </>
  );
  return (
    <ModalShell
      ref={ref}
      open={open}
      compact={compact}
      onClose={handleClose}
      preventClose={preventClose}
      hasDescription={Boolean(description)}
      outsideButtons={outside || undefined}
      className={cn("max-w-modal-card rounded-2xl", className)}
      sheetClassName={cn("m-2 rounded-2xl bg-background text-foreground", className)}
      style={compact ? style : { maxWidth: size, ...style }}
      {...rest}
    >
      {mode === "inside" && dismiss}
      <div className="flex flex-col items-center gap-2 overflow-y-auto p-6 text-center">
        {icon && (
          <div className="mb-2 text-primary" aria-hidden>
            {icon}
          </div>
        )}
        {title && (
          <ModalTitle asChild>
            <TitleTag className="m-0 text-title-2 font-semibold">{title}</TitleTag>
          </ModalTitle>
        )}
        {description && (
          <ModalDescription className="m-0 text-paragraph text-subtle-foreground">{description}</ModalDescription>
        )}
        {children && <div className="mt-2 w-full">{children}</div>}
        {actions && <div className="mt-4 flex w-full flex-col gap-2">{actions}</div>}
      </div>
    </ModalShell>
  );
});
