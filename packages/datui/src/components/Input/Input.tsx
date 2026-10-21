import * as React from "react";
import {
  type TextAlign,
  textAlignClass,
  unstyledTextFieldClass,
} from "../../internal/UnstyledTextField/UnstyledTextField";
import { cn } from "../../lib/utils";
import { FormField, type FormFieldProps } from "../FormField/FormField";
import { useFormItemControl } from "../FormItem/FormItemContext";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Pick<FormFieldProps, "status" | "mode" | "before" | "after" | "beforeAlign" | "afterAlign"> {
  /** Text alignment inside the field. @default "left" */
  align?: TextAlign;
  /** Props for the FormField shell. `className` and `style` also go to the shell. */
  slotProps?: { root?: FormFieldProps & { ref?: React.Ref<HTMLDivElement> } };
}

/**
 * Single-line text input inside a FormField. A native `<input>`: works controlled (`value` + `onChange(event)`)
 * or uncontrolled (`defaultValue`), and `ref` points at the input.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = "text",
    align = "left",
    status: statusProp,
    mode,
    before,
    after,
    beforeAlign,
    afterAlign,
    slotProps,
    className,
    style,
    disabled,
    ...rest
  },
  ref,
) {
  const { status, control } = useFormItemControl({ ...rest, status: statusProp });
  return (
    <FormField
      status={status}
      mode={mode}
      before={before}
      after={after}
      beforeAlign={beforeAlign}
      afterAlign={afterAlign}
      disabled={disabled}
      style={style}
      {...slotProps?.root}
      className={cn(className, slotProps?.root?.className)}
    >
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        {...rest}
        {...control}
        className={cn(unstyledTextFieldClass, "h-auto", textAlignClass[align])}
      />
    </FormField>
  );
});
