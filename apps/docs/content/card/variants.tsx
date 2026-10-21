"use client";

import { Card } from "datui";

export default function Example() {
  return (
    <div className="grid grid-cols-2 gap-3 tablet:grid-cols-5">
      {(["tint", "shadow", "outline", "outline-tint", "plain"] as const).map((variant) => (
        <Card key={variant} variant={variant} className="p-4 text-subhead">
          {variant}
        </Card>
      ))}
    </div>
  );
}
