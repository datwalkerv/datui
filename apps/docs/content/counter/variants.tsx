"use client";

import { Button, Counter } from "datui";
import type * as React from "react";

export default function Example() {
  return (
    <div className="grid gap-3">
      {(["primary", "contrast", "tertiary", "inherit"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-2">
          {(["accent", "neutral", "positive", "negative"] as const).map((appearance) => (
            <Counter key={appearance} variant={variant} appearance={appearance}>
              12
            </Counter>
          ))}
          <Counter
            variant={variant}
            appearance="custom"
            color="var(--docs-brand)"
            style={{ "--dt-counter-foreground": "var(--docs-brand-foreground)" } as React.CSSProperties}
            size="s"
          >
            3
          </Counter>
        </div>
      ))}
      <Button after={<Counter variant="contrast">5</Counter>}>Inbox</Button>
    </div>
  );
}
