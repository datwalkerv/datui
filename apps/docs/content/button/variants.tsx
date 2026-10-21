"use client";

import { Button } from "datui";

const variants = ["primary", "secondary", "tertiary", "outline", "link"] as const;
const appearances = ["accent", "positive", "negative", "neutral"] as const;

export default function Example() {
  return (
    <div className="grid gap-3">
      {appearances.map((appearance) => (
        <div key={appearance} className="flex flex-wrap items-center gap-2">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} appearance={appearance}>
              {variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
