"use client";

import { Button, OnboardingTooltip } from "datui";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => setOpen(true)}>Start tour</Button>
      <OnboardingTooltip
        open={open}
        onClose={() => setOpen(false)}
        title="New filters"
        description="Narrow your results by date and author."
        placement="right"
      >
        <Button variant="secondary">Filters</Button>
      </OnboardingTooltip>
    </div>
  );
}
