import * as React from "react";
import { cn } from "../../lib/utils";
import { Spinner, type SpinnerProps } from "../Spinner/Spinner";

export interface PanelSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<SpinnerProps, "size" | "label" | "paused"> {
  /** Block height in px. @default 96 */
  height?: number;
}

/** Spinner centered in a full-width block, for a loading panel or section. */
export const PanelSpinner = React.forwardRef<HTMLDivElement, PanelSpinnerProps>(function PanelSpinner(
  { height = 96, size = "l", label, paused, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("flex w-full items-center justify-center text-icon-secondary", className)}
      style={{ height, ...style }}
      {...rest}
    >
      <Spinner size={size} label={label} paused={paused} />
    </div>
  );
});
