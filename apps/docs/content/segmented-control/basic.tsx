"use client";

import { SegmentedControl } from "datui";
import { useState } from "react";

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export default function Example() {
  const [range, setRange] = useState<string | number>("week");
  return (
    <div className="grid max-w-md gap-3">
      <SegmentedControl aria-label="Range" options={options} value={range} onChange={setRange} />
      <SegmentedControl aria-label="Small range" size="m" options={options} />
    </div>
  );
}
