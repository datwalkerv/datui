import { Search as SearchIcon } from "lucide-react";
import * as React from "react";
import { FormFieldClearButton } from "../../internal/FormFieldClearButton/FormFieldClearButton";
import { setNativeValue, setRefs } from "../../internal/formUtils/formUtils";
import { unstyledTextFieldClass } from "../../internal/UnstyledTextField/UnstyledTextField";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";
import { useFormItemControl } from "../FormItem/FormItemContext";

export type SearchIconButtonRenderer = (
  icon: React.ReactNode,
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => React.ReactElement;

export interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  value?: string;
  /** Leading content inside the field. @default search icon */
  before?: React.ReactNode;
  /** Content after the field, e.g. a "Cancel" button. */
  after?: React.ReactNode;
  /**
   * Trailing icon inside the field. A node becomes an icon button when `onIconClick` is set;
   * a function receives a renderer that makes styled icon buttons.
   */
  icon?: React.ReactNode | ((render: SearchIconButtonRenderer) => React.ReactNode);
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Accessible label of the icon button. */
  iconLabel?: string;
  /** @default false */
  hideClearButton?: boolean;
  /** Accessible label of the clear button. @default "Clear" */
  clearLabel?: string;
  /** Text of the find button. @default "Find" */
  findButtonText?: string;
  /** Shows a find button next to the field on compact (desktop) density. */
  onFindButtonClick?: React.MouseEventHandler<HTMLElement>;
  /** Removes the outer padding. @default false */
  noPadding?: boolean;
  /**
   * Props for the wrapper. `className` and `style` also go there. Pass `{ root: { role: "search" } }` when this field is
   * the page's search landmark; it is not one by default so several fields can share a page.
   */
  slotProps?: { root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> } };
}

const iconButtonClass =
  "inline-flex size-control-s shrink-0 cursor-pointer items-center justify-center rounded-full text-icon-secondary outline-none hover:text-foreground focus-visible:focus-ring";

/**
 * Search field: `type="search"` input with icon, clear button (also Esc), optional trailing icon button
 * and find button. Native `onChange(event)`; clearing dispatches a real change event with `""`.
 */
export const Search = React.forwardRef<HTMLInputElement, SearchProps>(function Search(
  {
    value,
    defaultValue,
    onChange,
    placeholder = "Search",
    before = <SearchIcon className="size-icon-sm" aria-hidden />,
    after,
    icon,
    onIconClick,
    iconLabel,
    hideClearButton = false,
    clearLabel = "Clear",
    findButtonText = "Find",
    onFindButtonClick,
    noPadding = false,
    slotProps,
    className,
    style,
    disabled,
    readOnly,
    onKeyDown,
    enterKeyHint = "search",
    autoComplete = "off",
    ...rest
  },
  ref,
) {
  const { status, control } = useFormItemControl(rest);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inner, setInner] = React.useState(() => String(defaultValue ?? ""));
  const current = value ?? inner;
  const { sizeY } = useAdaptivity();

  const clear = () => {
    if (inputRef.current) setNativeValue(inputRef.current, "");
    inputRef.current?.focus();
  };

  const renderIconButton: SearchIconButtonRenderer = (node, props) => (
    <button type="button" {...props} className={cn(iconButtonClass, props?.className)}>
      {node}
    </button>
  );
  const iconNode =
    typeof icon === "function"
      ? icon(renderIconButton)
      : icon && onIconClick
        ? renderIconButton(icon, { onClick: onIconClick, "aria-label": iconLabel, disabled })
        : icon;
  const showClear = !hideClearButton && current !== "" && !disabled && !readOnly;

  return (
    <div
      {...slotProps?.root}
      style={style}
      className={cn("flex items-center gap-2", !noPadding && "px-4 py-2", className, slotProps?.root?.className)}
    >
      <FormField
        status={status}
        disabled={disabled}
        before={before}
        after={
          (showClear || iconNode) && (
            <>
              {showClear && <FormFieldClearButton label={clearLabel} onClick={clear} />}
              {iconNode}
            </>
          )
        }
        className="min-h-control-m flex-1 rounded-lg border-transparent bg-secondary"
      >
        <input
          ref={(node) => setRefs(node, inputRef, ref)}
          type="search"
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          enterKeyHint={enterKeyHint}
          autoComplete={autoComplete}
          aria-label={rest["aria-label"] ?? (control.id ? undefined : placeholder)}
          onChange={(e) => {
            setInner(e.target.value);
            onChange?.(e);
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e);
            if (e.key === "Escape" && !e.defaultPrevented && current !== "" && !readOnly) {
              e.preventDefault();
              clear();
            }
          }}
          {...rest}
          {...control}
          className={cn(
            unstyledTextFieldClass,
            "py-1.5 ps-2 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
          )}
        />
      </FormField>
      {onFindButtonClick && sizeY === "compact" && (
        <Button variant="secondary" onClick={onFindButtonClick} disabled={disabled}>
          {findButtonText}
        </Button>
      )}
      {after}
    </div>
  );
});
