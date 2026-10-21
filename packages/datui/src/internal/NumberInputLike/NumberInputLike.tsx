import * as React from "react";
import { InputLike, type InputLikeProps } from "../InputLike/InputLike";

export interface NumberInputLikeProps extends Omit<InputLikeProps, "value" | "label"> {
  /** Typed digits; a number is zero-padded to `length`. */
  value?: number | string;
  minValue?: number;
  maxValue?: number;
  /** Accessible name, e.g. "Day". */
  label: string;
  disabled?: boolean;
}

/** InputLike for one numeric date/time segment, exposed as a `spinbutton`. The owner handles keys. */
export const NumberInputLike = React.forwardRef<HTMLSpanElement, NumberInputLikeProps>(function NumberInputLike(
  { value = "", minValue, maxValue, label, disabled, readOnly, length, ...rest },
  ref,
) {
  const text = typeof value === "number" ? String(value).padStart(length, "0") : value;
  return (
    <InputLike
      ref={ref}
      role="spinbutton"
      aria-label={label}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-valuenow={text === "" ? undefined : Number(text)}
      aria-valuetext={text === "" ? undefined : text}
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      length={length}
      value={text}
      readOnly={readOnly || disabled}
      {...rest}
    />
  );
});
