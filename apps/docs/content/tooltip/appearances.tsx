"use client";

import { Button, Tooltip } from "datui";

const appearances = ["neutral", "accent", "white", "black", "inversion"] as const;

export default function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      {appearances.map((appearance) => (
        <Tooltip key={appearance} appearance={appearance} description={`A ${appearance} tooltip`}>
          <Button variant="secondary">{appearance}</Button>
        </Tooltip>
      ))}
    </div>
  );
}
