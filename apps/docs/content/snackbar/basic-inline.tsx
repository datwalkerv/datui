"use client";

import { SnackbarBasic } from "datui";
import { Archive } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [undone, setUndone] = useState(false);
  return (
    <SnackbarBasic
      className="max-w-sm"
      before={<Archive className="size-icon-md" aria-hidden />}
      action={undone ? undefined : "Undo"}
      onActionClick={() => setUndone(true)}
    >
      {undone ? "Restored" : "Conversation archived"}
    </SnackbarBasic>
  );
}
