import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "../../lib/utils";
import { TabsContext } from "../Tabs/Tabs";
import { Tappable } from "../Tappable/Tappable";

export interface TabsItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Identifies the tab inside `Tabs`. */
  value: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  /** Counter or badge after the label. Announced after a space. */
  status?: React.ReactNode;
  /** Force selection (navigation mode, or when the selection lives elsewhere). */
  selected?: boolean;
  disabled?: boolean;
  /** Navigation mode only: render a link. */
  href?: string;
}

const pills = {
  accent: "data-selected:bg-primary data-selected:text-primary-foreground",
  secondary: "data-selected:bg-secondary data-selected:text-foreground",
} as const;

/** One tab of `Tabs`. In tablist mode pass `aria-controls` pointing at its panel. */
export const TabsItem = React.forwardRef<HTMLElement, TabsItemProps>(function TabsItem(
  {
    value,
    before,
    after,
    status,
    selected: selectedProp,
    disabled = false,
    href,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const ctx = React.useContext(TabsContext);
  const mode = ctx?.mode ?? "default";
  const selected = selectedProp ?? ctx?.value === value;
  const classes = cn(
    "relative inline-flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap font-medium text-subhead text-muted-foreground no-underline",
    "data-selected:text-foreground",
    ctx?.stretched ? "flex-1" : "flex-none",
    mode === "default"
      ? "min-h-control-l px-3 data-selected:before:absolute data-selected:before:inset-x-3 data-selected:before:bottom-0 data-selected:before:h-0.5 data-selected:before:rounded-full data-selected:before:bg-primary data-selected:before:content-['']"
      : cn("min-h-control-m rounded-md px-3", pills[mode]),
    "[&_svg]:size-icon-sm",
    className,
  );
  const content = (
    <>
      {before && (
        <span aria-hidden className="inline-flex shrink-0">
          {before}
        </span>
      )}
      <span className="truncate">{children}</span>
      {status !== undefined && status !== null && status !== false && (
        <>
          {/* Separates label and status for screen readers; flex layout drops it visually. */}{" "}
          <span className="inline-flex shrink-0 text-caption-1 text-muted-foreground in-data-selected:text-inherit">
            {status}
          </span>
        </>
      )}
      {after && <span className="inline-flex shrink-0">{after}</span>}
    </>
  );
  const onSelect = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) ctx?.select(value);
  };
  if (!ctx || ctx.navigation) {
    return (
      <Tappable
        ref={ref}
        as={href ? "a" : "button"}
        href={href}
        disabled={disabled}
        aria-current={selected ? "page" : undefined}
        data-selected={selected || undefined}
        onClick={onSelect}
        className={classes}
        {...rest}
      >
        {content}
      </Tappable>
    );
  }
  return (
    <TabsPrimitive.Trigger
      ref={ref as React.Ref<HTMLButtonElement>}
      value={value}
      disabled={disabled}
      data-selected={selected || undefined}
      aria-controls={rest["aria-controls"]}
      onClick={onClick}
      className={cn(
        "relative isolate cursor-pointer outline-none select-none focus-visible:focus-ring disabled:cursor-default disabled:opacity-(--dt-opacity-disabled)",
        "transition-colors duration-fast hover:text-foreground",
        classes,
      )}
      {...rest}
    >
      {content}
    </TabsPrimitive.Trigger>
  );
});
