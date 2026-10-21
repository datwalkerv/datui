"use client";

import { SubnavigationButton } from "datui";

const variants = ["primary", "outline", "tertiary"] as const;

export default function Example() {
  return (
    <div className="grid gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-2">
          <SubnavigationButton variant={variant} size="s" selected>
            Small
          </SubnavigationButton>
          <SubnavigationButton variant={variant} selected={false}>
            Medium
          </SubnavigationButton>
          <SubnavigationButton variant={variant} appearance="neutral" size="l" selected>
            Large neutral
          </SubnavigationButton>
        </div>
      ))}
    </div>
  );
}
