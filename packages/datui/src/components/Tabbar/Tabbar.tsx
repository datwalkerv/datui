import * as React from "react";
import { cn } from "../../lib/utils";

export type TabbarLayout = "vertical" | "horizontal";

export const TabbarContext = React.createContext<TabbarLayout>("vertical");

export interface TabbarProps extends React.HTMLAttributes<HTMLElement> {
  /** `vertical` puts icons over labels, `horizontal` beside them. `auto` is vertical with 3+ items. @default "auto" */
  mode?: "auto" | TabbarLayout;
  /** No top border and shadow. */
  plain?: boolean;
  /** Accessible name of the navigation landmark. @default "Main" */
  "aria-label"?: string;
}

/** Bottom navigation bar for `Epic`. Sticks to the bottom edge and pads for the device safe area. */
export const Tabbar = React.forwardRef<HTMLElement, TabbarProps>(function Tabbar(
  { mode = "auto", plain = false, "aria-label": label = "Main", className, children, ...rest },
  ref,
) {
  const count = React.Children.toArray(children).filter(React.isValidElement).length;
  const layout: TabbarLayout = mode === "auto" ? (count > 2 ? "vertical" : "horizontal") : mode;
  return (
    <TabbarContext.Provider value={layout}>
      <nav
        ref={ref}
        aria-label={label}
        data-layout={layout}
        className={cn(
          "sticky bottom-0 z-fixed w-full bg-background pb-[env(safe-area-inset-bottom)]",
          !plain && "border-t border-separator shadow-sm",
          className,
        )}
        {...rest}
      >
        <ul className="flex min-h-tabbar items-stretch">
          {React.Children.map(children, (c) => c && <li className="flex min-w-0 flex-1">{c}</li>)}
        </ul>
      </nav>
    </TabbarContext.Provider>
  );
});
