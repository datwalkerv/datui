import * as React from "react";
import { DropdownIcon } from "../../internal/DropdownIcon/DropdownIcon";
import { FormFieldClearButton } from "../../internal/FormFieldClearButton/FormFieldClearButton";
import { setRefs } from "../../internal/formUtils/formUtils";
import {
  type SelectType,
  selectTypeMode,
  selectTypographyVariants,
} from "../../internal/SelectTypography/SelectTypography";
import { cn } from "../../lib/utils";
import { CustomSelectDropdown } from "../CustomSelectDropdown/CustomSelectDropdown";
import { CustomSelectOption, type CustomSelectOptionProps } from "../CustomSelectOption/CustomSelectOption";
import { FormField, type FormFieldProps } from "../FormField/FormField";
import { useFormItemControl } from "../FormItem/FormItemContext";
import { Spinner } from "../Spinner/Spinner";
import { defaultFilterFn, firstEnabled, isPrintableKey, lastEnabled, nextEnabled, useEscapeWhileOpen } from "./listbox";

export type CustomSelectValue = string | number;

export interface CustomSelectOptionData {
  value: CustomSelectValue;
  /** Text shown in the list and in the field; also used for filtering and type-ahead. */
  label: string;
  disabled?: boolean;
  description?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  /** Options with the same `group` that follow each other are wrapped in a labelled group. */
  group?: string;
  /** Indent level. */
  hierarchy?: number;
}

export interface CustomSelectProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "value" | "defaultValue" | "onChange" | "size" | "type" | "children"
    >,
    Pick<FormFieldProps, "status" | "before"> {
  options: CustomSelectOptionData[];
  /** Selected value; `null` means nothing selected. */
  value?: CustomSelectValue | null;
  defaultValue?: CustomSelectValue | null;
  /** Called with the triggering event and the new value (`null` after clearing). */
  onChange?: (event: React.SyntheticEvent, value: CustomSelectValue | null) => void;
  /** Lets the user type to filter the options. @default false */
  searchable?: boolean;
  /** Custom filter, or `false` to show options as given (e.g. results filtered on the server). */
  filterFn?: false | ((query: string, option: CustomSelectOptionData) => boolean);
  /** Search text changes (only with `searchable`). */
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>, query: string) => void;
  /** Shown when no option matches. @default "Nothing found" */
  emptyText?: string;
  /** Shows a spinner in the field and the dropdown, e.g. while options load. */
  fetching?: boolean;
  /** Accessible loading label. @default "Loading…" */
  fetchingLabel?: string;
  /** Custom option row. Spread the given props onto `CustomSelectOption` (or an element with the same role/id). */
  renderOption?: (props: CustomSelectOptionProps, option: CustomSelectOptionData) => React.ReactNode;
  /** Shows a clear button while a value is selected. @default false */
  allowClearButton?: boolean;
  /** Accessible label of the clear button. @default "Clear" */
  clearLabel?: string;
  /** Accessible name of the listbox when the select has no `aria-label`. @default "Options" */
  listLabel?: string;
  onOpen?: () => void;
  onClose?: () => void;
  /** Preferred dropdown side; it flips when there is no room. @default "bottom" */
  popupDirection?: "top" | "bottom";
  /** Gap between field and dropdown in px. @default 4 */
  dropdownOffsetDistance?: number;
  /** Size the dropdown to its content instead of the field width. @default false */
  dropdownAutoWidth?: boolean;
  /** Portal the dropdown into the AppRoot layer. @default true */
  forcePortal?: boolean;
  /** Let the dropdown grow to the available viewport height. @default false */
  noMaxHeight?: boolean;
  /** `default` bordered field, `plain` borderless, `accent` borderless accent text. @default "default" */
  selectType?: SelectType;
  /** Trailing icon. @default chevron */
  icon?: React.ReactNode;
  /** Props for the FormField shell. `className` and `style` go to the shell too. */
  slotProps?: { root?: FormFieldProps & { ref?: React.Ref<HTMLDivElement> } };
}

/**
 * Styled select / combobox with a positioned listbox: keyboard navigation, type-ahead, optional search,
 * async loading, custom option rendering and a clear button. `ref` points at the combobox input.
 * With `name`, a hidden input carries the value in form submissions.
 */
export const CustomSelect = React.forwardRef<HTMLInputElement, CustomSelectProps>(function CustomSelect(
  {
    options,
    value: valueProp,
    defaultValue = null,
    onChange,
    searchable = false,
    filterFn,
    onInputChange,
    emptyText = "Nothing found",
    fetching = false,
    fetchingLabel = "Loading…",
    renderOption,
    allowClearButton = false,
    clearLabel = "Clear",
    listLabel = "Options",
    onOpen,
    onClose,
    popupDirection = "bottom",
    dropdownOffsetDistance,
    dropdownAutoWidth,
    forcePortal,
    noMaxHeight,
    selectType = "default",
    icon,
    status: statusProp,
    before,
    placeholder,
    disabled,
    readOnly,
    name,
    className,
    style,
    slotProps,
    onKeyDown,
    onBlur,
    ...rest
  },
  ref,
) {
  const { status, control } = useFormItemControl({ ...rest, status: statusProp });
  const baseId = React.useId();
  const listId = `${baseId}-listbox`;
  const optionId = (i: number) => `${baseId}-option-${i}`;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fieldRef = React.useRef<HTMLDivElement>(null);

  const [inner, setInner] = React.useState<CustomSelectValue | null>(defaultValue);
  const value = valueProp !== undefined ? valueProp : inner;
  const selected = options.find((o) => o.value === value);

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string | null>(null);
  const [highlighted, setHighlighted] = React.useState(-1);

  const filtered = React.useMemo(() => {
    if (!searchable || !query || filterFn === false) return options;
    const fn = filterFn || ((q: string, o: CustomSelectOptionData) => defaultFilterFn(q, o.label));
    return options.filter((o) => fn(query, o));
  }, [options, searchable, query, filterFn]);

  const openList = (at?: "first" | "last") => {
    if (open || disabled || readOnly) return;
    const sel = options.findIndex((o) => o.value === value);
    setHighlighted(at === "last" ? lastEnabled(options) : sel >= 0 ? sel : firstEnabled(options));
    // Searching starts from an empty query; the current label stays visible as the placeholder.
    if (searchable) setQuery("");
    setOpen(true);
    onOpen?.();
  };
  const closeList = () => {
    if (!open) return;
    setOpen(false);
    setQuery(null);
    setHighlighted(-1);
    onClose?.();
  };
  useEscapeWhileOpen(open, closeList);

  const commit = (event: React.SyntheticEvent, next: CustomSelectOptionData | null) => {
    if (next?.disabled) return;
    const nextValue = next ? next.value : null;
    closeList();
    if (nextValue === value) return;
    if (valueProp === undefined) setInner(nextValue);
    onChange?.(event, nextValue);
  };

  // Keep the highlighted option in view.
  React.useEffect(() => {
    if (open && highlighted >= 0)
      document.getElementById(optionId(highlighted))?.scrollIntoView?.({ block: "nearest" });
  });

  const typeahead = React.useRef({ text: "", timer: 0 });
  const handleTypeahead = (char: string) => {
    const t = typeahead.current;
    window.clearTimeout(t.timer);
    t.text += char.toLocaleLowerCase();
    t.timer = window.setTimeout(() => {
      t.text = "";
    }, 600);
    const start = t.text.length === 1 ? highlighted + 1 : Math.max(highlighted, 0);
    const ordered = [...options.slice(start), ...options.slice(0, start)];
    const match = ordered.find((o) => !o.disabled && o.label.toLocaleLowerCase().startsWith(t.text));
    if (!match) return;
    if (!open) {
      setOpen(true);
      onOpen?.();
    }
    setHighlighted(options.indexOf(match));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || disabled || readOnly) return;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList(e.key === "ArrowUp" ? "last" : undefined);
        else setHighlighted((h) => nextEnabled(filtered, h, e.key === "ArrowDown" ? 1 : -1));
        return;
      case "Home":
      case "End":
        if (open && !searchable) {
          e.preventDefault();
          setHighlighted(e.key === "Home" ? firstEnabled(filtered) : lastEnabled(filtered));
        }
        return;
      case "Enter":
        if (open) {
          e.preventDefault();
          const option = filtered[highlighted];
          if (option) commit(e, option);
          else closeList();
        }
        return;
      case " ":
        if (searchable) return;
        e.preventDefault();
        if (!open) openList();
        else if (filtered[highlighted]) commit(e, filtered[highlighted]);
        return;
      case "Tab":
        closeList();
        return;
      case "Backspace":
      case "Delete":
        if (!searchable) {
          e.preventDefault();
          openList();
        }
        return;
    }
    if (!isPrintableKey(e)) return;
    if (searchable) openList();
    else {
      e.preventDefault();
      handleTypeahead(e.key);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onInputChange?.(e, e.target.value);
    const filter = filterFn || ((q: string, o: CustomSelectOptionData) => defaultFilterFn(q, o.label));
    const next = filterFn === false ? options : options.filter((o) => filter(e.target.value, o));
    setHighlighted(firstEnabled(next));
    if (!open) {
      setOpen(true);
      onOpen?.();
    }
  };

  const clearShown = allowClearButton && value !== null && value !== undefined && !disabled && !readOnly;
  const displayed = open && query !== null ? query : (selected?.label ?? "");

  // Consecutive options sharing a `group` render inside one labelled group.
  const sections: Array<{
    group?: string | undefined;
    items: Array<{ option: CustomSelectOptionData; index: number }>;
  }> = [];
  filtered.forEach((option, index) => {
    const last = sections[sections.length - 1];
    if (last && last.group === option.group) last.items.push({ option, index });
    else sections.push({ group: option.group, items: [{ option, index }] });
  });

  const renderRow = ({ option, index }: { option: CustomSelectOptionData; index: number }) => {
    const props: CustomSelectOptionProps = {
      id: optionId(index),
      selected: option.value === value,
      focused: index === highlighted,
      disabled: option.disabled,
      description: option.description,
      before: option.before,
      after: option.after,
      hierarchy: option.hierarchy,
      children: option.label,
      onClick: (e) => commit(e, option),
      onMouseMove: () => {
        if (!option.disabled && index !== highlighted) setHighlighted(index);
      },
    };
    return (
      <React.Fragment key={`${String(option.value)}-${index}`}>
        {renderOption ? renderOption(props, option) : <CustomSelectOption {...props} />}
      </React.Fragment>
    );
  };

  return (
    <>
      <FormField
        ref={(node) => setRefs(node, fieldRef, slotProps?.root?.ref)}
        status={status}
        mode={selectTypeMode(selectType)}
        before={before}
        after={
          <>
            {clearShown && (
              <FormFieldClearButton
                label={clearLabel}
                onClick={(e) => {
                  commit(e, null);
                  inputRef.current?.focus();
                }}
              />
            )}
            {fetching ? (
              <Spinner size="s" label={null} className="text-icon-secondary" />
            ) : (
              <span className="pointer-events-none flex">{icon ?? <DropdownIcon opened={open} />}</span>
            )}
          </>
        }
        disabled={disabled}
        style={style}
        {...slotProps?.root}
        className={cn(!disabled && "cursor-pointer", className, slotProps?.root?.className)}
        onClick={(e) => {
          slotProps?.root?.onClick?.(e);
          if ((e.target as Element).closest("button")) return;
          if (open) closeList();
          else openList();
          inputRef.current?.focus();
        }}
      >
        <input
          ref={(node) => setRefs(node, inputRef, ref)}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-haspopup="listbox"
          aria-autocomplete={searchable ? "list" : "none"}
          aria-activedescendant={open && highlighted >= 0 ? optionId(highlighted) : undefined}
          aria-busy={fetching || undefined}
          autoComplete="off"
          value={displayed}
          readOnly={!searchable || readOnly}
          disabled={disabled}
          placeholder={open && searchable ? (selected?.label ?? placeholder) : placeholder}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={(e) => {
            onBlur?.(e);
            closeList();
          }}
          {...rest}
          {...control}
          className={cn(
            "min-w-0 flex-1 bg-transparent ps-3 outline-none placeholder:text-muted-foreground",
            !searchable && "cursor-pointer caret-transparent",
            disabled && "cursor-default",
            selectTypographyVariants({ selectType, empty: !selected }),
          )}
        />
        {name && <input type="hidden" name={name} value={value ?? ""} />}
      </FormField>
      <span role="status" className="sr-only">
        {open && !fetching && filtered.length === 0 ? emptyText : ""}
      </span>
      {open && (
        <CustomSelectDropdown
          targetRef={fieldRef}
          placement={popupDirection === "top" ? "top-start" : "bottom-start"}
          offsetDistance={dropdownOffsetDistance}
          autoWidth={dropdownAutoWidth}
          forcePortal={forcePortal}
          noMaxHeight={noMaxHeight}
          fetching={fetching}
          fetchingLabel={fetchingLabel}
        >
          {filtered.length === 0 ? (
            <div aria-hidden className="px-3 py-2 text-body text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            <div
              role="listbox"
              id={listId}
              aria-label={rest["aria-labelledby"] ? undefined : (rest["aria-label"] ?? listLabel)}
              aria-labelledby={rest["aria-labelledby"]}
            >
              {sections.map((section, s) =>
                section.group ? (
                  // biome-ignore lint/a11y/useSemanticElements: a fieldset is not allowed inside a listbox; ARIA groups are.
                  <div
                    key={`${section.group}-${String(section.items[0]?.option.value)}`}
                    role="group"
                    aria-labelledby={`${baseId}-group-${s}`}
                    className="not-first:mt-1 not-first:border-t not-first:border-separator not-first:pt-1"
                  >
                    <div
                      id={`${baseId}-group-${s}`}
                      className="px-3 pt-2 pb-1 text-footnote font-medium text-muted-foreground"
                    >
                      {section.group}
                    </div>
                    {section.items.map(renderRow)}
                  </div>
                ) : (
                  section.items.map(renderRow)
                ),
              )}
            </div>
          )}
        </CustomSelectDropdown>
      )}
    </>
  );
});
