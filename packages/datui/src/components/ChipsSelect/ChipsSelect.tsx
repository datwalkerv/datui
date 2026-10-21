import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import {
  type ChipOption,
  ChipsInputBase,
  type ChipsInputBaseProps,
} from "../../internal/ChipsInputBase/ChipsInputBase";
import { DropdownIcon } from "../../internal/DropdownIcon/DropdownIcon";
import { setRefs } from "../../internal/formUtils/formUtils";
import { defaultFilterFn, firstEnabled, nextEnabled, useEscapeWhileOpen } from "../CustomSelect/listbox";
import { CustomSelectDropdown } from "../CustomSelectDropdown/CustomSelectDropdown";
import { CustomSelectOption, type CustomSelectOptionProps } from "../CustomSelectOption/CustomSelectOption";

export interface ChipsSelectProps
  extends Omit<ChipsInputBaseProps, "delimiter" | "addOnBlur" | "getNewOptionData" | "after"> {
  options?: ChipOption[];
  /**
   * Lets the user add typed text that matches no option. A string sets the label of the "create" row,
   * shown before the quoted text. @default false
   */
  creatable?: boolean | string;
  /** Custom filter, or `false` to show options as given. */
  filterFn?: false | ((query: string, option: ChipOption) => boolean);
  /** `hide` removes selected options from the list, `highlight` keeps them checked (choosing again removes). @default "highlight" */
  selectedBehavior?: "hide" | "highlight";
  /** Close the dropdown after picking an option. @default true */
  closeAfterSelect?: boolean;
  /** @default "Nothing found" */
  emptyText?: string;
  fetching?: boolean;
  /** @default "Loading…" */
  fetchingLabel?: string;
  /** @default "bottom" */
  placement?: "top" | "bottom";
  dropdownAutoWidth?: boolean;
  forcePortal?: boolean;
  noMaxHeight?: boolean;
  /** Accessible name of the listbox. @default "Options" */
  listLabel?: string;
  /** Custom option row; spread the props onto `CustomSelectOption`. */
  renderOption?: (props: CustomSelectOptionProps, option: ChipOption) => React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  /** Called before an option is added or removed; call `event.preventDefault()` to cancel. */
  onChangeStart?: (event: React.SyntheticEvent, option: ChipOption) => void;
}

const CREATE = Symbol("create");

/**
 * Multi-select with chips and a filterable dropdown, optionally creatable. The input is a combobox:
 * Down/Up open and move, Enter picks the highlighted option (or creates), Escape closes. Chips behave as in
 * ChipsInput. `ref` points at the input.
 */
export const ChipsSelect = React.forwardRef<HTMLInputElement, ChipsSelectProps>(function ChipsSelect(
  {
    options = [],
    value: valueProp,
    defaultValue = [],
    onChange,
    inputValue: inputValueProp,
    defaultInputValue = "",
    onInputChange,
    creatable = false,
    filterFn,
    selectedBehavior = "highlight",
    closeAfterSelect = true,
    emptyText = "Nothing found",
    fetching = false,
    fetchingLabel = "Loading…",
    placement = "bottom",
    dropdownAutoWidth,
    forcePortal,
    noMaxHeight,
    listLabel = "Options",
    renderOption,
    onOpen,
    onClose,
    onChangeStart,
    disabled,
    readOnly,
    onKeyDown,
    onBlur,
    slotProps,
    ...rest
  },
  ref,
) {
  const baseId = React.useId();
  const listId = `${baseId}-listbox`;
  const optionId = (i: number) => `${baseId}-option-${i}`;
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [value, setValue] = useControllableState({ value: valueProp, defaultValue, onChange });
  const [query, setQuery] = useControllableState({
    value: inputValueProp,
    defaultValue: defaultInputValue,
    onChange: onInputChange,
  });
  const [open, setOpen] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState(-1);

  const isSelected = (o: ChipOption) => value.some((v) => v.value === o.value);
  const trimmed = query.trim();
  const items = React.useMemo(() => {
    const filter = filterFn || ((q: string, o: ChipOption) => defaultFilterFn(q, o.label));
    let list = filterFn === false || !trimmed ? options : options.filter((o) => filter(trimmed, o));
    if (selectedBehavior === "hide") list = list.filter((o) => !value.some((v) => v.value === o.value));
    const rows: Array<{ option: ChipOption; create?: typeof CREATE }> = list.map((option) => ({ option }));
    const exists = [...options, ...value].some((o) => o.label.toLocaleLowerCase() === trimmed.toLocaleLowerCase());
    if (creatable && trimmed && !exists) rows.push({ option: { value: trimmed, label: trimmed }, create: CREATE });
    return rows;
  }, [options, value, trimmed, filterFn, selectedBehavior, creatable]);

  const openList = () => {
    if (open || disabled || readOnly) return;
    setHighlighted(firstEnabled(items.map((r) => r.option)));
    setOpen(true);
    onOpen?.();
  };
  const closeList = () => {
    if (!open) return;
    setOpen(false);
    setHighlighted(-1);
    onClose?.();
  };
  useEscapeWhileOpen(open, closeList);

  React.useEffect(() => {
    if (open && highlighted >= 0)
      document.getElementById(optionId(highlighted))?.scrollIntoView?.({ block: "nearest" });
  });

  const pick = (event: React.SyntheticEvent, row: { option: ChipOption; create?: typeof CREATE } | undefined) => {
    if (!row || row.option.disabled) return;
    onChangeStart?.(event, row.option);
    if (event.defaultPrevented) return;
    if (!row.create && isSelected(row.option)) setValue(value.filter((v) => v.value !== row.option.value));
    else setValue([...value, row.option]);
    setQuery("");
    if (closeAfterSelect) closeList();
    else setHighlighted(firstEnabled(items.map((r) => r.option)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || disabled || readOnly) return;
    const list = items.map((r) => r.option);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) openList();
      else setHighlighted((h) => nextEnabled(list, h, e.key === "ArrowDown" ? 1 : -1));
    } else if (e.key === "Enter") {
      if (open) pick(e, items[highlighted]);
      // Always handled here so the base input never turns free text into chips on its own.
      e.preventDefault();
    } else if (e.key === "Tab") closeList();
  };

  const rowProps = (row: { option: ChipOption; create?: typeof CREATE }, index: number): CustomSelectOptionProps => ({
    id: optionId(index),
    selected: !row.create && isSelected(row.option),
    focused: index === highlighted,
    disabled: row.option.disabled,
    children: row.create
      ? `${typeof creatable === "string" ? creatable : "Create"} “${row.option.label}”`
      : row.option.label,
    onClick: (e) => pick(e, row),
    onMouseMove: () => {
      if (!row.option.disabled && index !== highlighted) setHighlighted(index);
    },
  });

  return (
    <>
      <ChipsInputBase
        ref={(node) => setRefs(node, inputRef, ref)}
        {...rest}
        value={value}
        onChange={setValue}
        inputValue={query}
        onInputChange={(q) => {
          setQuery(q);
          if (!open) openList();
          setHighlighted(0);
        }}
        delimiter={[]}
        disabled={disabled}
        readOnly={readOnly}
        role="combobox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-activedescendant={open && highlighted >= 0 ? optionId(highlighted) : undefined}
        aria-busy={fetching || undefined}
        onKeyDown={handleKeyDown}
        onBlur={(e) => {
          onBlur?.(e);
          closeList();
        }}
        after={
          <span className="pointer-events-none flex">
            <DropdownIcon opened={open} />
          </span>
        }
        slotProps={{
          ...slotProps,
          root: {
            ...slotProps?.root,
            ref: (node: HTMLDivElement | null) => setRefs(node, fieldRef, slotProps?.root?.ref),
            onClick: (e: React.MouseEvent<HTMLDivElement>) => {
              slotProps?.root?.onClick?.(e);
              if ((e.target as Element).closest("button")) return;
              if (open) closeList();
              else openList();
              inputRef.current?.focus();
            },
          },
        }}
      />
      <span role="status" className="sr-only">
        {open && !fetching && items.length === 0 ? emptyText : ""}
      </span>
      {open && (
        <CustomSelectDropdown
          targetRef={fieldRef}
          placement={placement === "top" ? "top-start" : "bottom-start"}
          autoWidth={dropdownAutoWidth}
          forcePortal={forcePortal}
          noMaxHeight={noMaxHeight}
          fetching={fetching}
          fetchingLabel={fetchingLabel}
        >
          {items.length === 0 ? (
            <div aria-hidden className="px-3 py-2 text-body text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            <div role="listbox" id={listId} aria-label={listLabel} aria-multiselectable>
              {items.map((row, i) => {
                const props = rowProps(row, i);
                return (
                  <React.Fragment key={`${row.create ? "create" : String(row.option.value)}`}>
                    {renderOption && !row.create ? renderOption(props, row.option) : <CustomSelectOption {...props} />}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </CustomSelectDropdown>
      )}
    </>
  );
});
