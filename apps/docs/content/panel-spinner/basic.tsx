"use client";

import { PanelSpinner } from "datui";

export default function Example() {
  return (
    <div className="rounded-xl bg-background">
      <PanelSpinner />
      <PanelSpinner height={48} size="s" label="Loading comments…" />
    </div>
  );
}
