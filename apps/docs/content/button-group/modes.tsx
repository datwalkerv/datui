"use client";

import { Button, ButtonGroup } from "datui";

export default function Example() {
  return (
    <div className="grid gap-4">
      <ButtonGroup aria-label="Edit actions">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Stretched" stretched>
        <Button variant="secondary">Left</Button>
        <Button variant="secondary">Right</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Vertical" mode="vertical" gap="s" stretched>
        <Button>First</Button>
        <Button variant="outline">Second</Button>
      </ButtonGroup>
    </div>
  );
}
