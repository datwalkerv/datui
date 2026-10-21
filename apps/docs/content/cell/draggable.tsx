"use client";

import { Cell, List } from "datui";
import { useState } from "react";

export default function Example() {
  const [items, setItems] = useState(["Inbox", "Starred", "Sent", "Drafts"]);
  return (
    <List className="max-w-md rounded-lg bg-card">
      {items.map((item) => (
        <Cell
          key={item}
          draggable
          onDragFinish={({ from, to }) =>
            setItems((prev) => {
              const next = [...prev];
              const [moved] = next.splice(from, 1);
              if (moved !== undefined) next.splice(to, 0, moved);
              return next;
            })
          }
        >
          {item}
        </Cell>
      ))}
    </List>
  );
}
