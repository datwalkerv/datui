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

export interface SelectMimicryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<FormFieldProps, "status" | "before"> {
  /** Shown while `children` (the current value) is empty. */
  placeholder?: string;
  /** @default "default" */
  selectType?: SelectType;
  /** Wrap long values instead of truncating. @default false */
  multiline?: boolean;
  /** Trailing content. @default chevron */
  after?: React.ReactNode;
  /** @default "left" */
  align?: TextAlign;
  /** What the button opens, for `aria-haspopup`. @default "dialog" */
  "aria-haspopup"?: React.AriaAttributes["aria-haspopup"];
}

/** Looks like a select but is a button that opens something else (a modal, a picker page). `ref` points at the button. */
export const SelectMimicry = React.forwardRef<HTMLButtonElement, SelectMimicryProps>(function SelectMimicry(
  {
    children,
    placeholder,
    selectType = "default",
    multiline = false,
    status: statusProp,
    before,
    after = <DropdownIcon />,
    align = "left",
    className,
    style,
    disabled,
    "aria-haspopup": hasPopup = "dialog",
    ...rest
  },
  ref,
) {
  const { status, control } = useFormItemControl({ ...rest, status: statusProp });
  const { required: _required, ...buttonControl } = control;
  const empty = children === undefined || children === null || children === "" || children === false;
  return (
    <FormField
      status={status}
      mode={selectTypeMode(selectType)}
      before={before}
      after={after}
      disabled={disabled}
      className={className}
      style={style}
    >
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-haspopup={hasPopup}
        {...rest}
        {...buttonControl}
        className={cn(
          "flex min-w-0 flex-1 cursor-pointer items-center px-3 py-2.5 outline-none disabled:cursor-default",
          "after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] focus-visible:after:focus-ring",
          selectTypographyVariants({ selectType, empty }),
          textAlignClass[align],
        )}
      >
        <span className={cn("min-w-0 flex-1", multiline ? "break-words" : "truncate")}>
          {empty ? placeholder : children}
        </span>
      </button>
    </FormField>
  );
});
