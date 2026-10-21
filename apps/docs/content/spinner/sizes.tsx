"use client";

import { Spinner } from "datui";

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="s" />
      <Spinner size="m" />
      <Spinner size="l" className="text-primary" />
      <Spinner size="xl" className="text-muted-foreground" />
    </div>
  );
}
