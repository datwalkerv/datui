"use client";

import { Button, Snackbar, type SnackbarPlacement } from "datui";
import { CircleCheck } from "lucide-react";
import { useState } from "react";

const placements: SnackbarPlacement[] = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"];

export default function Example() {
  const [placement, setPlacement] = useState<SnackbarPlacement | null>(null);
  return (
    <div className="flex flex-wrap gap-2">
      {placements.map((p) => (
        <Button key={p} variant="secondary" size="s" onClick={() => setPlacement(p)}>
          {p}
        </Button>
      ))}
      {placement && (
        <Snackbar
          key={placement}
          placement={placement}
          mode="dark"
          layout="vertical"
          before={<CircleCheck className="size-icon-md" />}
          subtitle="Visible to your friends"
          action="View"
          onClosed={() => setPlacement(null)}
        >
          Photo uploaded
        </Snackbar>
      )}
    </div>
  );
}
