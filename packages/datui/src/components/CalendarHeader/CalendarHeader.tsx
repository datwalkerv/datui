import { addMonths, getMonth, getYear, setMonth, setYear, startOfMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { IconButton } from "../IconButton/IconButton";
import { useLocale } from "../LocaleProvider/LocaleProvider";

export interface CalendarHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Month shown (any day of it). */
  viewDate: Date;
  /** Called with the first day of the newly chosen month. */
  onChange: (viewDate: Date) => void;
  /** Overrides the previous-arrow action (default: one month back via `onChange`). */
  onPrevMonth?: () => void;
  /** Overrides the next-arrow action (default: one month forward via `onChange`). */
  onNextMonth?: () => void;
  prevMonthHidden?: boolean;
  nextMonthHidden?: boolean;
  prevMonthDisabled?: boolean;
  nextMonthDisabled?: boolean;
  /** Show a plain "Month Year" title instead of month and year pickers. @default false */
  disablePickers?: boolean;
  /** Earliest month offered by the pickers. @default 100 years before `viewDate` */
  startMonth?: Date;
  /** Latest month offered by the pickers. @default 20 years after `viewDate` */
  endMonth?: Date;
  prevMonthIcon?: React.ReactNode;
  nextMonthIcon?: React.ReactNode;
  /** @default "Previous month" */
  prevMonthLabel?: string;
  /** @default "Next month" */
  nextMonthLabel?: string;
  /** @default "Month" */
  changeMonthLabel?: string;
  /** @default "Year" */
  changeYearLabel?: string;
}

const pickerClass =
  "cursor-pointer appearance-none rounded-sm bg-transparent px-1 text-headline-1 font-medium text-foreground outline-none hover:bg-accent focus-visible:focus-ring";

/**
 * Month navigation bar: previous/next arrows and month + year pickers (native selects, localized through
 * `LocaleProvider`). Used inside Calendar and CalendarRange; usable on its own.
 */
export const CalendarHeader = React.forwardRef<HTMLDivElement, CalendarHeaderProps>(function CalendarHeader(
  {
    viewDate,
    onChange,
    onPrevMonth,
    onNextMonth,
    prevMonthHidden = false,
    nextMonthHidden = false,
    prevMonthDisabled = false,
    nextMonthDisabled = false,
    disablePickers = false,
    startMonth,
    endMonth,
    prevMonthIcon = <ChevronLeft />,
    nextMonthIcon = <ChevronRight />,
    prevMonthLabel = "Previous month",
    nextMonthLabel = "Next month",
    changeMonthLabel = "Month",
    changeYearLabel = "Year",
    className,
    ...rest
  },
  ref,
) {
  const locale = useLocale();
  const month = getMonth(viewDate);
  const year = getYear(viewDate);
  const monthNames = React.useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { month: "long" });
    return Array.from({ length: 12 }, (_, m) => fmt.format(new Date(2000, m, 1)));
  }, [locale]);
  const minYear = startMonth ? getYear(startMonth) : year - 100;
  const maxYear = endMonth ? getYear(endMonth) : year + 20;
  const monthOutOfRange = (m: number) =>
    (startMonth !== undefined && year === minYear && m < getMonth(startMonth)) ||
    (endMonth !== undefined && year === maxYear && m > getMonth(endMonth));
  const go = (date: Date) => onChange(startOfMonth(date));

  const arrow = (hidden: boolean, disabled: boolean, label: string, icon: React.ReactNode, onClick: () => void) =>
    hidden ? (
      <span aria-hidden className="size-control-m" />
    ) : (
      <IconButton size="s" label={label} disabled={disabled} onClick={onClick}>
        {icon}
      </IconButton>
    );

  return (
    <div ref={ref} className={cn("flex items-center justify-between gap-1", className)} {...rest}>
      {arrow(
        prevMonthHidden,
        prevMonthDisabled,
        prevMonthLabel,
        prevMonthIcon,
        onPrevMonth ?? (() => go(addMonths(viewDate, -1))),
      )}
      {disablePickers ? (
        <span className="text-headline-1 font-medium capitalize">
          {new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(viewDate)}
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <select
            aria-label={changeMonthLabel}
            className={cn(pickerClass, "capitalize")}
            value={month}
            onChange={(e) => go(setMonth(viewDate, Number(e.target.value)))}
          >
            {monthNames.map((name, m) => (
              <option key={name} value={m} disabled={monthOutOfRange(m)}>
                {name}
              </option>
            ))}
          </select>
          <select
            aria-label={changeYearLabel}
            className={pickerClass}
            value={year}
            onChange={(e) => go(setYear(viewDate, Number(e.target.value)))}
          >
            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </span>
      )}
      {arrow(
        nextMonthHidden,
        nextMonthDisabled,
        nextMonthLabel,
        nextMonthIcon,
        onNextMonth ?? (() => go(addMonths(viewDate, 1))),
      )}
    </div>
  );
});
