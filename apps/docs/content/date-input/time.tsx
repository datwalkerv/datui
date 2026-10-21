"use client";

import { DateInput } from "datui";

export default function Example() {
  return (
    <div className="max-w-xs">
      <DateInput aria-label="Meeting" enableTime defaultValue={new Date()} disablePast />
    </div>
  );
}
