"use client";

import { Alert, Button } from "datui";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Sign out
      </Button>
      <Alert
        open={open}
        onOpenChange={setOpen}
        title="Sign out of all devices?"
        actionsLayout="vertical"
        actions={[
          { title: "Sign out everywhere", mode: "destructive" },
          { title: "Only this device" },
          { title: "Cancel", mode: "cancel" },
        ]}
      />
    </>
  );
}
