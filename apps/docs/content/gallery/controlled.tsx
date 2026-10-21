"use client";

import { Button, Gallery } from "datui";
import { useState } from "react";

export default function Example() {
  const [index, setIndex] = useState(0);
  return (
    <div className="grid gap-3">
      <Gallery aria-label="Steps" slideIndex={index} onChange={setIndex} bullets="dark" className="rounded-xl">
        {["Welcome", "Pick a plan", "Invite your team"].map((title) => (
          <div key={title} className="flex h-40 items-center justify-center bg-muted text-title-3 text-foreground">
            {title}
          </div>
        ))}
      </Gallery>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="s" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          Back
        </Button>
        <Button size="s" disabled={index === 2} onClick={() => setIndex(index + 1)}>
          Next
        </Button>
        <span className="text-footnote text-muted-foreground">Step {index + 1} of 3</span>
      </div>
    </div>
  );
}
