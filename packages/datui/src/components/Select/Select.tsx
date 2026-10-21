import * as React from "react";
import { setRefs } from "../../internal/formUtils/formUtils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { CustomSelect, type CustomSelectOptionData, type CustomSelectProps } from "../CustomSelect/CustomSelect";
import { NativeSelect } from "../NativeSelect/NativeSelect";

export type SelectOption = CustomSelectOptionData;

export interface SelectProps extends Omit<CustomSelectProps, "onChange"> {
  /** Called with the event and the new value as a string (`""` after clearing), whichever implementation renders. */
  onChange?: (event: React.SyntheticEvent, value: string) => void;
  /**
   * `true` always renders NativeSelect, `false` always CustomSelect. Unset: NativeSelect on coarse-pointer
   * (touch) devices, CustomSelect with a fine pointer.
   */
  native?: boolean;
}

/**
 * Adaptive select driven by an `options` array: CustomSelect with a mouse, the platform picker (NativeSelect)
 * on touch devices. Value, placeholder, status, name and labelling behave the same in both. DOM event props
 * and CustomSelect-only features (search, custom options, clear button) apply to the custom implementation.
 * `ref` points at the custom combobox input or the native `<select>`.
 */
export const Select = React.forwardRef<HTMLInputElement | HTMLSelectElement, SelectProps>(function Select(
  { native, onChange, ...props },
  ref,
) {
  const { hasPointer } = useAdaptivity();
  if (native ?? !hasPointer) {
    const { options, value, defaultValue, placeholder, selectType, status, before, icon, slotProps } = props;
    return (
      <NativeSelect
        ref={(node) => setRefs(node, ref)}
        id={props.id}
        name={props.name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={props.disabled}
        required={props.required}
        selectType={selectType}
        status={status}
        before={before}
        icon={icon}
        slotProps={slotProps}
        className={props.className}
        style={props.style}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
        aria-invalid={props["aria-invalid"]}
        onChange={(e, v) => onChange?.(e, v)}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </NativeSelect>
    );
  }
  return (
    <CustomSelect
      ref={(node) => setRefs(node, ref)}
      {...props}
      onChange={(e, v) => onChange?.(e, v === null ? "" : String(v))}
    />
  );
});
