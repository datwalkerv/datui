"use client";

import { Button, Tooltip } from "datui";

export default function Example() {
  return (
    <Tooltip
      defaultOpen
      closable
      placement="right"
      appearance="accent"
      title="New"
      description="Export your data as CSV."
    >
      <Button variant="secondary">Export</Button>
    </Tooltip>
  );
}
