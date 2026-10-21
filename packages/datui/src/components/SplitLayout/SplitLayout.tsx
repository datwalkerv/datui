import * as React from "react";
import { cn } from "../../lib/utils";

export interface SplitLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Row above the columns, usually a `PanelHeader` or app bar. */
  header?: React.ReactNode;
  /** Center the columns horizontally. */
  center?: boolean;
  /** Swap the visual order of the columns. DOM (reading) order stays the same. */
  reverseColumns?: boolean;
}

/** Multi-column app shell. Children are `SplitCol`s. */
export const SplitLayout = React.forwardRef<HTMLDivElement, SplitLayoutProps>(function SplitLayout(
  { header, center = false, reverseColumns = false, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex min-h-full w-full flex-col", className)} {...rest}>
      {header}
      <div
        className={cn(
          "flex w-full flex-1 items-start",
          center && "justify-center",
          reverseColumns && "flex-row-reverse",
        )}
      >
        {children}
      </div>
    </div>
  );
});
