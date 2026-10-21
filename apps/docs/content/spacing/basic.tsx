"use client";

import { Spacing, Text } from "datui";

export default function Example() {
  return (
    <div>
      {(["2xs", "m", "2xl"] as const).map((size) => (
        <div key={size}>
          <Text className="block rounded-sm bg-secondary px-2">above · {size}</Text>
          <Spacing size={size} />
        </div>
      ))}
      <Text className="block rounded-sm bg-secondary px-2">end</Text>
    </div>
  );
}
