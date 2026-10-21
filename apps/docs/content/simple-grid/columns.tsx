"use client";

import { SimpleGrid } from "datui";

export default function Example() {
  return (
    <SimpleGrid columns={3} gap="m">
      {Array.from({ length: 6 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static demo cells
        <div key={i} className="rounded-md bg-accent p-4 text-center text-accent-foreground">
          {i + 1}
        </div>
      ))}
    </SimpleGrid>
  );
}
