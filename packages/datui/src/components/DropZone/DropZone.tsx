import * as React from "react";
import { cn } from "../../lib/utils";

export interface DropZoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Content, or a render function receiving the drag-over state. */
  children?: React.ReactNode | ((state: { active: boolean }) => React.ReactNode);
  /**
   * Makes the zone a button that opens the file dialog on click / Enter / Space, and receives dropped files.
   * Without it the zone is a pure drop target (pair it with `File` for keyboard users).
   */
  onFiles?: (files: File[]) => void;
  /** File types for the dialog (with `onFiles`). */
  accept?: string;
  /** Allow several files (with `onFiles`). */
  multiple?: boolean;
  disabled?: boolean;
}

/** Drop target that highlights while files are dragged over it. */
export const DropZone = React.forwardRef<HTMLDivElement, DropZoneProps>(function DropZone(
  {
    children,
    onFiles,
    accept,
    multiple,
    disabled,
    className,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onClick,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const [active, setActive] = React.useState(false);
  // dragenter/dragleave also fire when crossing children; count depth instead of trusting relatedTarget.
  const depth = React.useRef(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const interactive = Boolean(onFiles) && !disabled;

  const open = () => inputRef.current?.click();

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: drop target; it becomes role="button" (focusable) when onFiles makes it activatable.
    <div
      ref={ref}
      role={onFiles ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={onFiles && disabled ? true : undefined}
      data-active={active ? "" : undefined}
      className={cn(
        "flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center text-subhead text-muted-foreground transition-colors duration-fast",
        "data-active:border-primary data-active:bg-accent data-active:text-accent-foreground",
        interactive && "cursor-pointer outline-none hover:bg-overlay-light focus-visible:focus-ring",
        disabled && "opacity-(--dt-opacity-disabled)",
        className,
      )}
      onDragEnter={(e) => {
        onDragEnter?.(e);
        if (e.isPropagationStopped() || disabled) return;
        depth.current += 1;
        setActive(true);
      }}
      onDragOver={(e) => {
        onDragOver?.(e);
        if (e.isPropagationStopped() || disabled) return;
        e.preventDefault(); // required for the element to accept a drop
        setActive(true);
      }}
      onDragLeave={(e) => {
        onDragLeave?.(e);
        depth.current = Math.max(0, depth.current - 1);
        if (depth.current === 0) setActive(false);
      }}
      onDrop={(e) => {
        onDrop?.(e);
        depth.current = 0;
        setActive(false);
        if (e.isPropagationStopped() || disabled) return;
        e.preventDefault();
        if (onFiles && e.dataTransfer?.files?.length) onFiles(Array.from(e.dataTransfer.files));
      }}
      onClick={(e) => {
        onClick?.(e);
        if (interactive && !e.defaultPrevented) open();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (interactive && !e.defaultPrevented && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          open();
        }
      }}
      {...rest}
    >
      {typeof children === "function" ? children({ active }) : children}
      {onFiles && (
        <input
          ref={inputRef}
          type="file"
          hidden
          tabIndex={-1}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            if (e.target.files?.length) onFiles(Array.from(e.target.files));
            e.target.value = "";
          }}
        />
      )}
    </div>
  );
});

export interface DropZoneGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `row` places zones side by side from the tablet breakpoint (stacked below it). @default "row" */
  direction?: "row" | "column";
}

/** Lays out several DropZones. */
export const DropZoneGrid = React.forwardRef<HTMLDivElement, DropZoneGridProps>(function DropZoneGrid(
  { direction = "row", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3",
        direction === "row" && "tablet:flex-row tablet:*:min-w-0 tablet:*:flex-1",
        className,
      )}
      {...rest}
    />
  );
});
