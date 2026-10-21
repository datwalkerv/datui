"use client";

import { Chip } from "datui";
import { Tag } from "lucide-react";
import * as React from "react";

export default function Example() {
  const [chips, setChips] = React.useState(["Design", "Research", "Engineering"]);
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <Chip key={c} value={c} onRemove={(_, v) => setChips((list) => list.filter((x) => x !== v))}>
          {c}
        </Chip>
      ))}
      <Chip mode="secondary" before={<Tag aria-hidden />}>
        Secondary
      </Chip>
      <Chip disabled>Disabled</Chip>
      <Chip readOnly>Read-only</Chip>
    </div>
  );
}
