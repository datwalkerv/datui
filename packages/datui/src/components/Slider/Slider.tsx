import { cva } from "class-variance-authority";
import { Slider as SliderPrimitive } from "radix-ui";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";

export type SliderValue = number | [number, number];

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "defaultValue" | "onChange" | "dir"> {
  /** A number, or `[start, end]` when `multiple`. */
  value?: SliderValue;
  defaultValue?: SliderValue;
  onChange?: (value: SliderValue) => void;
  /** Two thumbs selecting a range. @default false */
  multiple?: boolean;
  /** @default 0 */
  min?: number;
  /** @default 100 */
  max?: number;
  /** @default 1 */
  step?: number;
  disabled?: boolean;
  /** Show the value above the thumb while it is hovered, focused or dragged. @default false */
  withTooltip?: boolean;
  /** Track and thumb size. @default "l" */
  size?: "s" | "m" | "l";
  /** Accessible label per thumb (0 = start, 1 = end). */
  getAriaLabel?: (index: number) => string;
  /** Human readable value per thumb, e.g. `"20 €"`. Also used as tooltip text. */
  getAriaValueText?: (value: number, index: number) => string;
  name?: string;
}

const trackVariants = cva("relative grow overflow-hidden rounded-full bg-control-track", {
  variants: { size: { s: "h-0.5", m: "h-1", l: "h-1" } },
});
const thumbVariants = cva(
  [
    "group relative block cursor-grab rounded-full border-2 border-primary bg-control-thumb shadow-sm outline-none",
    "transition-transform duration-fast focus-visible:focus-ring active:cursor-grabbing active:scale-110",
    "data-disabled:cursor-default",
  ],
  { variants: { size: { s: "size-3", m: "size-4", l: "size-5" } } },
);

/**
 * Single value or range slider (Radix Slider). Drag a thumb or click the track; Arrow keys step,
 * PageUp/PageDown step by 10%, Home/End jump to min/max. Range thumbs can't cross.
 */
export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(function Slider(
  {
    value,
    defaultValue,
    onChange,
    multiple = false,
    min = 0,
    max = 100,
    step = 1,
    withTooltip = false,
    size = "l",
    getAriaLabel,
    getAriaValueText,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...rest
  },
  ref,
) {
  const [current, setCurrent] = useControllableState<SliderValue>({
    value,
    defaultValue: defaultValue ?? (multiple ? [min, max] : min),
    onChange,
  });
  const values = Array.isArray(current) ? current : [current];

  return (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      step={step}
      minStepsBetweenThumbs={0}
      value={values}
      onValueChange={(next) => setCurrent(multiple ? [next[0] ?? min, next[1] ?? max] : (next[0] ?? min))}
      className={cn(
        "relative flex h-control-m w-full touch-none select-none items-center data-disabled:opacity-(--dt-opacity-disabled)",
        className,
      )}
      {...rest}
    >
      <SliderPrimitive.Track className={trackVariants({ size })}>
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {values.map((v, index) => {
        const text = getAriaValueText?.(v, index);
        return (
          <SliderPrimitive.Thumb
            // biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional (start/end).
            key={index}
            // The thumbs carry role="slider", so the name goes on them rather than the role-less root.
            aria-label={getAriaLabel?.(index) ?? ariaLabel}
            aria-labelledby={getAriaLabel ? undefined : ariaLabelledby}
            aria-valuetext={text}
            className={thumbVariants({ size })}
          >
            {withTooltip && (
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-sm bg-foreground px-1.5 py-0.5 text-caption-1 whitespace-nowrap text-background opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
              >
                {text ?? v}
              </span>
            )}
          </SliderPrimitive.Thumb>
        );
      })}
    </SliderPrimitive.Root>
  );
});
