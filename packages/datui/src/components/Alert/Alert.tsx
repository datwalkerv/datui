import { X } from "lucide-react";
import { AlertDialog } from "radix-ui";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { Lifecycle, type RestoreFocus, useFocusReturn } from "../../internal/ModalShell/ModalShell";
import { usePortalContainer } from "../../lib/portal";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { Button } from "../Button/Button";

export type AlertCloseReason = "click-overlay" | "click-item" | "escape-key" | "click-close-button";

export interface AlertActionItem {
  title: string;
  /** `cancel` is a neutral button and gets initial focus; `destructive` is red. @default "default" */
  mode?: "default" | "cancel" | "destructive";
  /** Runs on click. With `autoCloseDisabled`, call `close()` yourself. */
  action?: (ctx: { close: () => void }) => void;
  autoCloseDisabled?: boolean;
  /** Render the action as a link. */
  href?: string;
}

export interface AlertActionRenderProps {
  action: AlertActionItem;
  mode: "default" | "cancel" | "destructive";
  stretched: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  children: string;
}

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Controlled visibility. Mount the Alert to show it, or drive it with `open`. */
  open?: boolean;
  /** @default true */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: (reason: AlertCloseReason) => void;
  /** Called after the exit animation, once the dialog has unmounted. */
  onClosed?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: AlertActionItem[];
  /** Replace the default action button. Spread `onClick` on your element. */
  renderAction?: (props: AlertActionRenderProps) => React.ReactNode;
  /** @default "horizontal" */
  actionsLayout?: "horizontal" | "vertical";
  /** @default "end" */
  actionsAlign?: "start" | "center" | "end";
  /** Close (X) button; shown on regular width only. @default "inside" */
  dismissButtonMode?: "inside" | "none";
  /** @default "Close" */
  closeLabel?: string;
  /** @default true */
  restoreFocus?: RestoreFocus;
}

const modeButton = {
  default: { variant: "primary", appearance: "accent" },
  cancel: { variant: "secondary", appearance: "neutral" },
  destructive: { variant: "primary", appearance: "negative" },
} as const;

/** Default action button (the inventory's AlertAction). */
function AlertAction({ action, mode, stretched, onClick, children }: AlertActionRenderProps) {
  return (
    <Button {...modeButton[mode]} stretched={stretched} href={action.href} onClick={onClick}>
      {children}
    </Button>
  );
}

const aligns = { start: "justify-start", center: "justify-center", end: "justify-end" } as const;

/** Blocking confirmation dialog with a title, description and a row of actions. */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    onClose,
    onClosed,
    title,
    description,
    actions = [],
    renderAction = AlertAction,
    actionsLayout = "horizontal",
    actionsAlign = "end",
    dismissButtonMode = "inside",
    closeLabel = "Close",
    restoreFocus = true,
    className,
    ...rest
  },
  ref,
) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const container = usePortalContainer();
  const focus = useFocusReturn(restoreFocus);
  const compact = useAdaptivity().sizeX === "compact";
  const close = (reason: AlertCloseReason) => {
    onClose?.(reason);
    setOpen(false);
  };
  const vertical = actionsLayout === "vertical";
  // Radix focuses its Cancel part on open: the first cancel action, else the first action.
  const focusIndex = Math.max(
    0,
    actions.findIndex((a) => a.mode === "cancel"),
  );

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal container={container}>
        <AlertDialog.Overlay
          className="fixed inset-0 z-modal grid place-items-center overflow-y-auto bg-overlay p-4 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) close("click-overlay");
          }}
        >
          <AlertDialog.Content
            ref={ref}
            className={cn(
              "relative flex w-full max-w-alert flex-col gap-2 rounded-2xl bg-background p-5 text-foreground shadow-lg outline-none",
              "data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in",
              className,
            )}
            {...(description ? {} : { "aria-describedby": undefined })}
            {...rest}
            onOpenAutoFocus={focus.onOpenAutoFocus}
            onCloseAutoFocus={focus.onCloseAutoFocus}
            onEscapeKeyDown={(e) => {
              e.preventDefault();
              close("escape-key");
            }}
          >
            <Lifecycle onUnmount={onClosed} />
            {title && (
              <AlertDialog.Title className={cn("m-0 text-title-3 font-semibold", !compact && "pe-8")}>
                {title}
              </AlertDialog.Title>
            )}
            {description && (
              <AlertDialog.Description className="m-0 text-paragraph text-subtle-foreground">
                {description}
              </AlertDialog.Description>
            )}
            {actions.length > 0 && (
              <div className={cn("mt-3 flex gap-2", vertical ? "flex-col" : cn("flex-wrap", aligns[actionsAlign]))}>
                {actions.map((action, i) => {
                  const mode = action.mode ?? "default";
                  const node = renderAction({
                    action,
                    mode,
                    stretched: vertical,
                    children: action.title,
                    onClick: () => {
                      action.action?.({ close: () => close("click-item") });
                      if (!action.autoCloseDisabled) close("click-item");
                    },
                  });
                  return (
                    <React.Fragment key={action.title}>
                      {i === focusIndex ? <AlertDialog.Cancel asChild>{node}</AlertDialog.Cancel> : node}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
            {!compact && dismissButtonMode === "inside" && (
              <button
                type="button"
                aria-label={closeLabel}
                onClick={() => close("click-close-button")}
                className="absolute end-3 top-3 inline-flex size-control-s items-center justify-center rounded-full text-icon-secondary hover:bg-secondary focus-visible:focus-ring"
              >
                <X aria-hidden className="size-icon-md" />
              </button>
            )}
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
});
