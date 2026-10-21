import * as React from "react";
import { Chip, type ChipProps } from "../../components/Chip/Chip";
import { FormField, type FormFieldProps } from "../../components/FormField/FormField";
import { useFormItemControl } from "../../components/FormItem/FormItemContext";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";
import { FormFieldClearButton } from "../FormFieldClearButton/FormFieldClearButton";
import { setRefs } from "../formUtils/formUtils";

export interface ChipOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ChipsInputBaseProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "size">,
    Pick<FormFieldProps, "status" | "before" | "after" | "maxHeight"> {
  /** Chips. */
  value?: ChipOption[];
  defaultValue?: ChipOption[];
  onChange?: (value: ChipOption[]) => void;
  /** Text typed after the chips. */
  inputValue?: string;
  defaultInputValue?: string;
  onInputChange?: (value: string) => void;
  /** Typing or pasting a delimiter turns the text before it into chips. `[]` disables splitting. @default "," */
  delimiter?: string | RegExp | string[];
  /** Turn leftover text into a chip when the field loses focus. @default false */
  addOnBlur?: boolean;
  /** Builds a chip from typed text. @default label => ({ value: label, label }) */
  getNewOptionData?: (label: string) => ChipOption;
  /** Custom chip. Spread the given props onto `Chip` to keep removal working. */
  renderChip?: (props: ChipProps, option: ChipOption) => React.ReactNode;
  /** Shows a button that removes every chip and the typed text. @default false */
  allowClearButton?: boolean;
  /** @default "Clear" */
  clearLabel?: string;
  /** Accessible name of the chips list. @default "Selected" */
  chipsListLabel?: string;
  /** Prefix of each chip's remove-button label. @default "Remove" */
  removeLabel?: string;
  /** Props for the FormField shell. */
  slotProps?: { root?: FormFieldProps & { ref?: React.Ref<HTMLDivElement> } };
}

const splitter = (delimiter: string | RegExp | string[]): RegExp | null => {
  if (delimiter instanceof RegExp) return delimiter;
  const list = (Array.isArray(delimiter) ? delimiter : [delimiter]).filter(Boolean);
  if (list.length === 0) return null;
  return new RegExp(list.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"));
};

const defaultNewOption = (label: string): ChipOption => ({ value: label, label });

/**
 * Text input holding removable chips. Enter (or a delimiter, or paste) adds typed text as a chip, Backspace in
 * an empty input removes the last chip. Shared by ChipsInput and ChipsSelect. `ref` points at the input.
 */
export const ChipsInputBase = React.forwardRef<HTMLInputElement, ChipsInputBaseProps>(function ChipsInputBase(
  {
    value: valueProp,
    defaultValue = [],
    onChange,
    inputValue: inputValueProp,
    defaultInputValue = "",
    onInputChange,
    delimiter = ",",
    addOnBlur = false,
    getNewOptionData = defaultNewOption,
    renderChip,
    allowClearButton = false,
    clearLabel = "Clear",
    chipsListLabel = "Selected",
    removeLabel = "Remove",
    status: statusProp,
    before,
    after,
    maxHeight,
    slotProps,
    disabled,
    readOnly,
    placeholder,
    className,
    style,
    onKeyDown,
    onBlur,
    ...rest
  },
  ref,
) {
  const { status, control } = useFormItemControl({ ...rest, status: statusProp });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [chips, setChips] = useControllableState({ value: valueProp, defaultValue, onChange });
  const [text, setText] = React.useState(defaultInputValue);
  const inputValue = inputValueProp ?? text;
  const editable = !disabled && !readOnly;

  const addLabels = (labels: string[]) => {
    const next = [...chips];
    for (const raw of labels) {
      const label = raw.trim();
      if (!label) continue;
      const option = getNewOptionData(label);
      if (!next.some((c) => c.value === option.value)) next.push(option);
    }
    if (next.length !== chips.length) setChips(next);
  };

  const setInput = (next: string) => {
    setText(next);
    onInputChange?.(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = splitter(delimiter);
    const parts = re ? e.target.value.split(re) : [e.target.value];
    if (parts.length > 1) {
      addLabels(parts.slice(0, -1));
      setInput(parts[parts.length - 1] ?? "");
    } else setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || !editable) return;
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addLabels([inputValue]);
      setInput("");
    } else if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      e.preventDefault();
      setChips(chips.slice(0, -1));
    }
  };

  const remove = (option: ChipOption) => {
    setChips(chips.filter((c) => c.value !== option.value));
    inputRef.current?.focus();
  };

  const showClear = allowClearButton && editable && (chips.length > 0 || inputValue !== "");

  return (
    <FormField
      status={status}
      before={before}
      after={
        showClear || after ? (
          <>
            {showClear && (
              <FormFieldClearButton
                label={clearLabel}
                onClick={() => {
                  setChips([]);
                  setInput("");
                  inputRef.current?.focus();
                }}
              />
            )}
            {after}
          </>
        ) : undefined
      }
      maxHeight={maxHeight}
      disabled={disabled}
      style={style}
      {...slotProps?.root}
      className={cn(className, slotProps?.root?.className)}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1 py-1.5 ps-2">
        {chips.length > 0 && (
          <ul aria-label={chipsListLabel} className="contents">
            {chips.map((option) => {
              const chipProps: ChipProps = {
                value: option.value,
                children: option.label,
                removeLabel,
                disabled: disabled || option.disabled,
                readOnly,
                onRemove: () => remove(option),
              };
              return (
                <li key={String(option.value)} className="flex min-w-0">
                  {renderChip ? renderChip(chipProps, option) : <Chip {...chipProps} />}
                </li>
              );
            })}
          </ul>
        )}
        <input
          ref={(node) => setRefs(node, inputRef, ref)}
          type="text"
          autoComplete="off"
          value={inputValue}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={chips.length === 0 ? placeholder : undefined}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={(e) => {
            onBlur?.(e);
            if (addOnBlur && editable && inputValue.trim()) {
              addLabels([inputValue]);
              setInput("");
            }
          }}
          {...rest}
          {...control}
          className="h-control-s min-w-16 flex-1 bg-transparent px-1 text-body outline-none placeholder:text-muted-foreground disabled:cursor-default"
        />
      </div>
    </FormField>
  );
});
