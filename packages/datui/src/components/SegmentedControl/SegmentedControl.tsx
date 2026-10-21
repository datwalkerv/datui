import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";

export type SegmentedControlValue = string | number;

export interface SegmentedControlOptionData {
  value: SegmentedControlValue;
  label: React.ReactNode;
  before?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "dir"> {
  options: SegmentedControlOptionData[];
  value?: SegmentedControlValue;
  /** @default the first option */
  defaultValue?: SegmentedControlValue;
  onChange?: (value: SegmentedControlValue) => void;
  /** @default "l" */
  size?: "m" | "l";
  /** Form field name. */
  name?: string;
  disabled?: boolean;
}

/**
 * Exclusive choice between a few equal-width options with a sliding indicator.
 * `radiogroup` semantics (Radix RadioGroup): Tab focuses the selected option, arrow keys move and select.
 */
export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  { options, value, defaultValue, onChange, size = "l", className, ...rest },
  ref,
) {
  const [current, setCurrent] = useControllableState<SegmentedControlValue | undefined>({
    value,
    defaultValue: defaultValue ?? options[0]?.value,
    onChange: onChange as ((v: SegmentedControlValue | undefined) => void) | undefined,
  });
  const index = options.findIndex((o) => o.value === current);
  const count = Math.max(options.length, 1);

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation="horizontal"
      loop
      value={current === undefined ? "" : String(current)}
      onValueChange={(v) => {
        const option = options.find((o) => String(o.value) === v);
        if (option) setCurrent(option.value);
      }}
      className={cn(
        "relative isolate flex w-full rounded-lg bg-secondary p-0.5 data-disabled:opacity-(--dt-opacity-disabled)",
        size === "l" ? "h-control-l" : "h-control-m",
        className,
      )}
      {...rest}
    >
      {index >= 0 && (
        <span
          aria-hidden
          className="absolute inset-y-0.5 -z-10 rounded-md bg-card shadow-sm transition-[inset-inline-start] duration-normal ease-standard"
          style={{
            width: `calc((100% - var(--spacing)) / ${count})`,
            insetInlineStart: `calc(var(--spacing) * 0.5 + (100% - var(--spacing)) * ${index} / ${count})`,
          }}
        />
      )}
      {options.map((option) => (
        <RadioGroupPrimitive.Item
          key={String(option.value)}
          value={String(option.value)}
          disabled={option.disabled}
          className={cn(
            "flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 font-medium text-foreground outline-none",
            "focus-visible:focus-ring disabled:cursor-default disabled:opacity-(--dt-opacity-disabled)",
            size === "l" ? "text-subhead" : "text-footnote",
          )}
        >
          {option.before && (
            <span aria-hidden className="inline-flex shrink-0">
              {option.before}
            </span>
          )}
          <span className="truncate">{option.label}</span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
});
