import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import {
  Lifecycle,
  ModalDescription,
  ModalShell,
  ModalTitle,
  type RestoreFocus,
  useFocusReturn,
} from "../../internal/ModalShell/ModalShell";
import { type Placement, toSideAlign } from "../../internal/Popper/placement";
import { usePortalContainer } from "../../lib/portal";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";

export type ActionSheetCloseReason =
  | "click-action-item"
  | "click-cancel-item"
  | "click-overlay"
  | "keydown-item"
  | "escape-key"
  | "swipe-down";

interface ActionSheetContextValue {
  mode: "sheet" | "menu";
  /** Close the sheet; `after` runs once it has finished closing. */
  close: (reason: ActionSheetCloseReason, after?: () => void) => void;
}

const ActionSheetContext = React.createContext<ActionSheetContextValue>({ mode: "sheet", close: () => {} });

export function useActionSheet(): ActionSheetContextValue {
  return React.useContext(ActionSheetContext);
}

export interface ActionSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Controlled visibility. Mount the sheet to show it, or drive it with `open`. */
  open?: boolean;
  /** @default true */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: (reason: ActionSheetCloseReason) => void;
  /** Called after the sheet has closed and unmounted (after deferred item `onClick`s). */
  onClosed?: () => void;
  /** The element the menu is anchored to on regular width (usually the button that opened it). */
  anchorRef?: React.RefObject<HTMLElement | null>;
  /** Force a layout. Default: `sheet` on compact width, `menu` on regular width. */
  mode?: "sheet" | "menu";
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Menu placement relative to the anchor. @default "bottom-end" */
  placement?: Placement;
  /** Menu distance from the anchor in px. @default 4 */
  offset?: number;
  /** Label of the cancel row in sheet mode. @default "Cancel" */
  cancelLabel?: string;
  /** Where focus goes on close. @default the anchor */
  restoreFocus?: RestoreFocus;
  /** `ActionSheetItem` elements. */
  children?: React.ReactNode;
}

const ITEM_SELECTOR = '[role^="menuitem"]:not(:disabled):not([aria-disabled="true"])';

/** Roving focus for the menu layout: arrows, Home/End and first-letter typeahead. */
function handleMenuKeyDown(event: React.KeyboardEvent<HTMLElement>) {
  const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
  if (items.length === 0) return;
  const index = items.indexOf(document.activeElement as HTMLElement);
  let next: HTMLElement | undefined;
  if (event.key === "ArrowDown") next = items[(index + 1) % items.length];
  else if (event.key === "ArrowUp") next = items[(index - 1 + items.length) % items.length];
  else if (event.key === "Home") next = items[0];
  else if (event.key === "End") next = items[items.length - 1];
  else if (event.key.length === 1 && /\S/.test(event.key)) {
    const key = event.key.toLowerCase();
    const ordered = [...items.slice(index + 1), ...items.slice(0, index + 1)];
    next = ordered.find((item) => item.textContent?.trim().toLowerCase().startsWith(key));
  }
  if (next) {
    event.preventDefault();
    next.focus();
  }
}

/** A list of actions: a bottom sheet on compact width, a menu anchored to `anchorRef` on regular width. */
export const ActionSheet = React.forwardRef<HTMLDivElement, ActionSheetProps>(function ActionSheet(
  {
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    onClose,
    onClosed,
    anchorRef,
    mode: modeProp,
    title,
    description,
    placement = "bottom-end",
    offset = 4,
    cancelLabel = "Cancel",
    restoreFocus,
    className,
    children,
    ...rest
  },
  ref,
) {
  const compact = useAdaptivity().sizeX === "compact";
  const mode = modeProp ?? (compact ? "sheet" : "menu");
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const container = usePortalContainer();
  const focus = useFocusReturn(restoreFocus ?? (() => anchorRef?.current ?? true));
  const titleId = React.useId();
  const pending = React.useRef<(() => void) | undefined>(undefined);
  const reason = React.useRef<ActionSheetCloseReason | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const close = React.useCallback(
    (r: ActionSheetCloseReason, after?: () => void) => {
      pending.current = after;
      onClose?.(r);
      setOpen(false);
    },
    [onClose, setOpen],
  );
  const context = React.useMemo(() => ({ mode, close }), [mode, close]);
  const handleClosed = () => {
    const run = pending.current;
    pending.current = undefined;
    run?.();
    onClosed?.();
  };

  if (mode === "sheet") {
    return (
      <ModalShell
        ref={ref}
        compact
        open={open}
        onClose={(r) => close(r === "click-close-button" ? "click-cancel-item" : r)}
        onClosed={handleClosed}
        restoreFocus={restoreFocus ?? (() => anchorRef?.current ?? true)}
        hasDescription={Boolean(description)}
        sheetClassName={cn("m-2 gap-2 bg-transparent", className)}
        {...rest}
      >
        <ActionSheetContext.Provider value={context}>
          <div className="flex flex-col overflow-y-auto rounded-2xl bg-background text-foreground">
            {(title || description) && (
              <div className="flex flex-col gap-1 border-separator border-b px-4 py-3 text-center">
                {title && <ModalTitle className="m-0 text-subhead font-semibold">{title}</ModalTitle>}
                {description && (
                  <ModalDescription className="m-0 text-footnote text-subtle-foreground">
                    {description}
                  </ModalDescription>
                )}
              </div>
            )}
            <div className="flex flex-col py-1">{children}</div>
          </div>
          {cancelLabel && (
            <button
              type="button"
              onClick={() => close("click-cancel-item")}
              className="min-h-cell rounded-2xl bg-background px-4 text-body font-semibold text-primary focus-visible:focus-ring"
            >
              {cancelLabel}
            </button>
          )}
        </ActionSheetContext.Provider>
      </ModalShell>
    );
  }

  const { side, align } = toSideAlign(placement);
  return (
    <PopoverPrimitive.Root
      open={open}
      modal
      onOpenChange={(next) => {
        if (next) return;
        close(reason.current ?? "click-overlay");
        reason.current = null;
      }}
    >
      {anchorRef && <PopoverPrimitive.Anchor virtualRef={anchorRef} />}
      <PopoverPrimitive.Portal container={container}>
        <PopoverPrimitive.Content
          ref={(node) => {
            contentRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="menu"
          aria-labelledby={title ? titleId : undefined}
          side={side}
          align={align}
          sideOffset={offset}
          collisionPadding={8}
          className={cn(
            "z-popover flex min-w-menu flex-col rounded-xl bg-popover p-1 text-popover-foreground shadow-md outline-none",
            "data-[state=closed]:animate-fade-out data-[state=open]:animate-scale-in",
            className,
          )}
          onKeyDown={handleMenuKeyDown}
          onOpenAutoFocus={(e) => {
            focus.onOpenAutoFocus();
            e.preventDefault();
            contentRef.current?.querySelector<HTMLElement>(ITEM_SELECTOR)?.focus();
          }}
          onCloseAutoFocus={focus.onCloseAutoFocus}
          onEscapeKeyDown={() => {
            reason.current = "escape-key";
          }}
          {...rest}
        >
          <Lifecycle onUnmount={handleClosed} />
          <ActionSheetContext.Provider value={context}>
            {(title || description) && (
              <div role="none" className="flex flex-col gap-0.5 px-3 py-2">
                {title && (
                  <span id={titleId} className="text-subhead font-semibold">
                    {title}
                  </span>
                )}
                {description && <span className="text-footnote text-subtle-foreground">{description}</span>}
              </div>
            )}
            {children}
          </ActionSheetContext.Provider>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});
