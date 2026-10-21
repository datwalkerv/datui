"use client";

import { CalendarRange, type CalendarRangeValue } from "datui";
import * as React from "react";

export default function Example() {
  const [range, setRange] = React.useState<CalendarRangeValue | null>(null);
  const [start, end] = range ?? [null, null];
  return (
    <div className="flex flex-col gap-2">
      <CalendarRange value={range} onChange={setRange} />
      <p className="text-subhead text-muted-foreground">
        {start ? start.toDateString() : "Pick a start"} – {end ? end.toDateString() : "pick an end"}
      </p>
    </div>
  );
}
