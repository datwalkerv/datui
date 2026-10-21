"use client";

import { Cell, List } from "datui";
import { useState } from "react";

const topics = ["Design", "Engineering", "Marketing"];

export default function Example() {
  const [selected, setSelected] = useState<string[]>(["Design"]);
  return (
    <div className="grid max-w-md gap-4">
      <List className="rounded-lg bg-card">
        {topics.map((topic) => (
          <Cell
            key={topic}
            mode="selectable"
            name="topics"
            value={topic}
            checked={selected.includes(topic)}
            onCheckedChange={(checked) =>
              setSelected((prev) => (checked ? [...prev, topic] : prev.filter((t) => t !== topic)))
            }
          >
            {topic}
          </Cell>
        ))}
      </List>
      <List className="rounded-lg bg-card">
        {["Standard", "Express"].map((option, i) => (
          <Cell
            key={option}
            mode="selectable"
            selectionType="radio"
            name="shipping"
            value={option}
            defaultChecked={i === 0}
            subtitle={i === 0 ? "3–5 days" : "Next day"}
          >
            {option}
          </Cell>
        ))}
      </List>
    </div>
  );
}
