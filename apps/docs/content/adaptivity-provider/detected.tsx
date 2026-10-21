"use client";

import { Footnote, useAdaptivity } from "datui";

export default function Example() {
  const a = useAdaptivity();
  return (
    <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
      {Object.entries(a).map(([key, value]) => (
        <div key={key} className="contents">
          <dt>
            <Footnote className="font-mono">{key}</Footnote>
          </dt>
          <dd className="m-0">
            <Footnote className="font-mono text-accent-foreground">{String(value)}</Footnote>
          </dd>
        </div>
      ))}
    </dl>
  );
}
