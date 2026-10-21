"use client";

import { CardScroll } from "datui";

export default function Example() {
  return (
    <div className="rounded-xl bg-background-secondary py-3">
      <CardScroll padding size="m">
        {Array.from({ length: 8 }, (_, i) => (
          <a
            // biome-ignore lint/suspicious/noArrayIndexKey: static demo list.
            key={i}
            href={`#item-${i + 1}`}
            className="flex h-32 flex-col justify-end rounded-lg bg-card p-3 text-card-foreground no-underline shadow-sm focus-visible:focus-ring"
          >
            <span className="text-headline-2">Item {i + 1}</span>
            <span className="text-footnote text-muted-foreground">Tab to reach each card</span>
          </a>
        ))}
      </CardScroll>
    </div>
  );
}
