"use client";

import { Gallery } from "datui";

export default function Example() {
  return (
    <Gallery aria-label="Products" slideWidth="70%" align="center" looped showArrows="always" arrowSize="s">
      {Array.from({ length: 6 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static demo list.
        <div key={i} className="px-1">
          <div className="flex h-36 items-center justify-center rounded-lg bg-secondary text-headline-1 text-secondary-foreground">
            Product {i + 1}
          </div>
        </div>
      ))}
    </Gallery>
  );
}
