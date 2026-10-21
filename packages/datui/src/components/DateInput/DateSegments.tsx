import * as React from "react";
import { setRefs } from "../../internal/formUtils/formUtils";
import { InputLikeDivider } from "../../internal/InputLike/InputLike";
import { NumberInputLike } from "../../internal/NumberInputLike/NumberInputLike";

/** Shared segment editing for DateInput and DateRangeInput (not public). */

export type SegmentKey = "day" | "month" | "year" | "hour" | "minute";
export type Parts = Record<SegmentKey, string>;

export interface SegmentDef {
  key: SegmentKey;
  label: string;
}

const SPEC: Record<SegmentKey, { length: number; min: number; max: number; after: string }> = {
  day: { length: 2, min: 1, max: 31, after: "." },
  month: { length: 2, min: 1, max: 12, after: "." },
  year: { length: 4, min: 1, max: 9999, after: " " },
  hour: { length: 2, min: 0, max: 23, after: ":" },
  minute: { length: 2, min: 0, max: 59, after: "" },
};

export const EMPTY_PARTS: Parts = { day: "", month: "", year: "", hour: "", minute: "" };

const pad = (n: number, len: number) => String(n).padStart(len, "0");

export function partsFromDate(date: Date | null | undefined): Parts {
  if (!date) return EMPTY_PARTS;
  return {
    day: pad(date.getDate(), 2),
    month: pad(date.getMonth() + 1, 2),
    year: pad(date.getFullYear(), 4),
    hour: pad(date.getHours(), 2),
    minute: pad(date.getMinutes(), 2),
  };
}

/** A complete, real calendar date (31.02 is rejected), or null. Time parts are used only with `withTime`. */
export function dateFromParts(parts: Parts, withTime: boolean): Date | null {
  const keys: SegmentKey[] = withTime ? ["day", "month", "year", "hour", "minute"] : ["day", "month", "year"];
  if (keys.some((k) => parts[k].length !== SPEC[k].length)) return null;
  const [d, m, y] = [Number(parts.day), Number(parts.month), Number(parts.year)];
  const date = new Date(y, m - 1, d, withTime ? Number(parts.hour) : 0, withTime ? Number(parts.minute) : 0);
  date.setFullYear(y);
  return date.getDate() === d && date.getMonth() === m - 1 ? date : null;
}

/** Next text for a segment after typing `digit`, and whether it is complete. */
export function typeDigit(key: SegmentKey, current: string, digit: string): { text: string; done: boolean } {
  const { length, max } = SPEC[key];
  let text = current.length >= length ? digit : current + digit;
  if (Number(text) > max) text = digit;
  // A single digit that cannot be extended (e.g. 4 in a month) is complete on its own.
  if (text.length < length && Number(`${text}0`) > max) text = text.padStart(length, "0");
  return { text, done: text.length === length };
}

/** Value after ArrowUp/ArrowDown, wrapping within the segment's range. */
export function stepSegment(key: SegmentKey, current: string, step: 1 | -1): string {
  const { length, min, max } = SPEC[key];
  const n = current === "" ? (step === 1 ? min : max) : Number(current) + step;
  const wrapped = n > max ? min : n < min ? max : n;
  return pad(wrapped, length);
}

export interface DateSegmentsProps {
  segments: SegmentDef[];
  parts: Parts;
  onPartsChange: (parts: Parts) => void;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  /** Called with Arrow/Backspace moves past the first or last segment, so a sibling group can take focus. */
  onLeaveStart?: () => void;
  onLeaveEnd?: () => void;
  firstRef?: React.Ref<HTMLSpanElement>;
  lastRef?: React.Ref<HTMLSpanElement>;
}

/** Row of spinbutton segments with auto-advance, Left/Right moves, Up/Down stepping and Backspace/Delete. */
export function DateSegments({
  segments,
  parts,
  onPartsChange,
  disabled,
  readOnly,
  onLeaveStart,
  onLeaveEnd,
  firstRef,
  lastRef,
}: DateSegmentsProps) {
  const refs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const focusAt = (i: number) => {
    if (i < 0) onLeaveStart?.();
    else if (i >= segments.length) onLeaveEnd?.();
    else refs.current[i]?.focus();
  };

  const onKeyDown = (i: number, key: SegmentKey) => (e: React.KeyboardEvent<HTMLSpanElement>) => {
    const current = parts[key];
    const set = (text: string) => onPartsChange({ ...parts, [key]: text });
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      const { text, done } = typeDigit(key, current, e.key);
      set(text);
      if (done) focusAt(i + 1);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      if (current) set(current.slice(0, -1));
      else focusAt(i - 1);
    } else if (e.key === "Delete") {
      e.preventDefault();
      set("");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusAt(i - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusAt(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      set(stepSegment(key, current, e.key === "ArrowUp" ? 1 : -1));
    }
  };

  return (
    <>
      {segments.map((seg, i) => {
        const spec = SPEC[seg.key];
        const last = i === segments.length - 1;
        return (
          <React.Fragment key={seg.key}>
            <NumberInputLike
              ref={(node) => {
                refs.current[i] = node;
                setRefs(node, i === 0 ? firstRef : undefined, last ? lastRef : undefined);
              }}
              index={i}
              length={spec.length}
              value={parts[seg.key]}
              minValue={spec.min}
              maxValue={spec.max}
              label={seg.label}
              disabled={disabled}
              readOnly={readOnly}
              onKeyDown={onKeyDown(i, seg.key)}
            />
            {!last && <InputLikeDivider>{spec.after === " " ? " " : spec.after}</InputLikeDivider>}
          </React.Fragment>
        );
      })}
    </>
  );
}

/**
 * Segment texts kept in sync with a Date value. Typing emits a Date once the segments form a valid one, and
 * `null` when they stop doing so; outside value changes rewrite the segments.
 */
export function useSegmentParts(value: Date | null, withTime: boolean, emit: (date: Date | null) => void) {
  const [parts, setParts] = React.useState(() => partsFromDate(value));
  const time = value?.getTime() ?? null;
  const last = React.useRef(time);
  React.useEffect(() => {
    if (time === last.current) return;
    last.current = time;
    setParts(partsFromDate(time === null ? null : new Date(time)));
  }, [time]);
  const change = (next: Parts) => {
    setParts(next);
    const date = dateFromParts(next, withTime);
    const t = date?.getTime() ?? null;
    if (t === last.current) return;
    last.current = t;
    emit(date);
  };
  return [parts, change] as const;
}
