"use client";

import { SimpleGrid } from "datui";

export default function Example() {
  return (
    <SimpleGrid minColWidth={140} gap={["m", "s"]}>
      {Array.from({ length: 8 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static demo cells
        <div key={i} className="rounded-md bg-secondary p-4 text-center">
          Item {i + 1}
        </div>
      ))}
    </SimpleGrid>
  );
}
