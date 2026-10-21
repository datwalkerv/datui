import { CalendarDays } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";
import { FormFieldClearButton } from "../../internal/FormFieldClearButton/FormFieldClearButton";
import type { Placement } from "../../internal/Popper/placement";
import { toSideAlign } from "../../internal/Popper/placement";
import { usePortalContainer } from "../../lib/portal";
import { cn } from "../../lib/utils";
import { Calendar, type CalendarProps } from "../Calendar/Calendar";
import { FormField, type FormFieldProps } from "../FormField/FormField";
import { useFormItemControl } from "../FormItem/FormItemContext";
import { IconButton } from "../IconButton/IconButton";
import { DateSegments, EMPTY_PARTS, type SegmentDef, useSegmentParts } from "./DateSegments";

type CalendarPassThrough = Pick<
  CalendarProps,
  | "disablePast"
  | "disableFuture"
  | "shouldDisableDate"
  | "minDateTime"
  | "maxDateTime"
  | "weekStartsOn"
  | "size"
  | "doneButtonText"
  | "doneButtonDisabled"
  | "prevMonthLabel"
  | "nextMonthLabel"
  | "changeMonthLabel"
  | "changeYearLabel"
  | "changeHoursLabel"
  | "changeMinutesLabel"
>;

export interface DateInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    Pick<FormFieldProps, "status" | "before" | "after">,
    CalendarPassThrough {
  value?: Date | null;
  defaultValue?: Date | null;
  /** Called with a valid date once the segments form one, or `null` when cleared / incomplete. */
  onChange?: (value: Date | null) => void;
  /** Adds hour and minute segments and time pickers. @default false */
  enableTime?: boolean;
  /** Close the calendar after picking a day (ignored with `enableTime`; the Done button closes then). @default true */
  closeOnChange?: boolean;
  /** Hide the calendar button. @default false */
  disableCalendar?: boolean;
  /** @default "bottom-start" */
  calendarPlacement?: Placement;
  onCalendarOpenChange?: (open: boolean) => void;
  /** Called when the Done button is pressed (with `enableTime`). */
  onApply?: (value: Date | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /** Form field name; a hidden input submits the ISO string. */
  name?: string;
  /** @default "Day" */
  changeDayLabel?: string;
  /** @default "Month" */
  changeMonthSegmentLabel?: string;
  /** @default "Year" */
  changeYearSegmentLabel?: string;
  /** @default "Hours" */
  changeHoursSegmentLabel?: string;
  /** @default "Minutes" */
  changeMinutesSegmentLabel?: string;
  /** @default "Clear" */
  clearFieldLabel?: string;
  /** @default "Show calendar" */
  showCalendarLabel?: string;
  /** Accessible name of the calendar dialog. @default "Calendar" */
  calendarLabel?: string;
}

/**
 * Segmented date (and optional time) field with a calendar popover. Type digits into DD.MM.YYYY (HH:MM) segments
 * (they auto-advance), Left/Right move, Up/Down step, Backspace clears back. The calendar opens in a focus-trapped
 * dialog and returns focus to its button on Escape / outside click. Give it a name with `aria-label` or
 * `aria-labelledby` (a FormItem label cannot point at a group).
 */
export const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(function DateInput(
  {
    value: valueProp,
    defaultValue = null,
    onChange,
    enableTime = false,
    closeOnChange = true,
    disableCalendar = false,
    calendarPlacement = "bottom-start",
    onCalendarOpenChange,
    onApply,
    disabled,
    readOnly,
    required,
    name,
    status: statusProp,
    before,
    after,
    changeDayLabel = "Day",
    changeMonthSegmentLabel = "Month",
    changeYearSegmentLabel = "Year",
    changeHoursSegmentLabel = "Hours",
    changeMinutesSegmentLabel = "Minutes",
    clearFieldLabel = "Clear",
    showCalendarLabel = "Show calendar",
    calendarLabel = "Calendar",
    disablePast,
    disableFuture,
    shouldDisableDate,
    minDateTime,
    maxDateTime,
    weekStartsOn,
    size,
    doneButtonText,
    doneButtonDisabled,
    prevMonthLabel,
    nextMonthLabel,
    changeMonthLabel,
    changeYearLabel,
    changeHoursLabel,
    changeMinutesLabel,
    className,
    style,
    ...rest
  },
  ref,
) {
  const { status, control } = useFormItemControl({ ...rest, status: statusProp, required });
  const container = usePortalContainer();
  const [inner, setInner] = React.useState<Date | null>(defaultValue);
  const value = valueProp !== undefined ? valueProp : inner;
  const setValue = (next: Date | null) => {
    if (valueProp === undefined) setInner(next);
    onChange?.(next);
  };
  const [parts, setParts] = useSegmentParts(value, enableTime, setValue);
  const firstSegment = React.useRef<HTMLSpanElement>(null);

  const [open, setOpenState] = React.useState(false);
  const setOpen = (next: boolean) => {
    setOpenState(next);
    onCalendarOpenChange?.(next);
  };

  const segments: SegmentDef[] = [
    { key: "day", label: changeDayLabel },
    { key: "month", label: changeMonthSegmentLabel },
    { key: "year", label: changeYearSegmentLabel },
    ...(enableTime
      ? ([
          { key: "hour", label: changeHoursSegmentLabel },
          { key: "minute", label: changeMinutesSegmentLabel },
        ] satisfies SegmentDef[])
      : []),
  ];
  const editable = !disabled && !readOnly;
  const hasText = Object.values(parts).some(Boolean);
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
                    setParts(EMPTY_PARTS);
                    firstSegment.current?.focus();
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
              segments={segments}
              parts={parts}
              onPartsChange={setParts}
              disabled={disabled}
              readOnly={readOnly}
              firstRef={firstSegment}
            />
          </div>
          {name && <input type="hidden" name={name} value={value ? value.toISOString() : ""} />}
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
          className={cn("z-popover rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-md")}
        >
          <Calendar
            autoFocus
            value={value}
            onChange={(d) => {
              setValue(d);
              if (closeOnChange && !enableTime) setOpen(false);
            }}
            enableTime={enableTime}
            onDoneButtonClick={() => {
              onApply?.(value);
              setOpen(false);
            }}
            disablePast={disablePast}
            disableFuture={disableFuture}
            shouldDisableDate={shouldDisableDate}
            minDateTime={minDateTime}
            maxDateTime={maxDateTime}
            weekStartsOn={weekStartsOn}
            size={size}
            doneButtonText={doneButtonText}
            doneButtonDisabled={doneButtonDisabled}
            prevMonthLabel={prevMonthLabel}
            nextMonthLabel={nextMonthLabel}
            changeMonthLabel={changeMonthLabel}
            changeYearLabel={changeYearLabel}
            changeHoursLabel={changeHoursLabel}
            changeMinutesLabel={changeMinutesLabel}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});
