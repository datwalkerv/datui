import { GripVertical } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface CellDraggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name of the handle. */
  label: string;
}

/** Reorder handle. Receives the sortable listeners/attributes (pointer + keyboard) from its row. */
export const CellDragger = React.forwardRef<HTMLButtonElement, CellDraggerProps>(function CellDragger(
  { label, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        "flex shrink-0 cursor-grab touch-none items-center justify-center self-stretch ps-3 pe-1 text-icon-secondary outline-none",
        "focus-visible:focus-ring disabled:cursor-default disabled:opacity-(--dt-opacity-disabled) aria-pressed:cursor-grabbing",
        className,
      )}
      {...rest}
    >
      <GripVertical aria-hidden className="size-icon-lg in-data-[density=compact]:size-icon-md" />
    </button>
  );
});
