import { Separator as SeparatorPrimitive } from "radix-ui";
import * as React from "react";
import { type SpacingSize, spacingValue } from "../../lib/spacing";
import { cn } from "../../lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "horizontal" */
  direction?: "horizontal" | "vertical";
  /** `primary` is a solid line, `secondary` is lighter, `alpha` is translucent for colored surfaces. */
  appearance?: "primary" | "secondary" | "alpha";
  /** Add the standard horizontal gutter (horizontal) or vertical inset (vertical). */
  padding?: boolean;
  /** Space the separator occupies across its line; the line is centered in it. */
  size?: SpacingSize | number | string;
  /** Purely visual (default) or a semantic `role="separator"`. @default true */
  decorative?: boolean;
}

const lines = { primary: "bg-separator", secondary: "bg-separator/50", alpha: "bg-border" } as const;

/** Thin divider line. */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { direction = "horizontal", appearance = "primary", padding, size, decorative = true, className, style, ...rest },
  ref,
) {
  const horizontal = direction === "horizontal";
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={direction}
      decorative={decorative}
      className={cn(
        "flex shrink-0 items-center justify-center",
        horizontal ? "w-full flex-col" : "h-full self-stretch flex-row",
        padding && (horizontal ? "px-4" : "py-2"),
        className,
      )}
      style={{ [horizontal ? "height" : "width"]: spacingValue(size), ...style }}
      {...rest}
    >
      <span className={cn(lines[appearance], horizontal ? "h-px w-full" : "h-full w-px")} />
    </SeparatorPrimitive.Root>
  );
});
