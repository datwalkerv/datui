import * as React from "react";
import { FormRemovable, type FormRemovableProps } from "../../internal/FormRemovable/FormRemovable";
import { cn } from "../../lib/utils";
import type { FormFieldStatus } from "../FormField/FormField";
import { FormItemContext, type FormItemContextValue } from "./FormItemContext";
import { FormItemTop, FormItemTopLabel } from "./FormItemTop";

export { type FormItemControlProps, useFormItemControl } from "./FormItemContext";

export interface FormItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onRemove">,
    Omit<FormRemovableProps, "children"> {
  /** Label. A string/number renders a `<label>` for the control; pass a `FormItemTop` for custom headers. */
  top?: React.ReactNode;
  /** Id of the label element. */
  topId?: string;
  /** Let a text `top` wrap instead of truncating. @default false */
  topMultiline?: boolean;
  /** Id of the control. Defaults to a generated id that datui controls inside pick up automatically. */
  htmlFor?: string;
  /** Helper or error text under the control, linked through `aria-describedby`. */
  bottom?: React.ReactNode;
  /** Id of the bottom text. */
  bottomId?: string;
  /** Validation state passed to the control (border + `aria-invalid`) and bottom text color. @default "default" */
  status?: FormFieldStatus;
  /** Marks the label with `*` and sets `required` on the control. @default false */
  required?: boolean;
  /** Removes the horizontal padding. @default false */
  noPadding?: boolean;
}

/**
 * Field wrapper: label (`top`), control (`children`), helper/error text (`bottom`).
 * datui text controls inside (Input, Textarea, Search, NativeSelect, Select, SelectMimicry) are wired
 * automatically: id ↔ label, `aria-describedby` ↔ bottom, `aria-invalid` from `status`, `required`.
 * Custom controls call `useFormItemControl()`.
 */
export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(function FormItem(
  {
    top,
    topId,
    topMultiline = false,
    htmlFor,
    bottom,
    bottomId,
    status = "default",
    required = false,
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
  const autoId = React.useId();
  const controlId = htmlFor ?? `${autoId}-control`;
  const resolvedBottomId = bottomId ?? `${autoId}-bottom`;
  const hasBottom = bottom !== undefined && bottom !== null && bottom !== false;
  const ctx = React.useMemo<FormItemContextValue>(
    () => ({ controlId, describedById: hasBottom ? resolvedBottomId : undefined, status, required }),
    [controlId, hasBottom, resolvedBottomId, status, required],
  );
  const textTop = typeof top === "string" || typeof top === "number";

  return (
    <FormItemContext.Provider value={ctx}>
      <div ref={ref} className={cn("py-3", !noPadding && "px-4", className)} {...rest}>
        <FormRemovable removable={removable} onRemove={onRemove} removeLabel={removeLabel}>
          {textTop ? (
            <FormItemTop>
              <FormItemTopLabel id={topId} multiline={topMultiline}>
                {top}
              </FormItemTopLabel>
            </FormItemTop>
          ) : (
            top
          )}
          {children}
          {hasBottom && (
            <div
              id={resolvedBottomId}
              role={status === "error" ? "alert" : undefined}
              className={cn(
                "pt-2 text-footnote",
                status === "error"
                  ? "text-destructive"
                  : status === "valid"
                    ? "text-positive"
                    : "text-muted-foreground",
              )}
            >
              {bottom}
            </div>
          )}
        </FormRemovable>
      </div>
    </FormItemContext.Provider>
  );
});
