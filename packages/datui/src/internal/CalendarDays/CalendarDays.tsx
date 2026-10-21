import { endOfDay, startOfDay, startOfMonth } from "date-fns";
import * as React from "react";
import {
  type DayButtonProps,
  type DayPickerProps,
  type Matcher,
  type MonthCaptionProps,
  useDayPicker,
} from "react-day-picker";
import { CalendarHeader, type CalendarHeaderProps } from "../../components/CalendarHeader/CalendarHeader";
import { useLocale } from "../../components/LocaleProvider/LocaleProvider";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";

/** Header labels and icons shared by Calendar and CalendarRange. */
export type CalendarHeaderLabels = Pick<
  CalendarHeaderProps,
  "prevMonthLabel" | "nextMonthLabel" | "changeMonthLabel" | "changeYearLabel" | "prevMonthIcon" | "nextMonthIcon"
>;

export interface CalendarDaysOptions extends CalendarHeaderLabels {
  viewDate?: Date | undefined;
  defaultViewDate: Date;
  onViewDateChange?: ((viewDate: Date) => void) | undefined;
  disablePast?: boolean | undefined;
  disableFuture?: boolean | undefined;
  shouldDisableDate?: ((date: Date) => boolean) | undefined;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  disablePickers?: boolean | undefined;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  showNeighboringMonth?: boolean | undefined;
  size?: "s" | "m" | undefined;
  renderDayContent?: ((date: Date) => React.ReactNode) | undefined;
}

type HeaderContextValue = CalendarHeaderLabels & { disablePickers: boolean; startMonth?: Date; endMonth?: Date };
const HeaderContext = React.createContext<HeaderContextValue>({ disablePickers: false });
const DayContentContext = React.createContext<((date: Date) => React.ReactNode) | undefined>(undefined);

/** Month caption replaced by CalendarHeader; with several months only the outer arrows show. */
function Caption({ calendarMonth, displayIndex, className }: MonthCaptionProps) {
  const { goToMonth, previousMonth, nextMonth, months } = useDayPicker();
  const { disablePickers, ...labels } = React.useContext(HeaderContext);
  const multi = months.length > 1;
  return (
    <CalendarHeader
      className={className}
      viewDate={calendarMonth.date}
      // With several months the caption of month N shows N months after the shared view month.
      onChange={(date) =>
        goToMonth(multi ? startOfMonth(new Date(date.getFullYear(), date.getMonth() - displayIndex)) : date)
      }
      onPrevMonth={() => previousMonth && goToMonth(previousMonth)}
      onNextMonth={() => nextMonth && goToMonth(nextMonth)}
      prevMonthHidden={displayIndex > 0}
      nextMonthHidden={displayIndex < months.length - 1}
      prevMonthDisabled={!previousMonth}
      nextMonthDisabled={!nextMonth}
      disablePickers={disablePickers || multi}
      {...labels}
    />
  );
}

/** Day button: full localized date as name, `aria-current="date"` for today, optional custom content. */
function DayButton({ day, modifiers, children, className, ...rest }: DayButtonProps) {
  const render = React.useContext(DayContentContext);
  const ref = React.useRef<HTMLButtonElement>(null);
  // The grid manages roving focus; move DOM focus along with it.
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return (
    <button ref={ref} className={className} aria-current={modifiers.today ? "date" : undefined} {...rest}>
      {render ? render(day.date) : children}
    </button>
  );
}

const dayCell = {
  s: "size-calendar-day-s text-subhead",
  m: "size-calendar-day-m text-body",
};

/**
 * Internal grid part of Calendar / CalendarRange (weekday header + day cells, the inventory's CalendarDays and
 * CalendarDay). Returns DayPicker props shared by both: datui styling, CalendarHeader caption, Intl-localized
 * labels from `useLocale()`, disabled-date matchers and the controllable view month.
 */
export function useCalendarDays(options: CalendarDaysOptions) {
  const locale = useLocale();
  const {
    disablePast,
    disableFuture,
    shouldDisableDate,
    minDate,
    maxDate,
    disablePickers = false,
    weekStartsOn = 1,
    showNeighboringMonth = false,
    size = "m",
    renderDayContent,
    prevMonthLabel,
    nextMonthLabel,
    changeMonthLabel,
    changeYearLabel,
    prevMonthIcon,
    nextMonthIcon,
  } = options;

  const [viewDate, setViewDate] = useControllableState({
    value: options.viewDate,
    defaultValue: options.defaultViewDate,
    onChange: options.onViewDateChange,
  });

  const today = startOfDay(new Date());
  const lower = [disablePast ? today : undefined, minDate ? startOfDay(minDate) : undefined]
    .filter((d): d is Date => d !== undefined)
    .sort((a, b) => b.getTime() - a.getTime())[0];
  const upper = [disableFuture ? endOfDay(today) : undefined, maxDate ? endOfDay(maxDate) : undefined]
    .filter((d): d is Date => d !== undefined)
    .sort((a, b) => a.getTime() - b.getTime())[0];
  const disabled: Matcher[] = [];
  if (lower) disabled.push({ before: lower });
  if (upper) disabled.push({ after: upper });
  if (shouldDisableDate) disabled.push(shouldDisableDate);

  const headerValue: HeaderContextValue = {
    disablePickers,
    ...(lower ? { startMonth: lower } : {}),
    ...(upper ? { endMonth: upper } : {}),
    prevMonthLabel,
    nextMonthLabel,
    changeMonthLabel,
    changeYearLabel,
    prevMonthIcon,
    nextMonthIcon,
  };

  const fmt = React.useMemo(
    () => ({
      full: new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
      monthYear: new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
      weekdayShort: new Intl.DateTimeFormat(locale, { weekday: "short" }),
      weekdayLong: new Intl.DateTimeFormat(locale, { weekday: "long" }),
    }),
    [locale],
  );

  const dayPickerProps = {
    lang: locale,
    month: viewDate,
    onMonthChange: setViewDate,
    weekStartsOn,
    showOutsideDays: showNeighboringMonth,
    hideNavigation: true,
    disabled,
    ...(lower ? { startMonth: lower } : {}),
    ...(upper ? { endMonth: upper } : {}),
    components: { MonthCaption: Caption, DayButton },
    formatters: {
      formatWeekdayName: (d: Date) => fmt.weekdayShort.format(d),
      formatCaption: (d: Date) => fmt.monthYear.format(d),
    },
    labels: {
      labelDayButton: (d: Date) => fmt.full.format(d),
      labelGrid: (d: Date) => fmt.monthYear.format(d),
      labelWeekday: (d: Date) => fmt.weekdayLong.format(d),
    },
    classNames: {
      root: "inline-block text-foreground",
      months: "flex flex-wrap gap-4",
      month: "flex flex-col gap-2",
      month_caption: "",
      month_grid: "border-collapse",
      weekdays: "",
      weekday: cn(
        "p-0 text-center font-normal text-muted-foreground capitalize",
        size === "s" ? "text-caption-1" : "text-footnote",
      ),
      weeks: "",
      week: "",
      day: "p-0 text-center",
      day_button: cn(
        dayCell[size],
        "inline-flex cursor-pointer items-center justify-center rounded-md outline-none transition-colors duration-fast",
        "hover:bg-accent focus-visible:focus-ring disabled:cursor-default disabled:opacity-(--dt-opacity-disabled) disabled:hover:bg-transparent",
      ),
      footer: "sr-only",
    },
    modifiersClassNames: {
      today: "[&>button]:font-semibold [&>button]:text-primary",
      selected: "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary-hover",
      range_middle:
        "bg-secondary [&>button]:bg-transparent [&>button]:text-secondary-foreground [&>button]:hover:bg-accent",
      range_start: "rounded-s-md bg-secondary",
      range_end: "rounded-e-md bg-secondary",
      outside: "[&>button]:text-muted-foreground",
      hint: "bg-accent",
      hint_start: "rounded-s-md",
      hint_end: "rounded-e-md",
    },
  } satisfies Partial<DayPickerProps>;

  const wrap = (node: React.ReactNode) => (
    <HeaderContext.Provider value={headerValue}>
      <DayContentContext.Provider value={renderDayContent}>{node}</DayContentContext.Provider>
    </HeaderContext.Provider>
  );

  return { dayPickerProps, viewDate, setViewDate, wrap, fmt, lower, upper };
}
