import * as React from "react";
import { cn } from "../../lib/utils";

export interface CardGridProps extends React.HTMLAttributes<HTMLElement> {
  /** Card width: `s` ≈ 3 per row, `m` 2, `l` 1. Columns collapse on narrow screens. @default "s" */
  size?: "s" | "m" | "l";
  /** Add the standard horizontal/vertical gutter. */
  padding?: boolean;
  /** @default "ul" */
  as?: React.ElementType;
}

const columns = {
  s: "grid-cols-2 tablet:grid-cols-3",
  m: "grid-cols-1 mobile:grid-cols-2",
  l: "grid-cols-1",
} as const;

/** Responsive grid of cards. A list by default — render each card as `<li>` (`<Card asChild><li>…`). */
export const CardGrid = React.forwardRef<HTMLElement, CardGridProps>(function CardGrid(
  { size = "s", padding, as: Component = "ul", className, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn("m-0 grid list-none gap-2 p-0", columns[size], padding && "px-4 py-2", className)}
      {...rest}
    />
  );
});
