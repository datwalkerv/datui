import * as React from "react";
import { cn } from "../../lib/utils";

export interface ModalPageContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Scrollable body of a `ModalPage`. It is focusable so keyboard users can scroll it; on compact width the sheet
 * only starts dragging when this area is scrolled to the top.
 */
export const ModalPageContent = React.forwardRef<HTMLDivElement, ModalPageContentProps>(function ModalPageContent(
  { className, tabIndex = 0, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      tabIndex={tabIndex}
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 outline-none focus-visible:focus-ring",
        className,
      )}
      {...rest}
    />
  );
});
