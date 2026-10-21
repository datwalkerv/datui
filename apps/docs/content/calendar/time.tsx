"use client";

import { Calendar } from "datui";
import * as React from "react";

export default function Example() {
  const [value, setValue] = React.useState<Date | null>(null);
  const [applied, setApplied] = React.useState<Date | null>(null);
  return (
    <div className="flex flex-col gap-2">
      <Calendar enableTime value={value} onChange={setValue} onDoneButtonClick={() => setApplied(value)} />
      <p className="text-subhead text-muted-foreground">Applied: {applied?.toLocaleString() ?? "—"}</p>
    </div>
  );
}
