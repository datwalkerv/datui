"use client";

import { Separator, Subhead } from "datui";

export default function Example() {
  return (
    <div className="grid gap-2">
      <Subhead>primary</Subhead>
      <Separator />
      <Subhead>secondary, with padding</Subhead>
      <Separator appearance="secondary" padding />
      <Subhead>alpha, size l</Subhead>
      <Separator appearance="alpha" size="l" />
    </div>
  );
}
