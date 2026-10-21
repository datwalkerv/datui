"use client";

import { Skeleton } from "datui";

export default function Example() {
  return (
    <div aria-busy="true" className="flex items-center gap-3">
      <Skeleton width={48} height={48} borderRadius="50%" />
      <div className="grid flex-1 gap-2">
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={12} noAnimation />
        <span className="text-body">
          <Skeleton>Inline text placeholder</Skeleton>
        </span>
      </div>
    </div>
  );
}
