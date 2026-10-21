"use client";

import { Progress } from "datui";
import { useState } from "react";

export default function Example() {
  const [value, setValue] = useState(40);
  return (
    <div className="grid gap-4">
      <Progress value={value} aria-label="Upload progress" />
      <Progress value={70} appearance="positive" height={8} aria-label="Storage" />
      <Progress value={25} appearance="negative" noTrack aria-label="Battery" />
      <Progress value={50} appearance="#9b51e0" aria-label="Custom" />
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label="Value"
      />
    </div>
  );
}
