import * as React from "react";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { usePanel } from "../Panel/Panel";
import { Separator } from "../Separator/Separator";

export interface PanelHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Start slot, usually `PanelHeaderBack`. */
  before?: React.ReactNode;
  /** End slot for actions. */
  after?: React.ReactNode;
  /**
   * What separates the header from the content. `auto`: a separator line in plain panels, spacing in card panels.
   * @default "auto"
   */
  delimiter?: "auto" | "none" | "separator" | "spacing";
  /** No background. */
  transparent?: boolean;
  /** Stick to the top while the panel scrolls. */
  fixed?: boolean;
  /** Overlay the content instead of taking space (e.g. over a cover image). */
  float?: boolean;
  /** Heading element for the title. @default "h2" */
  titleAs?: "h1" | "h2" | "h3";
}

/** Top bar of a `Panel`: title plus `before`/`after` slots. The title labels the panel and receives focus after navigation. */
export const PanelHeader = React.forwardRef<HTMLElement, PanelHeaderProps>(function PanelHeader(
  {
    before,
    after,
    delimiter = "auto",
    transparent = false,
    fixed = false,
    float = false,
    titleAs: Title = "h2",
    className,
    children,
    ...rest
  },
  ref,
) {
  const panel = usePanel();
  const { sizeX } = useAdaptivity();
  const register = panel?.registerTitle;
  const hasTitle = children !== undefined && children !== null && children !== false;
  React.useEffect(() => (hasTitle && register ? register() : undefined), [hasTitle, register]);
  const card = panel?.mode === "card";
  const line = delimiter === "separator" || (delimiter === "auto" && !card);
  const spacing = delimiter === "spacing" || (delimiter === "auto" && card);
  const centered = sizeX === "compact";
  return (
    <header
      ref={ref}
      className={cn(
        "z-sticky w-full pt-[env(safe-area-inset-top)]",
        fixed && "sticky top-0",
        float && "absolute inset-x-0 top-0",
        !transparent && (card ? "bg-card" : "bg-background"),
        card && "rounded-t-xl",
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "grid min-h-panel-header items-center gap-1 px-1",
          centered ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-[auto_1fr_auto]",
        )}
      >
        <div className="flex min-w-0 items-center justify-start">{before}</div>
        {hasTitle ? (
          <Title
            id={panel?.titleId}
            data-nav-title=""
            tabIndex={-1}
            className={cn(
              "min-w-0 truncate text-title-3 font-semibold outline-none",
              centered ? "text-center" : "px-2 text-start",
            )}
          >
            {children}
          </Title>
        ) : (
          <div />
        )}
        <div className="flex min-w-0 items-center justify-end">{after}</div>
      </div>
      {line && <Separator data-delimiter="separator" />}
      {spacing && <div data-delimiter="spacing" className="h-2" />}
    </header>
  );
});
