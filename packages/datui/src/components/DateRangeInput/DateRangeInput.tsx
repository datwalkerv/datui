import { isBefore } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";
import { FormFieldClearButton } from "../../internal/FormFieldClearButton/FormFieldClearButton";
import { InputLikeDivider } from "../../internal/InputLike/InputLike";
import { type Placement, toSideAlign } from "../../internal/Popper/placement";
import { usePortalContainer } from "../../lib/portal";
import { CalendarRange, type CalendarRangeProps, type CalendarRangeValue } from "../CalendarRange/CalendarRange";
import { DateSegments, EMPTY_PARTS, type SegmentDef, useSegmentParts } from "../DateInput/DateSegments";
import { FormField, type FormFieldProps } from "../FormField/FormField";
import { useFormItemControl } from "../FormItem/FormItemContext";
import { IconButton } from "../IconButton/IconButton";

export interface DateRangeInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    Pick<FormFieldProps, "status" | "before" | "after">,
    Pick<
      CalendarRangeProps,
      | "disablePast"
      | "disableFuture"
      | "shouldDisableDate"
      | "weekStartsOn"
      | "prevMonthLabel"
      | "nextMonthLabel"
      | "changeMonthLabel"
      | "changeYearLabel"
    > {
  value?: CalendarRangeValue | null;
  defaultValue?: CalendarRangeValue | null;
  /** Called with `[start, end]` (either may be `null`); a typed end before the start is swapped. */
  onChange?: (value: CalendarRangeValue) => void;
  /** Close the calendar once both ends are picked. @default true */
  closeOnChange?: boolean;
  /** @default false */
  disableCalendar?: boolean;
  /** @default "bottom-start" */
  calendarPlacement?: Placement;
  onCalendarOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
  /** Form field name; hidden inputs submit `<name>[start]` and `<name>[end]` ISO strings. */
  name?: string;
  /** @default "Start day" */
  changeStartDayLabel?: string;
  /** @default "Start month" */
  changeStartMonthLabel?: string;
  /** @default "Start year" */
  changeStartYearLabel?: string;
  /** @default "End day" */
  changeEndDayLabel?: string;
  /** @default "End month" */
  changeEndMonthLabel?: string;
  /** @default "End year" */
  changeEndYearLabel?: string;
  /** @default "Clear" */
  clearFieldLabel?: string;
  /** @default "Show calendar" */
  showCalendarLabel?: string;
  /** @default "Calendar" */
  calendarLabel?: string;
}

/**
 * Segmented start – end date field (DD.MM.YYYY – DD.MM.YYYY) with a range calendar popover.
 * Keys work as in DateInput; Left/Right and Backspace cross between the two ends.
 */
export const DateRangeInput = React.forwardRef<HTMLDivElement, DateRangeInputProps>(function DateRangeInput(
  {
    value: valueProp,
    defaultValue = null,
    onChange,
    closeOnChange = true,
    disableCalendar = false,
    calendarPlacement = "bottom-start",
    onCalendarOpenChange,
    disabled,
    readOnly,
    name,
    status: statusProp,
    before,
    after,
    changeStartDayLabel = "Start day",
    changeStartMonthLabel = "Start month",
    changeStartYearLabel = "Start year",
    changeEndDayLabel = "End day",
    changeEndMonthLabel = "End month",
    changeEndYearLabel = "End year",
    clearFieldLabel = "Clear",
    showCalendarLabel = "Show calendar",
    calendarLabel = "Calendar",
    disablePast,
    disableFuture,
    shouldDisableDate,
    weekStartsOn,
    prevMonthLabel,
    nextMonthLabel,
    changeMonthLabel,
    changeYearLabel,
    className,
    style,
    ...rest
  },
  ref,
) {
  const { status, control } = useFormItemControl({ ...rest, status: statusProp });
  const container = usePortalContainer();
  const [inner, setInner] = React.useState<CalendarRangeValue | null>(defaultValue);
  const value = valueProp !== undefined ? valueProp : inner;
  const [start, end] = value ?? [null, null];
  const valueRef = React.useRef<CalendarRangeValue>([start, end]);
  valueRef.current = [start, end];

  const setValue = (next: CalendarRangeValue) => {
    const [a, b] = next;
    const ordered: CalendarRangeValue = a && b && isBefore(b, a) ? [b, a] : next;
    valueRef.current = ordered;
    if (valueProp === undefined) setInner(ordered);
    onChange?.(ordered);
  };
  const [startParts, setStartParts] = useSegmentParts(start, false, (d) => setValue([d, valueRef.current[1]]));
  const [endParts, setEndParts] = useSegmentParts(end, false, (d) => setValue([valueRef.current[0], d]));

  const startLast = React.useRef<HTMLSpanElement>(null);
  const endFirst = React.useRef<HTMLSpanElement>(null);
  const startFirst = React.useRef<HTMLSpanElement>(null);

  const [open, setOpenState] = React.useState(false);
  const setOpen = (next: boolean) => {
    setOpenState(next);
    onCalendarOpenChange?.(next);
  };

  const startSegments: SegmentDef[] = [
    { key: "day", label: changeStartDayLabel },
    { key: "month", label: changeStartMonthLabel },
    { key: "year", label: changeStartYearLabel },
  ];
  const endSegments: SegmentDef[] = [
    { key: "day", label: changeEndDayLabel },
    { key: "month", label: changeEndMonthLabel },
    { key: "year", label: changeEndYearLabel },
  ];
  const editable = !disabled && !readOnly;
  const hasText = [...Object.values(startParts), ...Object.values(endParts)].some(Boolean);
  const { side, align } = toSideAlign(calendarPlacement);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen} modal>
      <PopoverPrimitive.Anchor asChild>
        <FormField
          status={status}
          before={before}
          disabled={disabled}
          className={className}
          style={style}
          after={
            <>
              {editable && hasText && (
                <FormFieldClearButton
                  label={clearFieldLabel}
                  onClick={() => {
                    setStartParts(EMPTY_PARTS);
                    setEndParts(EMPTY_PARTS);
                    startFirst.current?.focus();
                  }}
                />
              )}
              {!disableCalendar && (
                <PopoverPrimitive.Trigger asChild disabled={!editable}>
                  <IconButton size="s" label={showCalendarLabel} disabled={!editable}>
                    <CalendarDays />
                  </IconButton>
                </PopoverPrimitive.Trigger>
              )}
              {after}
            </>
          }
        >
          {/* biome-ignore lint/a11y/useSemanticElements: a fieldset's legend and box quirks do not fit inside the FormField shell. */}
          <div
            ref={ref}
            role="group"
            id={control.id}
            aria-describedby={control["aria-describedby"]}
            aria-invalid={control["aria-invalid"]}
            aria-disabled={disabled || undefined}
            className="flex min-w-0 flex-1 items-center ps-3 text-body"
            {...rest}
          >
            <DateSegments
              segments={startSegments}
              parts={startParts}
              onPartsChange={setStartParts}
              disabled={disabled}
              readOnly={readOnly}
              firstRef={startFirst}
              lastRef={startLast}
              onLeaveEnd={() => endFirst.current?.focus()}
            />
            <InputLikeDivider className="px-1">–</InputLikeDivider>
            <DateSegments
              segments={endSegments}
              parts={endParts}
              onPartsChange={setEndParts}
              disabled={disabled}
              readOnly={readOnly}
              firstRef={endFirst}
              onLeaveStart={() => startLast.current?.focus()}
            />
          </div>
          {name && (
            <>
              <input type="hidden" name={`${name}[start]`} value={start ? start.toISOString() : ""} />
              <input type="hidden" name={`${name}[end]`} value={end ? end.toISOString() : ""} />
            </>
          )}
        </FormField>
      </PopoverPrimitive.Anchor>
      <PopoverPrimitive.Portal container={container}>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={4}
          collisionPadding={8}
          aria-label={calendarLabel}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="z-popover rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-md"
        >
          <CalendarRange
            autoFocus
            value={value}
            onChange={(next) => {
              setValue(next);
              if (closeOnChange && next[0] && next[1]) setOpen(false);
            }}
            disablePast={disablePast}
            disableFuture={disableFuture}
            shouldDisableDate={shouldDisableDate}
            weekStartsOn={weekStartsOn}
            prevMonthLabel={prevMonthLabel}
            nextMonthLabel={nextMonthLabel}
            changeMonthLabel={changeMonthLabel}
            changeYearLabel={changeYearLabel}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});
