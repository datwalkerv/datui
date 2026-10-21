import * as React from "react";
import { cn } from "../../lib/utils";
import { Tappable } from "../Tappable/Tappable";

export interface PanelHeaderContentProps extends React.HTMLAttributes<HTMLElement> {
  /** Avatar or icon before the title. */
  before?: React.ReactNode;
  /** Secondary line under the title. */
  subtitle?: React.ReactNode;
  /** Content after the title, e.g. a dropdown chevron. */
  aside?: React.ReactNode;
}

/**
 * Rich title for `PanelHeader`. With `onClick` it becomes a button — pair it with `PanelHeaderContext` and pass
 * `aria-expanded`/`aria-controls`.
 */
export const PanelHeaderContent = React.forwardRef<HTMLElement, PanelHeaderContentProps>(function PanelHeaderContent(
  { before, subtitle, aside, onClick, className, children, ...rest },
  ref,
) {
  return (
    <Tappable
      ref={ref}
      as={onClick ? "button" : "span"}
      onClick={onClick}
      className={cn("inline-flex max-w-full min-w-0 items-center gap-2 rounded-md px-1 text-start", className)}
      {...rest}
    >
      {before && <span className="inline-flex shrink-0">{before}</span>}
      <span className="flex min-w-0 flex-col">
        <span className="flex min-w-0 items-center gap-1">
          <span className="truncate">{children}</span>
          {aside && <span className="inline-flex shrink-0 text-icon-secondary [&_svg]:size-icon-sm">{aside}</span>}
        </span>
        {subtitle && <span className="truncate text-footnote font-normal text-muted-foreground">{subtitle}</span>}
      </span>
    </Tappable>
  );
});
