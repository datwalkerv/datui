import * as React from "react";
import { Tappable } from "../../components/Tappable/Tappable";
import { cn } from "../../lib/utils";

export interface SelectionControlProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Drop row padding; feedback switches from background tint to opacity. @default false */
  noPadding?: boolean;
  disabled?: boolean;
}

/** `<label>` row that toggles the control it wraps when clicked anywhere. */
export const SelectionControl = React.forwardRef<HTMLLabelElement, SelectionControlProps>(function SelectionControl(
  { noPadding = false, disabled, className, ...rest },
  ref,
) {
  return (
    <Tappable
      ref={ref as React.Ref<HTMLElement>}
      as="label"
      feedback={disabled ? "none" : noPadding ? "opacity" : "background"}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "flex items-start gap-3 text-body text-foreground",
        noPadding ? "py-0" : "min-h-cell px-4 py-3",
        disabled && "cursor-default opacity-(--dt-opacity-disabled)",
        className,
      )}
      {...rest}
    />
  );
});

export interface SelectionControlLabelProps {
  titleId?: string;
  descriptionId?: string;
  children?: React.ReactNode;
  titleAfter?: React.ReactNode;
  description?: React.ReactNode;
}

/** Title (+ `titleAfter`) and optional description of a selection row. */
export function SelectionControlLabel({
  titleId,
  descriptionId,
  children,
  titleAfter,
  description,
}: SelectionControlLabelProps) {
  return (
    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
      <span className="flex items-center gap-1.5">
        <span id={titleId} className="min-w-0">
          {children}
        </span>
        {titleAfter}
      </span>
      {description && (
        <span id={descriptionId} className="text-footnote text-muted-foreground">
          {description}
        </span>
      )}
    </span>
  );
}
