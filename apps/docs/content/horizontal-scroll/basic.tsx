"use client";

import { HorizontalScroll } from "datui";

export default function Example() {
  return (
    <HorizontalScroll contentClassName="gap-2 py-1">
      {Array.from({ length: 16 }, (_, i) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: static demo list.
          key={i}
          type="button"
          className="h-control-m shrink-0 rounded-full bg-secondary px-4 text-subhead text-secondary-foreground focus-visible:focus-ring"
        >
          Topic {i + 1}
        </button>
      ))}
    </HorizontalScroll>
  );
}
