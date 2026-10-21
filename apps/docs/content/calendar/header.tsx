"use client";

import { CalendarHeader } from "datui";
import * as React from "react";

export default function Example() {
  const [view, setView] = React.useState(() => new Date());
  return (
    <div className="max-w-xs">
      <CalendarHeader viewDate={view} onChange={setView} />
    </div>
  );
}
