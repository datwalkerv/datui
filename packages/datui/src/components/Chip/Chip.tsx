import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

export const chipVariants = cva(
  "inline-flex h-control-s max-w-full min-w-0 items-center gap-1 rounded-sm ps-2 text-subhead select-none aria-disabled:opacity-(--dt-opacity-disabled)",
  {
    variants: {
      mode: {
        primary: "bg-secondary text-secondary-foreground",
        secondary: "border border-border bg-transparent text-foreground",
      },
      removable: { true: "pe-0.5", false: "pe-2" },
    },
    defaultVariants: { mode: "primary", removable: false },
  },
);

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onRemove"> {
  /** Passed back to `onRemove`. */
  value?: string | number;
  /** @default "primary" */
  mode?: "primary" | "secondary";
  /** Shows the remove button (hidden anyway while `disabled` or `readOnly`). @default true */
  removable?: boolean;
  /** Accessible label of the remove button; the chip text is appended. @default "Remove" */
  removeLabel?: string;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>, value: string | number | undefined) => void;
  before?: React.ReactNode;
  after?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
}

/** Compact token with optional slots and a remove button. Used by ChipsInput and ChipsSelect, also standalone. */
export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  {
    value,
    mode = "primary",
    removable = true,
    removeLabel = "Remove",
    onRemove,
    before,
    after,
    disabled = false,
    readOnly = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const showRemove = removable && !disabled && !readOnly;
  const label = typeof children === "string" || typeof children === "number" ? String(children) : undefined;
  return (
    <span
      ref={ref}
      aria-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      className={cn(chipVariants({ mode, removable: showRemove }), className)}
      {...rest}
    >
      {before && <span className="flex shrink-0 [&_svg]:size-icon-sm">{before}</span>}
      <span className="min-w-0 truncate">{children}</span>
      {after && <span className="flex shrink-0 [&_svg]:size-icon-sm">{after}</span>}
      {showRemove && (
        <button
          type="button"
          aria-label={label ? `${removeLabel} ${label}` : removeLabel}
          onClick={(e) => onRemove?.(e, value)}
          className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs text-current opacity-70 outline-none hover:opacity-100 focus-visible:focus-ring"
        >
          <X aria-hidden className="dt-icon-turn size-icon-sm" />
        </button>
      )}
    </span>
  );
});
