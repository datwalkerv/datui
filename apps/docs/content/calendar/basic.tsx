"use client";

import { Calendar } from "datui";
import * as React from "react";

export default function Example() {
  const [value, setValue] = React.useState<Date | null>(new Date());
  return (
    <div className="flex flex-col gap-2">
      <Calendar value={value} onChange={setValue} />
      <p className="text-subhead text-muted-foreground">Selected: {value?.toDateString() ?? "nothing"}</p>
    </div>
  );
}
