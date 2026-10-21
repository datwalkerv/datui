"use client";

import { VisuallyHidden } from "datui";
import { Bell } from "lucide-react";

export default function Example() {
  return (
    <button
      type="button"
      className="inline-flex size-control-l items-center justify-center rounded-full border-0 bg-secondary text-foreground focus-visible:focus-ring"
    >
      <Bell className="size-icon-md" aria-hidden />
      <VisuallyHidden>Notifications</VisuallyHidden>
    </button>
  );
}
