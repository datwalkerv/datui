"use client";

import { HorizontalScroll } from "datui";

export default function Example() {
  return (
    <HorizontalScroll
      showArrows="always"
      arrowSize="s"
      scrollOnAnyWheel
      getScrollToNext={(pos) => pos + 120}
      getScrollToPrev={(pos) => pos - 120}
      contentClassName="gap-3"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static demo list.
          key={i}
          className="flex size-control-l shrink-0 items-center justify-center rounded-lg bg-muted text-footnote text-muted-foreground"
        >
          {i + 1}
        </div>
      ))}
    </HorizontalScroll>
  );
}
