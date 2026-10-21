import * as React from "react";
import { cn } from "../../lib/utils";

export interface InfoRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Small label shown above the value. */
  header: React.ReactNode;
}

/** Label + value pair. A hidden separator keeps screen readers from running the two together. */
export const InfoRow = React.forwardRef<HTMLDivElement, InfoRowProps>(function InfoRow(
  { header, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex flex-col gap-0.5", className)} {...rest}>
      <span className="text-footnote text-muted-foreground">
        {header}
        <span className="sr-only">: </span>
      </span>
      <span className="text-body text-foreground">{children}</span>
    </div>
  );
});
