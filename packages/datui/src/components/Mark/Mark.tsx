import * as React from "react";
import { cn } from "../../lib/utils";

export type MarkProps = React.HTMLAttributes<HTMLElement>;

/** Highlights a text fragment, e.g. a search match. */
export const Mark = React.forwardRef<HTMLElement, MarkProps>(function Mark({ className, ...rest }, ref) {
  return <mark ref={ref} className={cn("rounded-xs bg-mark px-px text-inherit", className)} {...rest} />;
});
