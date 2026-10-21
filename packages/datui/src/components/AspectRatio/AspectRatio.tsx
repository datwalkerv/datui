import * as React from "react";
import { cn } from "../../lib/utils";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLElement> {
  /** Width / height, as a number (`16 / 9`) or any CSS `aspect-ratio` value (`"4 / 3"`, `var(--x)`). */
  ratio: number | string;
  /** `stretch` makes every child fill the box. @default "stretch" */
  mode?: "stretch" | "none";
  as?: React.ElementType;
}

/** Box locked to an aspect ratio at fluid width. */
export const AspectRatio = React.forwardRef<HTMLElement, AspectRatioProps>(function AspectRatio(
  { ratio, mode = "stretch", as: Component = "div", className, style, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden",
        mode === "stretch" &&
          "[&>*]:absolute [&>*]:inset-0 [&>*]:size-full [&>img]:object-cover [&>video]:object-cover",
        className,
      )}
      style={{ aspectRatio: ratio, ...style }}
      {...rest}
    />
  );
});
