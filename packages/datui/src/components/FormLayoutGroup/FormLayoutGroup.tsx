import * as React from "react";
import { FormRemovable, type FormRemovableProps } from "../../internal/FormRemovable/FormRemovable";
import { cn } from "../../lib/utils";

export interface FormLayoutGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onRemove">,
    Omit<FormRemovableProps, "children"> {
  /** `horizontal` places items side by side from the tablet breakpoint (stacked below it). @default "vertical" */
  mode?: "vertical" | "horizontal";
  /** Join the items' fields into one bordered block (e.g. first + last name). @default false */
  segmented?: boolean;
  /** Removes the horizontal padding. @default false */
  noPadding?: boolean;
}

// Joined borders: square inner corners and overlap neighbouring 1px borders.
const segmentedClass = {
  vertical:
    "gap-0 *:py-0 [&>*:not(:first-child)_[data-form-field]]:-mt-px [&>*:not(:first-child)_[data-form-field]]:rounded-t-none [&>*:not(:last-child)_[data-form-field]]:rounded-b-none",
  horizontal:
    "gap-0 tablet:[&>*:not(:first-child)_[data-form-field]]:-ms-px tablet:[&>*:not(:first-child)_[data-form-field]]:rounded-s-none tablet:[&>*:not(:last-child)_[data-form-field]]:rounded-e-none",
};

/**
 * Groups FormItems vertically or side by side. Name the group with `aria-labelledby` / `aria-label`
 * and it gets `role="group"`.
 */
export const FormLayoutGroup = React.forwardRef<HTMLDivElement, FormLayoutGroupProps>(function FormLayoutGroup(
  {
    mode = "vertical",
    segmented = false,
    removable,
    onRemove,
    removeLabel,
    noPadding = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const labelled = Boolean(rest["aria-labelledby"] || rest["aria-label"]);
  return (
    <div ref={ref} role={labelled ? "group" : undefined} className={cn(!noPadding && "px-4", className)} {...rest}>
      <FormRemovable removable={removable} onRemove={onRemove} removeLabel={removeLabel}>
        <div
          data-mode={mode}
          className={cn(
            "flex flex-col *:px-0",
            mode === "horizontal" ? "gap-3 tablet:flex-row tablet:*:min-w-0 tablet:*:flex-1" : "",
            segmented && cn("py-3 *:relative *:focus-within:z-10", segmentedClass[mode]),
          )}
        >
          {children}
        </div>
      </FormRemovable>
    </div>
  );
});
