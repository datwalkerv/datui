"use client";

import { Button } from "datui";

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="s">Small</Button>
      <Button size="m">Medium</Button>
      <Button size="l">Large</Button>
      <Button size="l" stretched variant="secondary">
        Stretched
      </Button>
    </div>
  );
}
