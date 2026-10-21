import * as React from "react";
import { cn } from "../../lib/utils";
import { TabbarContext } from "../Tabbar/Tabbar";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export interface TabbarItemProps extends Omit<TappableProps, "feedback" | "activated"> {
  /** Visible text. Without it, pass `aria-label`. */
  label?: React.ReactNode;
  /** Current destination: accent color and `aria-current="page"`. */
  selected?: boolean;
  /** Badge or counter on the icon. */
  indicator?: React.ReactNode;
}

/** One destination in `Tabbar`: icon (children), label and optional indicator. Renders a link with `href`. */
export const TabbarItem = React.forwardRef<HTMLElement, TabbarItemProps>(function TabbarItem(
  { label, selected = false, indicator, className, children, ...rest },
  ref,
) {
  const layout = React.useContext(TabbarContext);
  return (
    <Tappable
      ref={ref}
      as={rest.href ? "a" : "button"}
      aria-current={selected ? "page" : undefined}
      data-selected={selected || undefined}
      className={cn(
        "flex min-w-0 flex-1 items-center justify-center no-underline [&_svg]:size-icon-lg",
        layout === "vertical"
          ? "flex-col gap-0.5 py-1 text-caption-2 font-medium"
          : "flex-row gap-2 text-subhead font-medium",
        selected ? "text-primary" : "text-muted-foreground",
        className,
      )}
      {...rest}
    >
      <span className="relative inline-flex">
        {children}
        {indicator && <span className="absolute -end-2 -top-1 inline-flex">{indicator}</span>}
      </span>
      {label !== undefined && label !== null && <span className="max-w-full truncate">{label}</span>}
    </Tappable>
  );
});
