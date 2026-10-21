import { isAfter, isBefore, startOfMonth } from "date-fns";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { type CalendarHeaderLabels, useCalendarDays } from "../../internal/CalendarDays/CalendarDays";
import { cn } from "../../lib/utils";
import { CalendarTime } from "./CalendarTime";

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    CalendarHeaderLabels {
  value?: Date | null;
  defaultValue?: Date | null;
  /** Called with the picked date (keeping the current time of day). */
  onChange?: (value: Date) => void;
  /** Month shown. Controlled with `onViewDateChange`. */
  viewDate?: Date;
  /** @default the value's month, else the current month */
  defaultViewDate?: Date;
  onViewDateChange?: (viewDate: Date) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
  shouldDisableDate?: (date: Date) => boolean;
  /** Earliest selectable moment; also limits the time pickers on that day. */
  minDateTime?: Date;
  /** Latest selectable moment; also limits the time pickers on that day. */
  maxDateTime?: Date;
  /** Adds hour and minute pickers (not available at size `s`). @default false */
  enableTime?: boolean;
  /** Plain month title instead of month/year pickers. @default false */
  disablePickers?: boolean;
  /** First day of the week, 0 = Sunday. @default 1 */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Show the leading/trailing days of neighbouring months. @default false */
  showNeighboringMonth?: boolean;
  /** @default "m" */
  size?: "s" | "m";
  /** Custom content inside each day button. */
  renderDayContent?: (date: Date) => React.ReactNode;
  /** Move focus into the grid (selected day, else today) on mount. @default false */
  autoFocus?: boolean;
  /** @default "Done" */
  doneButtonText?: string;
  /** Show the Done button under the time pickers. @default true */
  doneButtonShow?: boolean;
  doneButtonDisabled?: boolean;
  onDoneButtonClick?: () => void;
  /** @default "Hours" */
  changeHoursLabel?: string;
  /** @default "Minutes" */
  changeMinutesLabel?: string;
}

/**
 * Month grid date picker (react-day-picker): month/year pickers, min/max and custom disabled dates,
 * localized through `LocaleProvider`, optional time. Arrow keys move by day (crossing months), PageUp/PageDown
 * by month, Home/End to week edges, Enter/Space select.
 */
export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
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
    minDateTime,
    maxDateTime,
    enableTime = false,
    disablePickers,
    weekStartsOn,
    showNeighboringMonth,
    size = "m",
    renderDayContent,
    autoFocus = false,
    doneButtonText = "Done",
    doneButtonShow = true,
    doneButtonDisabled,
    onDoneButtonClick,
    changeHoursLabel = "Hours",
    changeMinutesLabel = "Minutes",
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
  const [inner, setInner] = React.useState<Date | null>(defaultValue);
  const value = valueProp !== undefined ? valueProp : inner;
  const { dayPickerProps, wrap } = useCalendarDays({
    viewDate,
    defaultViewDate: startOfMonth(defaultViewDate ?? value ?? new Date()),
    onViewDateChange,
    disablePast,
    disableFuture,
    shouldDisableDate,
    minDate: minDateTime,
    maxDate: maxDateTime,
    disablePickers,
    weekStartsOn,
    showNeighboringMonth,
    size,
    renderDayContent,
    prevMonthLabel,
    nextMonthLabel,
    changeMonthLabel,
    changeYearLabel,
    prevMonthIcon,
    nextMonthIcon,
  });

  const clamp = (d: Date) => {
    if (minDateTime && isBefore(d, minDateTime)) return new Date(minDateTime);
    if (maxDateTime && isAfter(d, maxDateTime)) return new Date(maxDateTime);
    return d;
  };
  const commit = (next: Date) => {
    const clamped = clamp(next);
    if (valueProp === undefined) setInner(clamped);
    onChange?.(clamped);
  };

  return (
    <div ref={ref} className={cn("inline-flex flex-col gap-3", className)} {...rest}>
      {wrap(
        <DayPicker
          {...dayPickerProps}
          mode="single"
          required
          autoFocus={autoFocus}
          selected={value ?? undefined}
          onSelect={(date: Date) => {
            const next = new Date(date);
            // Keep the time of day when picking another date.
            if (value) next.setHours(value.getHours(), value.getMinutes(), value.getSeconds(), 0);
            commit(next);
          }}
        />,
      )}
      {enableTime && size !== "s" && (
        <CalendarTime
          value={value ?? new Date(new Date().setSeconds(0, 0))}
          onChange={commit}
          minDateTime={minDateTime}
          maxDateTime={maxDateTime}
          changeHoursLabel={changeHoursLabel}
          changeMinutesLabel={changeMinutesLabel}
          doneButtonShow={doneButtonShow}
          doneButtonText={doneButtonText}
          doneButtonDisabled={doneButtonDisabled}
          onDoneButtonClick={onDoneButtonClick}
        />
      )}
    </div>
  );
});
