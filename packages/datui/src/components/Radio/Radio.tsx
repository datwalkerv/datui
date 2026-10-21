import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import * as React from "react";
import { SelectionControl, SelectionControlLabel } from "../../internal/SelectionControl/SelectionControl";
import { cn } from "../../lib/utils";

export interface RadioInputProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
}

/** Bare radio circle; must be inside a `RadioGroup` and needs an accessible name. */
export const RadioInput = React.forwardRef<HTMLButtonElement, RadioInputProps>(function RadioInput(
  { className, ...rest },
  ref,
) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-icon-tertiary outline-none transition-colors duration-fast",
        "focus-visible:focus-ring data-[state=checked]:border-primary disabled:cursor-default disabled:opacity-(--dt-opacity-disabled)",
        className,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator className="size-2.5 rounded-full bg-primary" />
    </RadioGroupPrimitive.Item>
  );
});

export interface RadioProps extends RadioInputProps {
  /** Label content. */
  children?: React.ReactNode;
  /** Secondary text, linked through `aria-describedby`. */
  description?: React.ReactNode;
  titleAfter?: React.ReactNode;
  /** @default false */
  noPadding?: boolean;
}

/** Labelled radio row for a `RadioGroup`; the whole row selects. */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { children, description, titleAfter, noPadding, className, style, disabled, ...rest },
  ref,
) {
  const id = React.useId();
  return (
    <SelectionControl noPadding={noPadding} disabled={disabled} className={className} style={style}>
      <span className="flex h-5 items-center">
        <RadioInput
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
