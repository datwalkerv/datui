import * as React from "react";
import { cn } from "../../lib/utils";
import { FormItemContext } from "./FormItemContext";

export interface FormItemTopProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Header row of a FormItem: a `FormItemTopLabel` plus optional `FormItemTopAside`. */
export const FormItemTop = React.forwardRef<HTMLDivElement, FormItemTopProps>(function FormItemTop(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pb-2", className)} {...rest} />;
});

export interface FormItemTopLabelProps extends React.HTMLAttributes<HTMLElement> {
  /** Id of the labelled control. Inside a FormItem it defaults to the item's control id. */
  htmlFor?: string;
  /** Allow wrapping instead of truncating. @default false */
  multiline?: boolean;
  /** Show the required marker. Inside a FormItem it defaults to the item's `required`. */
  required?: boolean;
}

/** Field label. Renders `<label>` when it has a control to point at, otherwise `<span>`. */
export const FormItemTopLabel = React.forwardRef<HTMLElement, FormItemTopLabelProps>(function FormItemTopLabel(
  { htmlFor, multiline = false, required, className, children, ...rest },
  ref,
) {
  const ctx = React.useContext(FormItemContext);
  const target = htmlFor ?? ctx?.controlId;
  const Component = target ? "label" : "span";
  return (
    <Component
      ref={ref as React.Ref<HTMLLabelElement>}
      htmlFor={target}
      className={cn(
        "min-w-0 flex-1 text-subhead font-medium text-subtle-foreground",
        multiline ? "break-words" : "truncate",
        className,
      )}
      {...rest}
    >
      {children}
      {(required ?? ctx?.required) && (
        <span aria-hidden className="ms-0.5 text-destructive">
          *
        </span>
      )}
    </Component>
  );
});

export interface FormItemTopAsideProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** End-aligned secondary header content, e.g. a character counter (give dynamic counters `aria-live="polite"`). */
export const FormItemTopAside = React.forwardRef<HTMLSpanElement, FormItemTopAsideProps>(function FormItemTopAside(
  { className, ...rest },
  ref,
) {
  return <span ref={ref} className={cn("ms-auto shrink-0 text-footnote text-muted-foreground", className)} {...rest} />;
});
