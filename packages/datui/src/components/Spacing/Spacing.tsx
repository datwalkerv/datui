import * as React from "react";
import { type SpacingSize, spacingValue } from "../../lib/spacing";
import { cn } from "../../lib/utils";

export interface SpacingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Token, px number or CSS length. @default "m" */
  size?: SpacingSize | number | string;
}

/** Empty vertical spacer. */
export const Spacing = React.forwardRef<HTMLDivElement, SpacingProps>(function Spacing(
  { size = "m", className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("shrink-0", className)}
      style={{ height: spacingValue(size), ...style }}
      {...rest}
    />
  );
});
