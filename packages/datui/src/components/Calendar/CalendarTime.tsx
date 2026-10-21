import { isSameDay, setHours, setMinutes } from "date-fns";
import { Button } from "../Button/Button";
import { NativeSelect } from "../NativeSelect/NativeSelect";

export interface CalendarTimeProps {
  value: Date;
  onChange: (value: Date) => void;
  minDateTime?: Date | undefined;
  maxDateTime?: Date | undefined;
  changeHoursLabel: string;
  changeMinutesLabel: string;
  doneButtonShow: boolean;
  doneButtonText: string;
  doneButtonDisabled?: boolean | undefined;
  onDoneButtonClick?: (() => void) | undefined;
}

const pad = (n: number) => String(n).padStart(2, "0");
const HOURS = Array.from({ length: 24 }, (_, h) => h);
const MINUTES = Array.from({ length: 60 }, (_, m) => m);

/** Internal: hour and minute pickers (native selects: type-ahead, Up/Down) plus the "Done" button. */
export function CalendarTime({
  value,
  onChange,
  minDateTime,
  maxDateTime,
  changeHoursLabel,
  changeMinutesLabel,
  doneButtonShow,
  doneButtonText,
  doneButtonDisabled,
  onDoneButtonClick,
}: CalendarTimeProps) {
  // A time is unavailable only when it falls outside min/max on the boundary day itself.
  const outOfRange = (d: Date) =>
    (minDateTime !== undefined && isSameDay(d, minDateTime) && d < minDateTime) ||
    (maxDateTime !== undefined && isSameDay(d, maxDateTime) && d > maxDateTime);
  const hourDisabled = (h: number) =>
    outOfRange(setMinutes(setHours(value, h), 59)) && outOfRange(setMinutes(setHours(value, h), 0));
  return (
    <div className="flex items-center gap-2">
      <NativeSelect
        aria-label={changeHoursLabel}
        value={value.getHours()}
        onChange={(_, v) => onChange(setHours(value, Number(v)))}
        className="w-20"
      >
        {HOURS.map((h) => (
          <option key={h} value={h} disabled={hourDisabled(h)}>
            {pad(h)}
          </option>
        ))}
      </NativeSelect>
      <span aria-hidden>:</span>
      <NativeSelect
        aria-label={changeMinutesLabel}
        value={value.getMinutes()}
        onChange={(_, v) => onChange(setMinutes(value, Number(v)))}
        className="w-20"
      >
        {MINUTES.map((m) => (
          <option key={m} value={m} disabled={outOfRange(setMinutes(value, m))}>
            {pad(m)}
          </option>
        ))}
      </NativeSelect>
      {doneButtonShow && (
        <Button size="m" className="ms-auto" disabled={doneButtonDisabled} onClick={onDoneButtonClick}>
          {doneButtonText}
        </Button>
      )}
    </div>
  );
}
