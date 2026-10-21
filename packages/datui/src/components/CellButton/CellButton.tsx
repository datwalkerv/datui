import * as React from "react";
import { cn } from "../../lib/utils";
import { SimpleCell, type SimpleCellProps } from "../SimpleCell/SimpleCell";

export interface CellButtonProps extends Omit<SimpleCellProps, "hasHover" | "hasActive"> {
  /** Color of the title and icons. @default "accent" */
  appearance?: "accent" | "neutral" | "negative";
  /** Center the content, e.g. for a lone "Log out" row. @default false */
  centered?: boolean;
}

const appearances = { accent: "text-primary", neutral: "text-foreground", negative: "text-destructive" } as const;

/** Full-width list-row button. Renders `<button>`, or `<a>` with `href`. */
export const CellButton = React.forwardRef<HTMLElement, CellButtonProps>(function CellButton(
  { appearance = "accent", centered = false, className, ...rest },
  ref,
) {
  return (
    <SimpleCell
      ref={ref}
      as={rest.href ? "a" : "button"}
      className={cn(
        appearances[appearance],
        centered && "justify-center [&>[data-cell-content]]:flex-none [&>[data-cell-content]]:items-center",
        className,
      )}
      {...rest}
    />
  );
});
