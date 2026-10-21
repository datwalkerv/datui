"use client";

import { Button, Snackbar } from "datui";
import { useState } from "react";

export default function Example() {
  const [shown, setShown] = useState(false);
  return (
    <>
      <Button onClick={() => setShown(true)}>Archive</Button>
      {shown && (
        <Snackbar action="Undo" onClosed={() => setShown(false)}>
          Conversation archived
        </Snackbar>
      )}
    </>
  );
}
