"use client";

import { Removable } from "datui";
import { useState } from "react";

export default function Example() {
  const [items, setItems] = useState(["Milk", "Bread", "Coffee"]);
  return (
    <div className="grid max-w-md rounded-lg bg-card">
      {items.map((item) => (
        <Removable key={item} variant="reveal" onRemove={() => setItems((prev) => prev.filter((i) => i !== item))}>
          {({ isRemoving }) => (
            <div className="px-4 py-3 text-body">
              {item}
              {isRemoving && <span className="text-footnote text-muted-foreground"> — remove?</span>}
            </div>
          )}
        </Removable>
      ))}
    </div>
  );
}
