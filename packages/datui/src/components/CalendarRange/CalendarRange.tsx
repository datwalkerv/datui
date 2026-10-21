import { isAfter, isBefore, isSameDay, startOfDay, startOfMonth } from "date-fns";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { type CalendarHeaderLabels, useCalendarDays } from "../../internal/CalendarDays/CalendarDays";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";

export type CalendarRangeValue = [Date | null, Date | null];

export interface CalendarRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    CalendarHeaderLabels {
  value?: CalendarRangeValue | null;
  defaultValue?: CalendarRangeValue | null;
  /** Called after each click: `[start, null]` after the first, `[start, end]` after the second. */
  onChange?: (value: CalendarRangeValue) => void;
  viewDate?: Date;
  /** @default the start's month, else the current month */
  defaultViewDate?: Date;
  onViewDateChange?: (viewDate: Date) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
  shouldDisableDate?: (date: Date) => boolean;
  /** Plain month titles instead of pickers (pickers only show with a single month). @default false */
  disablePickers?: boolean;
  /** @default 1 */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  renderDayContent?: (date: Date) => React.ReactNode;
  /** Months shown side by side. @default 2 on regular width, 1 on compact width */
  numberOfMonths?: number;
  /** Move focus into the grid on mount. @default false */
  autoFocus?: boolean;
}

/**
 * Range picker: the first click sets the start, the second the end (an earlier day becomes the start).
 * While only the start is chosen, hovering previews the pending range. Two months on wide screens, one on compact.
 */
export const CalendarRange = React.forwardRef<HTMLDivElement, CalendarRangeProps>(function CalendarRange(
  {
    value: valueProp,
    defaultValue = null,
    onChange,
    viewDate,
    defaultViewDate,
    onViewDateChange,
    disablePast,
    disableFuture,
    shouldDisableDate,
    disablePickers,
    weekStartsOn,
    renderDayContent,
    numberOfMonths,
    autoFocus = false,
    prevMonthLabel,
    nextMonthLabel,
    changeMonthLabel,
    changeYearLabel,
    prevMonthIcon,
    nextMonthIcon,
    className,
    ...rest
  },
  ref,
) {
  const { sizeX } = useAdaptivity();
  const [inner, setInner] = React.useState<CalendarRangeValue | null>(defaultValue);
  const value = valueProp !== undefined ? valueProp : inner;
  const [start, end] = value ?? [null, null];
  const [hovered, setHovered] = React.useState<Date | null>(null);

  const { dayPickerProps, wrap, fmt } = useCalendarDays({
    viewDate,
    defaultViewDate: startOfMonth(defaultViewDate ?? start ?? new Date()),
    onViewDateChange,
    disablePast,
    disableFuture,
    shouldDisableDate,
    disablePickers,
    weekStartsOn,
    renderDayContent,
    prevMonthLabel,
    nextMonthLabel,
    changeMonthLabel,
    changeYearLabel,
    prevMonthIcon,
    nextMonthIcon,
  });

  const pick = (day: Date) => {
    const d = startOfDay(day);
    const next: CalendarRangeValue = !start || end ? [d, null] : isBefore(d, start) ? [d, start] : [start, d];
    setHovered(null);
    if (valueProp === undefined) setInner(next);
    onChange?.(next);
  };

  // Pending range preview between the chosen start and the hovered day.
  const hint =
    start && !end && hovered && !isSameDay(start, hovered)
      ? isBefore(hovered, start)
        ? { from: hovered, to: start }
        : { from: start, to: hovered }
      : undefined;
  const inHint = (d: Date) => !!hint && !isBefore(d, hint.from) && !isAfter(d, hint.to);

  return (
    <div ref={ref} className={cn("inline-flex", className)} {...rest}>
      {wrap(
        <DayPicker
          {...dayPickerProps}
          mode="range"
          numberOfMonths={numberOfMonths ?? (sizeX === "regular" ? 2 : 1)}
          autoFocus={autoFocus}
          selected={start ? { from: start, to: end ?? undefined } : undefined}
          onSelect={(_range, triggerDate) => pick(triggerDate)}
          onDayMouseEnter={(date) => setHovered(date)}
          onDayMouseLeave={() => setHovered(null)}
          modifiers={{
            hint: inHint,
            hint_start: (d) => !!hint && isSameDay(d, hint.from),
            hint_end: (d) => !!hint && isSameDay(d, hint.to),
          }}
          footer={start ? `${fmt.full.format(start)} – ${end ? fmt.full.format(end) : "…"}` : undefined}
        />,
      )}
    </div>
  );
});
