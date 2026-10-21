"use client";

import { ToolButton } from "datui";
import { Pencil } from "lucide-react";

export default function Example() {
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        {(["primary", "secondary", "tertiary", "outline"] as const).map((variant) => (
          <ToolButton key={variant} variant={variant} icon={<Pencil />}>
            {variant}
          </ToolButton>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <ToolButton appearance="neutral" variant="secondary" icon={<Pencil />} direction="column">
          Edit
        </ToolButton>
        <ToolButton icon={<Pencil />} rounded aria-label="Edit" />
      </div>
    </div>
  );
}
