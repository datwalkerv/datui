import * as React from "react";
import { DropdownIcon } from "../../internal/DropdownIcon/DropdownIcon";
import {
  type SelectType,
  selectTypeMode,
  selectTypographyVariants,
} from "../../internal/SelectTypography/SelectTypography";
import { type TextAlign, textAlignClass } from "../../internal/UnstyledTextField/UnstyledTextField";
import { cn } from "../../lib/utils";
import { FormField, type FormFieldProps } from "../FormField/FormField";
import { useFormItemControl } from "../FormItem/FormItemContext";

export type { SelectType };

export interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "defaultValue" | "onChange" | "multiple">,
    Pick<FormFieldProps, "status" | "before"> {
  /** Selected option value; `null` shows the placeholder. */
  value?: string | number | null;
  defaultValue?: string | number | null;
  /** Native change event plus the new value for convenience. */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>, value: string) => void;
  /** Text shown while nothing is selected (a disabled, hidden first option). */
  placeholder?: string;
  /** `default` bordered field, `plain` borderless, `accent` borderless with accent text. @default "default" */
  selectType?: SelectType;
  /** Trailing icon. @default chevron */
  icon?: React.ReactNode;
  /** @default "left" */
  align?: TextAlign;
  /** Props for the FormField shell. `className` and `style` also go to the shell. */
  slotProps?: { root?: FormFieldProps & { ref?: React.Ref<HTMLDivElement> } };
}

const toNative = (v: string | number | null | undefined) => (v === undefined ? undefined : v === null ? "" : String(v));

/** Styled native `<select>`; the platform picker opens on touch devices. `ref` points at the select. */
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(function NativeSelect(
  {
    value,
    defaultValue,
    onChange,
    placeholder,
    selectType = "default",
    status: statusProp,
    before,
    icon = <DropdownIcon />,
    align = "left",
    slotProps,
    className,
    style,
    disabled,
    children,
    ...rest
  },
  ref,
) {
  const { status, control } = useFormItemControl({ ...rest, status: statusProp });
  const [inner, setInner] = React.useState(() => toNative(defaultValue) ?? "");
  const current = toNative(value) ?? inner;
  // Without a placeholder an empty uncontrolled value means "first option", which is never empty-looking.
  const empty = placeholder !== undefined && current === "";
  const uncontrolledDefault = toNative(defaultValue) ?? (placeholder !== undefined ? "" : undefined);
  return (
    <FormField
      status={status}
      mode={selectTypeMode(selectType)}
      before={before}
      after={<span className="pointer-events-none flex">{icon}</span>}
      disabled={disabled}
      style={style}
      {...slotProps?.root}
      className={cn(className, slotProps?.root?.className)}
    >
      <select
        ref={ref}
        value={toNative(value)}
        defaultValue={value === undefined ? uncontrolledDefault : undefined}
        disabled={disabled}
        onChange={(e) => {
          setInner(e.target.value);
          onChange?.(e, e.target.value);
        }}
        {...rest}
        {...control}
        className={cn(
          "absolute inset-0 min-w-0 cursor-pointer appearance-none bg-transparent ps-3 pe-10 outline-none disabled:cursor-default",
          before && "ps-10",
          selectTypographyVariants({ selectType, empty }),
          textAlignClass[align],
        )}
      >
        {placeholder !== undefined && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </FormField>
  );
});
