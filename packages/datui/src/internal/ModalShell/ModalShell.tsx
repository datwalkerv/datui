import { Dialog } from "radix-ui";
import * as React from "react";
import { Drawer } from "vaul";
import { usePortalContainer } from "../../lib/portal";
import { cn } from "../../lib/utils";

/**
 * Shared shell for ModalPage and ModalCard. It folds the inventory's ModalOverlay (dimmed backdrop),
 * ModalOutlet (centering / bottom-docking layer) and ModalOutsideButtons (button stack beside the sheet).
 * Regular width: Radix Dialog, centered. Compact width: vaul Drawer, a draggable bottom sheet.
 */

export type ModalCloseReason = "click-overlay" | "click-close-button" | "escape-key" | "swipe-down";

/** `true` returns focus to the element focused before opening; a function may return another element (or `false`). */
export type RestoreFocus = boolean | (() => HTMLElement | boolean | null | undefined);

/** Radix only returns focus to its own Trigger; datui overlays are opened from any element, so remember and restore it. */
export function useFocusReturn(restoreFocus: RestoreFocus = true) {
  const previous = React.useRef<HTMLElement | null>(null);
  const restoreRef = React.useRef(restoreFocus);
  restoreRef.current = restoreFocus;
  return React.useMemo(
    () => ({
      onOpenAutoFocus: () => {
        previous.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      },
      onCloseAutoFocus: (event: Event) => {
        event.preventDefault();
        const restore = restoreRef.current;
        const result = typeof restore === "function" ? restore() : restore;
        const target = result instanceof HTMLElement ? result : result ? previous.current : null;
        if (target?.isConnected) target.focus();
      },
    }),
    [],
  );
}

/** Calls `onMount` when its parent content mounts and `onUnmount` once it is removed (after the exit animation). */
export function Lifecycle({ onMount, onUnmount }: { onMount?: () => void; onUnmount?: () => void }) {
  const ref = React.useRef({ onMount, onUnmount });
  ref.current = { onMount, onUnmount };
  React.useEffect(() => {
    ref.current.onMount?.();
    return () => ref.current.onUnmount?.();
  }, []);
  return null;
}

interface ModalShellContextValue {
  compact: boolean;
  close: (reason: ModalCloseReason) => void;
}

const ModalShellContext = React.createContext<ModalShellContextValue | null>(null);

export function useModalShell(): ModalShellContextValue | null {
  return React.useContext(ModalShellContext);
}

/** Radix Dialog title/description; vaul builds on the same Dialog package, so these work in both layouts. */
export const ModalTitle = Dialog.Title;
export const ModalDescription = Dialog.Description;

export interface ModalShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  compact: boolean;
  onClose?: (reason: ModalCloseReason) => void;
  onOpened?: () => void;
  onClosed?: () => void;
  preventClose?: boolean;
  restoreFocus?: RestoreFocus;
  disableOverlay?: boolean;
  disableAnimation?: boolean;
  /** Wire `aria-describedby` to a `ModalDescription` rendered inside. */
  hasDescription?: boolean;
  /** Buttons stacked above the sheet on compact width. */
  outsideButtons?: React.ReactNode;
  /** vaul snap points (fractions of the viewport height). */
  snapPoints?: number[];
  /** Classes for the compact sheet surface (`className` styles the regular dialog). */
  sheetClassName?: string;
}

export const ModalShell = React.forwardRef<HTMLDivElement, ModalShellProps>(function ModalShell(
  {
    open,
    compact,
    onClose,
    onOpened,
    onClosed,
    preventClose = false,
    restoreFocus = true,
    disableOverlay = false,
    disableAnimation = false,
    hasDescription = false,
    outsideButtons,
    snapPoints,
    className,
    sheetClassName,
    children,
    ...rest
  },
  ref,
) {
  const container = usePortalContainer();
  const focus = useFocusReturn(restoreFocus);
  const reason = React.useRef<ModalCloseReason | null>(null);
  const close = React.useCallback(
    (r: ModalCloseReason) => {
      if (!preventClose) onClose?.(r);
    },
    [onClose, preventClose],
  );
  const context = React.useMemo(() => ({ compact, close }), [compact, close]);

  const onOpenChange = (next: boolean) => {
    if (next) return;
    // vaul closes on drag without an event of its own, so an unexplained close on compact is a swipe.
    close(reason.current ?? (compact ? "swipe-down" : "click-overlay"));
    reason.current = null;
  };
  const contentProps = {
    ...rest,
    ...(hasDescription ? {} : { "aria-describedby": undefined }),
    ...focus,
    onEscapeKeyDown: (e: KeyboardEvent) => {
      if (preventClose) e.preventDefault();
      else reason.current = "escape-key";
    },
    onPointerDownOutside: (e: Event) => {
      if (preventClose) e.preventDefault();
      else reason.current = "click-overlay";
    },
  };
  const body = (
    <ModalShellContext.Provider value={context}>
      <Lifecycle onMount={onOpened} onUnmount={onClosed} />
      {children}
    </ModalShellContext.Provider>
  );
  const noMotion = "motion-reduce:animate-none! motion-reduce:transition-none!";

  if (compact) {
    // Dim from the first snap point, not only at full height.
    const snapProps: { snapPoints: number[]; fadeFromIndex: number } | { snapPoints?: undefined } = snapPoints
      ? { snapPoints, fadeFromIndex: 0 }
      : {};
    return (
      <Drawer.Root
        open={open}
        onOpenChange={onOpenChange}
        dismissible={!preventClose}
        {...snapProps}
        autoFocus
        container={container}
      >
        <Drawer.Portal>
          <Drawer.Overlay
            className={cn(
              "fixed inset-0 z-modal",
              !disableOverlay && "bg-overlay",
              noMotion,
              disableAnimation && "animate-none! transition-none!",
            )}
          />
          <Drawer.Content
            ref={ref}
            className={cn(
              "fixed inset-x-0 bottom-0 z-modal flex flex-col outline-none",
              snapPoints
                ? "h-[calc(100dvh-var(--spacing-panel-header))]"
                : "max-h-[calc(100dvh-var(--spacing-panel-header))]",
              noMotion,
              disableAnimation && "animate-none! transition-none!",
              sheetClassName,
            )}
            {...contentProps}
          >
            {outsideButtons && <div className="absolute end-3 bottom-full mb-3 flex gap-2">{outsideButtons}</div>}
            {body}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  const motion = !disableAnimation;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={container}>
        {/* The overlay doubles as the centering layer, so a click on it is an outside click for the content. */}
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-modal grid place-items-center overflow-y-auto p-4",
            !disableOverlay && "bg-overlay",
            motion && "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
          )}
        >
          <Dialog.Content
            ref={ref}
            className={cn(
              "relative flex max-h-[calc(100dvh---spacing(8))] w-full flex-col bg-background text-foreground shadow-lg outline-none",
              motion && "data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in",
              className,
            )}
            {...contentProps}
          >
            {body}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
