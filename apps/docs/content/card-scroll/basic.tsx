"use client";

import { CardScroll } from "datui";

const sizes = ["s", "m", "l"] as const;

export default function Example() {
  return (
    <div className="grid gap-4">
      {sizes.map((size) => (
        <CardScroll key={size} size={size}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static demo list.
              key={i}
              className="flex h-24 items-end rounded-lg border bg-card p-3 text-subhead text-card-foreground shadow-sm"
            >
              Card {i + 1}
            </div>
          ))}
        </CardScroll>
      ))}
    </div>
  );
}
