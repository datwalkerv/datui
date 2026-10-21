import { Check, Minus } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { SelectionControl, SelectionControlLabel } from "../../internal/SelectionControl/SelectionControl";
import { cn } from "../../lib/utils";

export type CheckboxCheckedState = boolean | "indeterminate";

export interface CheckboxInputProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultChecked" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  /** Mixed state (shows a dash, `aria-checked="mixed"`); takes precedence over `checked`. */
  indeterminate?: boolean;
  defaultIndeterminate?: boolean;
  onCheckedChange?: (checked: CheckboxCheckedState) => void;
  /** Focusable and announced, but clicks don't change the value. */
  readOnly?: boolean;
  required?: boolean;
  /** Form field name; a hidden native checkbox is submitted with the form. */
  name?: string;
  value?: string;
}

function useCheckedState({
  checked,
  defaultChecked,
  indeterminate,
  defaultIndeterminate,
  onCheckedChange,
}: CheckboxInputProps) {
  const controlled = checked !== undefined || indeterminate !== undefined;
  return useControllableState<CheckboxCheckedState>({
    value: controlled ? (indeterminate ? "indeterminate" : (checked ?? false)) : undefined,
    defaultValue: defaultIndeterminate ? "indeterminate" : (defaultChecked ?? false),
    onChange: onCheckedChange,
  });
}

/** Bare checkbox box (Radix Checkbox) for tables and custom layouts. Needs `aria-label` or `aria-labelledby`. */
export const CheckboxInput = React.forwardRef<HTMLButtonElement, CheckboxInputProps>(function CheckboxInput(
  { checked, defaultChecked, indeterminate, defaultIndeterminate, onCheckedChange, readOnly, className, ...rest },
  ref,
) {
  const [state, setState] = useCheckedState({
    checked,
    defaultChecked,
    indeterminate,
    defaultIndeterminate,
    onCheckedChange,
  });
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={state}
      onCheckedChange={readOnly ? undefined : setState}
      aria-readonly={readOnly || undefined}
      className={cn(
        "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-xs border-2 border-icon-tertiary text-primary-foreground outline-none transition-colors duration-fast",
        "focus-visible:focus-ring data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
        "aria-invalid:border-destructive disabled:cursor-default disabled:opacity-(--dt-opacity-disabled)",
        className,
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {state === "indeterminate" ? (
          <Minus className="size-icon-sm" strokeWidth={3} aria-hidden />
        ) : (
          <Check className="size-icon-sm" strokeWidth={3} aria-hidden />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

export interface CheckboxProps extends CheckboxInputProps {
  /** Label content. */
  children?: React.ReactNode;
  /** Secondary text under the label, linked through `aria-describedby`. */
  description?: React.ReactNode;
  /** Content right after the label, e.g. a badge. */
  titleAfter?: React.ReactNode;
  /** Remove row padding (inline use). @default false */
  noPadding?: boolean;
}

/** Labelled checkbox row. The whole row toggles; Space toggles from the keyboard. */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { children, description, titleAfter, noPadding, className, style, disabled, ...rest },
  ref,
) {
  const id = React.useId();
  return (
    <SelectionControl noPadding={noPadding} disabled={disabled} className={className} style={style}>
      <span className="flex h-5 items-center">
        <CheckboxInput
          ref={ref}
          disabled={disabled}
          aria-labelledby={`${id}-title`}
          aria-describedby={description ? `${id}-description` : undefined}
          {...rest}
        />
      </span>
      <SelectionControlLabel
        titleId={`${id}-title`}
        descriptionId={`${id}-description`}
        titleAfter={titleAfter}
        description={description}
      >
        {children}
      </SelectionControlLabel>
    </SelectionControl>
  );
});
