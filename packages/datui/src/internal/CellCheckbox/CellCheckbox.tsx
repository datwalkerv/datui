import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface CellCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** `checkbox` for multi-select, `radio` for single-select rows sharing a `name`. @default "checkbox" */
  type?: "checkbox" | "radio";
}

/**
 * Native checkbox/radio, visually hidden, with a token-styled indicator. Meant to sit inside a `<label>` row
 * that provides the accessible name. Not a general-purpose form control.
 */
export const CellCheckbox = React.forwardRef<HTMLInputElement, CellCheckboxProps>(function CellCheckbox(
  { type = "checkbox", className, ...rest },
  ref,
) {
  const radio = type === "radio";
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <input ref={ref} type={type} className="peer sr-only" {...rest} />
      <span
        aria-hidden
        className={cn(
          "flex size-icon-lg items-center justify-center border-2 border-icon-tertiary text-primary-foreground in-data-[density=compact]:size-icon-md",
          "transition-colors duration-fast peer-checked:border-primary peer-checked:bg-primary",
          "peer-checked:[&>*]:opacity-100 peer-disabled:opacity-(--dt-opacity-disabled)",
          radio ? "rounded-full" : "rounded-sm",
        )}
      >
        {radio ? (
          <span className="size-2 rounded-full bg-primary-foreground opacity-0" />
        ) : (
          <Check strokeWidth={3} className="dt-icon-draw-peer size-icon-sm opacity-0" />
        )}
      </span>
    </span>
  );
});
