import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { useTransitionMotion } from "../ConfigProvider/ConfigProvider";
import { useDirection } from "../DirectionProvider/DirectionProvider";

export type TabsMode = "default" | "accent" | "secondary";

export interface TabsContextValue {
  mode: TabsMode;
  stretched: boolean;
  navigation: boolean;
  value: string | undefined;
  select: (value: string) => void;
}

export const TabsContext = React.createContext<TabsContextValue | null>(null);

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "role" | "dir"> {
  /** `default` underlines the selected tab; `accent` and `secondary` use pills. @default "default" */
  mode?: TabsMode;
  /** `stretched` shares the width equally, `shrinked` sizes tabs to content. `auto`: stretched on compact widths. @default "auto" */
  layoutFillMode?: "auto" | "stretched" | "shrinked";
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Scroll the selected tab into view when the selection changes. @default true */
  scrollToSelected?: boolean;
  /** @default "nearest" */
  scrollToSelectedInline?: ScrollLogicalPosition;
  /**
   * `tablist`: WAI-ARIA tabs with arrow-key focus; give each `TabsItem` an `aria-controls` and its panel
   * `aria-labelledby`. `navigation`: a `<nav>` of links/buttons marked with `aria-current`.
   * @default "tablist"
   */
  role?: "tablist" | "navigation";
}

/** Horizontal tabs. Scrolls horizontally when the items overflow. Children are `TabsItem`s. */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    mode = "default",
    layoutFillMode = "auto",
    value: valueProp,
    defaultValue,
    onChange,
    scrollToSelected = true,
    scrollToSelectedInline = "nearest",
    role = "tablist",
    className,
    children,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...rest
  },
  ref,
) {
  const { sizeX } = useAdaptivity();
  const dir = useDirection();
  const motion = useTransitionMotion();
  const [value, setValue] = useControllableState<string | undefined>({
    value: valueProp,
    defaultValue,
    onChange: onChange as (v: string | undefined) => void,
  });
  const stretched = layoutFillMode === "stretched" || (layoutFillMode === "auto" && sizeX === "compact");
  const navigation = role === "navigation";
  const ctx = React.useMemo(
    () => ({ mode, stretched, navigation, value, select: (v: string) => setValue(v) }),
    [mode, stretched, navigation, value, setValue],
  );
  const listRef = React.useRef<HTMLDivElement>(null);
  const first = React.useRef(true);
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs when the selection changes; value is the trigger
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!scrollToSelected) return;
    listRef.current
      ?.querySelector<HTMLElement>("[data-selected]")
      ?.scrollIntoView({ block: "nearest", inline: scrollToSelectedInline, behavior: motion ? "smooth" : "auto" });
  }, [value, scrollToSelected, scrollToSelectedInline, motion]);

  const listClass = cn(
    "flex w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    mode === "default" ? "" : "gap-1 p-1",
  );
  const list = navigation ? (
    <div ref={listRef} className={listClass}>
      {children}
    </div>
  ) : (
    // The name belongs on the element with role="tablist", not on the role-less root.
    <TabsPrimitive.List ref={listRef} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} className={listClass}>
      {children}
    </TabsPrimitive.List>
  );
  return (
    <TabsContext.Provider value={ctx}>
      {navigation ? (
        <nav
          ref={ref}
          data-mode={mode}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          className={cn("w-full", className)}
          {...rest}
        >
          {list}
        </nav>
      ) : (
        <TabsPrimitive.Root
          ref={ref}
          dir={dir}
          value={value ?? ""}
          onValueChange={setValue}
          activationMode="automatic"
          data-mode={mode}
          className={cn("w-full", className)}
          {...rest}
        >
          {list}
        </TabsPrimitive.Root>
      )}
    </TabsContext.Provider>
  );
});
