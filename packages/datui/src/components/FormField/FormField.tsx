import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

export type FormFieldStatus = "default" | "error" | "valid";
export type FormFieldMode = "default" | "plain";
export type FormFieldSlotAlign = "start" | "center" | "end";

export const formFieldVariants = cva(
  [
    "relative flex w-full min-h-control-l items-stretch rounded-md border text-body transition-[border-color,background-color] duration-fast",
    "aria-disabled:cursor-default aria-disabled:opacity-(--dt-opacity-disabled)",
  ],
  {
    variants: {
      mode: { default: "bg-input", plain: "border-transparent bg-transparent" },
      status: { default: "", error: "", valid: "" },
    },
    compoundVariants: [
      {
        mode: "default",
        status: "default",
        class:
          "border-input-border hover:not-aria-disabled:border-foreground/24 focus-within:border-primary hover:focus-within:border-primary",
      },
      { mode: "default", status: "error", class: "border-destructive bg-destructive/6" },
      { mode: "default", status: "valid", class: "border-positive" },
      { mode: "plain", status: "error", class: "text-destructive" },
    ],
    defaultVariants: { mode: "default", status: "default" },
  },
);

const slotAlign: Record<FormFieldSlotAlign, string> = {
  start: "self-start",
  center: "self-center",
  end: "self-end",
};

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual validation state. Pair `error` with `aria-invalid` on the control (FormItem does this). @default "default" */
  status?: FormFieldStatus;
  /** `plain` removes border and background, e.g. for fields inside cells or toolbars. @default "default" */
  mode?: FormFieldMode;
  /** Content before the control, usually an icon. */
  before?: React.ReactNode;
  /** Vertical alignment of `before`. @default "center" */
  beforeAlign?: FormFieldSlotAlign;
  /** Content after the control, e.g. an icon, clear button or unit. */
  after?: React.ReactNode;
  /** Vertical alignment of `after`. @default "center" */
  afterAlign?: FormFieldSlotAlign;
  /** Caps the field height in px; content scrolls beyond it. */
  maxHeight?: number;
  /** Dims the shell and sets `aria-disabled`. Disable the control itself as well. */
  disabled?: boolean;
}

const CONTROL = "input, textarea, select, button, [tabindex]";

/**
 * Bordered shell shared by every text-like control (Input, Textarea, selects, chips and date inputs).
 * Put the control as `children`; give it `flex-1 min-w-0`. Clicking empty shell space focuses the control.
 * The shell itself carries no semantics: the control must expose `aria-invalid`, label and description.
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  {
    status = "default",
    mode = "default",
    before,
    beforeAlign = "center",
    after,
    afterAlign = "center",
    maxHeight,
    disabled,
    className,
    style,
    children,
    onMouseDown,
    ...rest
  },
  ref,
) {
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseDown?.(event);
    if (event.defaultPrevented || disabled) return;
    const target = event.target as HTMLElement;
    if (target.closest(`${CONTROL}, a, label`)) return;
    const control = event.currentTarget.querySelector<HTMLElement>(CONTROL);
    if (!control) return;
    event.preventDefault();
    control.focus();
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: pointer convenience only; the control inside stays keyboard reachable.
    <div
      ref={ref}
      data-form-field=""
      data-status={status}
      aria-disabled={disabled || undefined}
      className={cn(formFieldVariants({ mode, status }), maxHeight !== undefined && "overflow-y-auto", className)}
      style={maxHeight !== undefined ? { maxHeight, ...style } : style}
      onMouseDown={handleMouseDown}
      {...rest}
    >
      {before && (
        <span className={cn("flex shrink-0 ps-3 text-icon-secondary", slotAlign[beforeAlign])} data-slot="before">
          {before}
        </span>
      )}
      {children}
      {after && (
        <span className={cn("ms-auto flex shrink-0 items-center gap-1 pe-2", slotAlign[afterAlign])} data-slot="after">
          {after}
        </span>
      )}
    </div>
  );
});
