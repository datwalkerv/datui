"use client";

import { AspectRatio } from "datui";

export default function Example() {
  return (
    <div className="grid max-w-md grid-cols-2 gap-3">
      <AspectRatio ratio={16 / 9} className="rounded-lg">
        <div className="flex items-center justify-center bg-linear-to-br from-primary to-positive text-primary-foreground">
          16 / 9
        </div>
      </AspectRatio>
      <AspectRatio ratio="1 / 1" className="rounded-lg bg-muted" mode="none">
        <span className="p-2 text-footnote">Square, children not stretched</span>
      </AspectRatio>
    </div>
  );
}
