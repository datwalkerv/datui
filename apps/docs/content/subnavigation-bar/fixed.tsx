"use client";

import { SubnavigationBar, SubnavigationButton } from "datui";
import { useState } from "react";

export default function Example() {
  const [period, setPeriod] = useState("week");
  return (
    <SubnavigationBar fixed aria-label="Period">
      {["day", "week", "month"].map((p) => (
        <SubnavigationButton key={p} variant="outline" selected={period === p} onClick={() => setPeriod(p)}>
          {p}
        </SubnavigationButton>
      ))}
    </SubnavigationBar>
  );
}
