"use client";

import { InfoRow } from "datui";

export default function Example() {
  return (
    <div className="grid gap-3">
      <InfoRow header="Birthday">May 1, 1995</InfoRow>
      <InfoRow header="City">Lisbon</InfoRow>
    </div>
  );
}
