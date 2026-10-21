"use client";

import { Button, ModalCard } from "datui";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Enable notifications</Button>
      <ModalCard
        open={open}
        onClose={() => setOpen(false)}
        icon={<Bell className="size-icon-xl" />}
        title="Turn on notifications?"
        description="We will only notify you about replies to your posts."
        actions={
          <>
            <Button stretched size="l" onClick={() => setOpen(false)}>
              Turn on
            </Button>
            <Button stretched size="l" variant="secondary" onClick={() => setOpen(false)}>
              Not now
            </Button>
          </>
        }
      />
    </>
  );
}
