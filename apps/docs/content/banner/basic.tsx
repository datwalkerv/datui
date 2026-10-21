"use client";

import { Banner, Button, ButtonGroup } from "datui";
import { useState } from "react";

export default function Example() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="grid gap-3">
      {visible && (
        <Banner
          title="Try the new editor"
          subtitle="Faster, with offline drafts."
          after="dismiss"
          onDismiss={() => setVisible(false)}
          actions={
            <ButtonGroup aria-label="Banner actions">
              <Button size="s">Try it</Button>
            </ButtonGroup>
          }
        />
      )}
      <Banner title="Storage almost full" subtitle="Tap to manage" after="chevron" href="#storage" />
      <Banner
        variant="image"
        size="m"
        title="Summer sale"
        subtitle="Up to 50% off"
        background={<div className="bg-linear-to-br from-primary to-destructive" />}
      />
    </div>
  );
}
