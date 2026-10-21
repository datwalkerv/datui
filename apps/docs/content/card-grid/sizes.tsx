"use client";

import { Card, CardGrid } from "datui";

export default function Example() {
  return (
    <div className="grid gap-4">
      {(["s", "m", "l"] as const).map((size) => (
        <CardGrid key={size} size={size}>
          {[1, 2, 3].map((n) => (
            <Card key={n} asChild variant="outline">
              <li className="p-4 text-subhead">
                {size} card {n}
              </li>
            </Card>
          ))}
        </CardGrid>
      ))}
    </div>
  );
}
