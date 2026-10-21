"use client";

import { Clickable, Text } from "datui";
import { useState } from "react";

export default function Example() {
  const [count, setCount] = useState(0);
  return (
    <div className="grid gap-2">
      <Clickable
        as="div"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md bg-secondary px-4 py-3 focus-visible:focus-ring"
      >
        Focus me and press Enter or Space
      </Clickable>
      <Text>Activated {count} times</Text>
    </div>
  );
}
