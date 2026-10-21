"use client";

import { Button, Popover } from "datui";

export default function Example() {
  return (
    <Popover
      aria-label="Rename"
      content={({ onClose }) => (
        <div className="grid gap-2">
          <input aria-label="Name" defaultValue="Holiday" className="rounded-md border px-2 py-1" />
          <Button size="s" onClick={onClose}>
            Save
          </Button>
        </div>
      )}
    >
      <Button variant="secondary">Rename</Button>
    </Popover>
  );
}
