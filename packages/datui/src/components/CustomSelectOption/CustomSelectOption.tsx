import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface CustomSelectOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Secondary line under the label. */
  description?: React.ReactNode;
  before?: React.ReactNode;
  /** Content after the label. A check mark is shown instead while `selected` and `after` is unset. */
  after?: React.ReactNode;
  /** Marks the option as the current value (`aria-selected`, check mark). */
  selected?: boolean;
  /** Keyboard / pointer highlight (the combobox's active descendant). */
  focused?: boolean;
  disabled?: boolean;
  /** Nesting level; each level indents the row. @default 0 */
  hierarchy?: number;
  /** Keep the label on one line with an ellipsis. @default false */
  textNoWrap?: boolean;
}

/**
 * One `role="option"` row of a select listbox. The owner (CustomSelect, ChipsSelect) handles keys and passes `id`,
 * `focused`, `selected` and click handlers. Mouse down never takes focus away from the combobox input.
 */
export const CustomSelectOption = React.forwardRef<HTMLDivElement, CustomSelectOptionProps>(function CustomSelectOption(
  {
    description,
    before,
    after,
    selected = false,
    focused = false,
    disabled = false,
    hierarchy = 0,
    textNoWrap = false,
    className,
    style,
    children,
    onMouseDown,
    ...rest
  },
  ref,
) {
  return (
    // biome-ignore lint/a11y/useFocusableInteractive: options are reached through the combobox's aria-activedescendant, not DOM focus.
    <div
      ref={ref}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-focused={focused || undefined}
      onMouseDown={(e) => {
        onMouseDown?.(e);
        e.preventDefault();
      }}
      className={cn(
        "flex min-h-control-l cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-body text-popover-foreground select-none",
        "data-focused:bg-accent aria-disabled:cursor-default aria-disabled:opacity-(--dt-opacity-disabled)",
        className,
      )}
      style={hierarchy > 0 ? { paddingInlineStart: `calc(var(--spacing) * ${3 + hierarchy * 4})`, ...style } : style}
      {...rest}
    >
      {before && <span className="flex shrink-0 text-icon-secondary">{before}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className={cn(textNoWrap && "truncate")}>{children}</span>
        {description && <span className="text-subhead text-muted-foreground">{description}</span>}
      </span>
      {after ?? (selected && <Check aria-hidden className="size-icon-md shrink-0 text-primary" />)}
    </div>
  );
});
