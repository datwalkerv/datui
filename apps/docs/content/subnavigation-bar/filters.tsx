"use client";

import { SubnavigationBar, SubnavigationButton } from "datui";
import { useState } from "react";

const filters = ["Online", "Nearby", "With photo", "Verified", "New", "Popular", "Recommended"];

export default function Example() {
  const [on, setOn] = useState<string[]>(["Online"]);
  const toggle = (f: string) => setOn((v) => (v.includes(f) ? v.filter((x) => x !== f) : [...v, f]));
  return (
    <SubnavigationBar aria-label="Filters">
      <SubnavigationButton chevron aria-haspopup="menu" aria-expanded={false}>
        Sort
      </SubnavigationButton>
      {filters.map((f) => (
        <SubnavigationButton key={f} selected={on.includes(f)} onClick={() => toggle(f)}>
          {f}
        </SubnavigationButton>
      ))}
    </SubnavigationBar>
  );
}
