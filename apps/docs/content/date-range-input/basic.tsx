"use client";

import { type CalendarRangeValue, DateRangeInput, FormItem } from "datui";
import * as React from "react";

export default function Example() {
  const [range, setRange] = React.useState<CalendarRangeValue | null>(null);
  const nights = range?.[0] && range[1] ? Math.round((range[1].getTime() - range[0].getTime()) / 86_400_000) : null;
  return (
    <div className="max-w-sm">
      <FormItem top="Stay" topId="stay-label" bottom={nights === null ? "Check-in – check-out" : `${nights} night(s)`}>
        <DateRangeInput aria-labelledby="stay-label" value={range} onChange={setRange} disablePast />
      </FormItem>
    </div>
  );
}
