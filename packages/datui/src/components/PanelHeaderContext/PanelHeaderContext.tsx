import * as React from "react";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { useTransitionMotion } from "../ConfigProvider/ConfigProvider";

export interface PanelHeaderContextProps extends React.HTMLAttributes<HTMLDivElement> {
  opened: boolean;
  /** Called on Escape and on a press outside the sheet and its trigger. */
  onClose: () => void;
  /** Accessible name of the sheet. @default "Options" */
  label?: string;
}

/** Longer than the exit animation; unmounts even if `animationend` never fires. */
const EXIT_TIMEOUT = 300;

/**
 * Drop-down sheet under the `PanelHeader`. Place it right after the header. Give the trigger
 * `aria-controls={id}` so pressing it toggles instead of counting as an outside press.
 */
export const PanelHeaderContext = React.forwardRef<HTMLDivElement, PanelHeaderContextProps>(function PanelHeaderContext(
  { opened, onClose, label = "Options", id, className, children, ...rest },
  ref,
) {
  const autoId = React.useId();
  const sheetId = id ?? autoId;
  const motion = useTransitionMotion();
  const { sizeX } = useAdaptivity();
  const [mounted, setMounted] = React.useState(opened);
  const sheet = React.useRef<HTMLDivElement | null>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  if (opened && !mounted) setMounted(true);
  const closing = mounted && !opened;

  React.useEffect(() => {
    if (!closing) return;
    if (!motion) return setMounted(false);
    const timer = setTimeout(() => setMounted(false), EXIT_TIMEOUT);
    return () => clearTimeout(timer);
  }, [closing, motion]);

  // Focus in on open, back to the trigger on close; Escape and outside presses close.
  React.useEffect(() => {
    if (!opened) return;
    const returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    sheet.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target;
      if (!(t instanceof Element) || sheet.current?.contains(t)) return;
      const trigger = t.closest("[aria-controls]");
      if (trigger?.getAttribute("aria-controls")?.split(" ").includes(sheetId)) return;
      onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      const focused = document.activeElement;
      if (returnTo?.isConnected && (!focused || focused === document.body || sheet.current?.contains(focused))) {
        returnTo.focus({ preventScroll: true });
      }
    };
  }, [opened, sheetId]);

  const lock = opened && sizeX === "compact";
  React.useEffect(() => {
    if (!lock) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lock]);

  if (!mounted) return null;
  return (
    <div className="sticky top-panel-header z-dropdown h-0">
      <div
        aria-hidden
        data-backdrop=""
        className={cn("absolute inset-x-0 top-0 h-dvh bg-overlay", closing ? "animate-fade-out" : "animate-fade-in")}
      />
      <div
        ref={(el) => {
          sheet.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        id={sheetId}
        role="dialog"
        aria-label={label}
        tabIndex={-1}
        data-state={closing ? "closing" : "open"}
        className={cn(
          "absolute inset-x-0 top-0 max-h-[70dvh] overflow-y-auto rounded-b-xl bg-background shadow-md outline-none",
          closing ? "animate-nav-drop-out" : "animate-nav-drop-in",
          className,
        )}
        onAnimationEnd={(e) => {
          if (closing && e.target === e.currentTarget) setMounted(false);
        }}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
});
