"use client";

import { Gradient } from "datui";

export default function Example() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Gradient className="h-24 rounded-lg border border-border" />
      <Gradient variant="tint" to="bottom" className="h-24 rounded-lg border border-border" />
      <Gradient variant="overlay" className="flex h-24 items-end rounded-lg p-2 text-white">
        Caption
      </Gradient>
    </div>
  );
}
