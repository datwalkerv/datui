"use client";

import { Button, FocusTrap, Text } from "datui";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid gap-3">
      <div>
        <Button onClick={() => setOpen(true)}>Open panel</Button>
      </div>
      {open && (
        <FocusTrap onEscape={() => setOpen(false)} className="grid max-w-sm gap-3 rounded-lg bg-card p-4 shadow-md">
          <Text>Tab cycles between these buttons. Escape closes.</Text>
          <div className="flex gap-2">
            <Button variant="secondary">Another</Button>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </FocusTrap>
      )}
    </div>
  );
}
