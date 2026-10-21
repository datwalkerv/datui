"use client";

import { Button, Cell, List } from "datui";
import { useState } from "react";

const initial = ["+1 555 0100", "+1 555 0101", "+1 555 0102"];

export default function Example() {
  const [phones, setPhones] = useState(initial);
  return (
    <div className="grid max-w-md gap-3">
      <List className="rounded-lg bg-card">
        {phones.map((phone) => (
          <Cell
            key={phone}
            mode="removable"
            removeLabel={`Remove ${phone}`}
            onRemove={() => setPhones((prev) => prev.filter((p) => p !== phone))}
          >
            {phone}
          </Cell>
        ))}
      </List>
      <Button variant="secondary" onClick={() => setPhones(initial)}>
        Reset
      </Button>
    </div>
  );
}
