import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { type Placement, toSideAlign } from "../../internal/Popper/placement";
import { usePortalContainer } from "../../lib/portal";
import { cn } from "../../lib/utils";

export type PopoverTrigger = "click" | "hover" | "focus";

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content" | "children"> {
  /** The trigger: one element that can hold a ref. It gets `aria-expanded`, `aria-controls` and `aria-haspopup`. */
  children: React.ReactElement;
  /** Panel content, or a render function receiving `onClose`. */
  content: React.ReactNode | ((ctx: { onClose: () => void }) => React.ReactNode);
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** What opens the popover. @default "click" */
  trigger?: PopoverTrigger | PopoverTrigger[];
  /** Hover open/close delays in ms: one number for both or `[open, close]`. @default 150 */
  hoverDelay?: number | [number, number];
  /** @default "bottom-start" */
  placement?: Placement;
  /** Distance from the trigger in px. @default 8 */
  offset?: number;
  /** Shift along the trigger edge in px. @default 0 */
  crossOffset?: number;
  /** Show an arrow pointing at the trigger. */
  arrow?: boolean;
  /** Match the trigger's width. */
  sameWidth?: boolean;
  /** Close when anything inside the panel is clicked. */
  closeOnContentClick?: boolean;
  disableCloseOnClickOutside?: boolean;
  disableCloseOnEscape?: boolean;
  /** Never open. */
  disabled?: boolean;
  /** Keep the panel in the DOM (hidden) while closed. */
  keepMounted?: boolean;
  /** Drop the default surface styles. */
  unstyled?: boolean;
  /** Trap focus inside and block outside interaction while open. @default false */
  modal?: boolean;
  /** Hide the panel when the trigger scrolls out of view. */
  hideWhenAnchorHidden?: boolean;
  /** @default "dialog" */
  role?: string;
}

/** Floating panel anchored to a trigger, for arbitrary interactive content. */
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    children,
    content,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    trigger = "click",
    hoverDelay = 150,
    placement = "bottom-start",
    offset = 8,
    crossOffset = 0,
    arrow = false,
    sameWidth = false,
    closeOnContentClick = false,
    disableCloseOnClickOutside = false,
    disableCloseOnEscape = false,
    disabled = false,
    keepMounted = false,
    unstyled = false,
    modal = false,
    hideWhenAnchorHidden = false,
    className,
    style,
    onClick,
    ...rest
  },
  ref,
) {
  const [open, setOpenState] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const setOpen = (next: boolean) => setOpenState(next && disabled ? false : next);
  const container = usePortalContainer();
  const triggers = Array.isArray(trigger) ? trigger : [trigger];
  const [openDelay, closeDelay] = Array.isArray(hoverDelay) ? hoverDelay : [hoverDelay, hoverDelay];
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  // Hover/focus opens keep focus on the trigger instead of moving it into the panel.
  const passiveOpen = React.useRef(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const schedule = (next: boolean, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      passiveOpen.current = next;
      setOpen(next);
    }, delay);
  };
  const hover = triggers.includes("hover");
  const hoverProps = hover
    ? {
        onPointerEnter: (e: React.PointerEvent) => e.pointerType !== "touch" && schedule(true, openDelay),
        onPointerLeave: (e: React.PointerEvent) => e.pointerType !== "touch" && schedule(false, closeDelay),
      }
    : {};
  const { side, align } = toSideAlign(placement);
  const onClose = () => setOpen(false);
  const mergeRef = (node: HTMLDivElement | null) => {
    contentRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverPrimitive.Trigger
        asChild
        {...hoverProps}
        onClick={(e: React.MouseEvent) => {
          passiveOpen.current = false;
          if (disabled || !triggers.includes("click")) e.preventDefault();
        }}
        onFocus={
          triggers.includes("focus")
            ? () => {
                passiveOpen.current = true;
                setOpen(true);
              }
            : undefined
        }
        onBlur={
          triggers.includes("focus")
            ? (e: React.FocusEvent) => {
                if (!contentRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
              }
            : undefined
        }
      >
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal container={container} forceMount={keepMounted || undefined}>
        <PopoverPrimitive.Content
          ref={mergeRef}
          forceMount={keepMounted || undefined}
          side={side}
          align={align}
          sideOffset={offset}
          alignOffset={crossOffset}
          collisionPadding={8}
          hideWhenDetached={hideWhenAnchorHidden}
          className={cn(
            "z-popover outline-none data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
            keepMounted && "data-[state=closed]:hidden",
            !unstyled &&
              "max-w-[min(var(--container-popover),var(--radix-popover-content-available-width))] rounded-xl bg-popover p-3 text-popover-foreground shadow-md",
            className,
          )}
          style={sameWidth ? { width: "var(--radix-popover-trigger-width)", maxWidth: "none", ...style } : style}
          onOpenAutoFocus={(e) => {
            if (passiveOpen.current) e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (disableCloseOnEscape) e.preventDefault();
          }}
          onInteractOutside={(e) => {
            if (disableCloseOnClickOutside) e.preventDefault();
          }}
          onClick={(e) => {
            onClick?.(e);
            if (closeOnContentClick) onClose();
          }}
          {...hoverProps}
          {...rest}
        >
          {typeof content === "function" ? content({ onClose }) : content}
          {arrow && <PopoverPrimitive.Arrow width={12} height={6} className={unstyled ? undefined : "fill-popover"} />}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});
