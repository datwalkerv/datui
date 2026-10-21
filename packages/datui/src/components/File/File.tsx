import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../Button/Button";

export interface FileProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    Omit<VariantProps<typeof buttonVariants>, "iconOnly"> {
  /** Button text. @default "Choose file" */
  children?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  /** Props for the visible `<label>` button. `className` and `style` also go there. */
  slotProps?: { root?: React.LabelHTMLAttributes<HTMLLabelElement> & { ref?: React.Ref<HTMLLabelElement> } };
}

/**
 * Button that opens the native file picker: a `<label>` styled as Button around a visually hidden
 * `<input type="file">`. The input keeps focus and Enter/Space; `ref` and `onChange(event)` are the input's.
 */
export const File = React.forwardRef<HTMLInputElement, FileProps>(function File(
  {
    children = "Choose file",
    variant,
    appearance,
    size,
    stretched,
    align,
    rounded,
    before,
    after,
    slotProps,
    className,
    style,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <label
      {...slotProps?.root}
      style={style}
      aria-disabled={disabled || undefined}
      className={cn(
        buttonVariants({ variant, appearance, size, stretched, align, rounded }),
        "relative cursor-pointer has-[:focus-visible]:focus-ring hover:opacity-90 active:opacity-80",
        disabled && "pointer-events-none opacity-(--dt-opacity-disabled)",
        className,
        slotProps?.root?.className,
      )}
    >
      <input ref={ref} type="file" disabled={disabled} className="sr-only" {...rest} />
      {before && (
        <span aria-hidden className="inline-flex shrink-0">
          {before}
        </span>
      )}
      <span className="min-w-0 truncate">{children}</span>
      {after && <span className="inline-flex shrink-0">{after}</span>}
    </label>
  );
});
