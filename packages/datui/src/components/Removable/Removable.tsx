import { CircleMinus, X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface RemovableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Called with the click event and the root element when the user confirms removal. */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>, rootEl: HTMLDivElement | null) => void;
  /** Label of the remove button (aria-label for `button`, visible text for `reveal`). @default "Remove" */
  removeLabel?: string;
  /** `button`: trailing ✕ removes at once. `reveal`: leading minus reveals a destructive "Remove" button (two steps). @default "button" */
  variant?: "button" | "reveal";
  /** Vertical alignment of the remove control. @default "center" */
  align?: "start" | "center";
  /** Keep the control's space but hide it, to line up with removable siblings. @default false */
  indent?: boolean;
  /** Drop the gutter around the remove control. @default false */
  noPadding?: boolean;
  disabled?: boolean;
  children?: React.ReactNode | ((state: { isRemoving: boolean }) => React.ReactNode);
}

/** Wraps a row or field with a remove action. */
export const Removable = React.forwardRef<HTMLDivElement, RemovableProps>(function Removable(
  {
    onRemove,
    removeLabel = "Remove",
    variant = "button",
    align = "center",
    indent = false,
    noPadding = false,
    disabled,
    className,
    children,
    onKeyDown,
    onBlur,
    ...rest
  },
  forwardedRef,
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const confirmRef = React.useRef<HTMLButtonElement>(null);
  const [isRemoving, setRemoving] = React.useState(false);
  const reveal = variant === "reveal";

  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  React.useEffect(() => {
    if (isRemoving) confirmRef.current?.focus();
  }, [isRemoving]);

  const remove = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Keep a surrounding row's click handler from firing.
    event.preventDefault();
    event.stopPropagation();
    onRemove?.(event, rootRef.current);
  };

  const control = cn(
    "flex shrink-0 items-center justify-center rounded-full outline-none focus-visible:focus-ring disabled:opacity-(--dt-opacity-disabled)",
    indent && "invisible", // visibility:hidden also drops it from tab order and the a11y tree
  );
  const gutter = noPadding ? "" : reveal ? "ps-4" : "pe-2";

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: handles Escape and focus leaving, bubbled from its own buttons.
    <div
      ref={setRef}
      className={cn("relative flex overflow-hidden", align === "start" ? "items-start" : "items-center", className)}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (isRemoving && event.key === "Escape") {
          event.stopPropagation();
          setRemoving(false);
          toggleRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        onBlur?.(event);
        // Collapse when focus leaves the whole component (blur, click outside).
        if (isRemoving && !event.currentTarget.contains(event.relatedTarget)) setRemoving(false);
      }}
      {...rest}
    >
      {reveal && (
        <span className={cn("flex shrink-0", gutter, align === "start" && "pt-3")}>
          <button
            ref={toggleRef}
            type="button"
            aria-label={removeLabel}
            aria-expanded={isRemoving}
            disabled={disabled}
            className={cn(control, "size-icon-lg text-destructive")}
            onClick={(event) => {
              event.stopPropagation();
              setRemoving((v) => !v);
            }}
          >
            <CircleMinus aria-hidden className="size-icon-lg" />
          </button>
        </span>
      )}
      <div className={cn("min-w-0 flex-1", isRemoving && "pointer-events-none")}>
        {typeof children === "function" ? children({ isRemoving }) : children}
      </div>
      {reveal ? (
        <div
          inert={!isRemoving}
          className={cn(
            "flex shrink-0 self-stretch overflow-hidden transition-[max-width] duration-normal ease-standard",
            isRemoving ? "max-w-removable-reveal" : "max-w-0",
          )}
        >
          <button
            ref={confirmRef}
            type="button"
            disabled={disabled}
            className="w-removable-reveal shrink-0 bg-destructive px-3 text-subhead font-medium text-destructive-foreground outline-none focus-visible:focus-ring"
            onClick={remove}
          >
            {removeLabel}
          </button>
        </div>
      ) : (
        <span className={cn("flex shrink-0", gutter, align === "start" && "pt-3")}>
          <button
            type="button"
            aria-label={removeLabel}
            disabled={disabled}
            className={cn(
              control,
              "size-control-m text-icon-secondary transition-colors duration-fast hover:bg-secondary hover:text-destructive",
            )}
            onClick={remove}
          >
            <X aria-hidden className="dt-icon-turn size-icon-md" />
          </button>
        </span>
      )}
    </div>
  );
});
