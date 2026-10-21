"use client";

import { Button, Panel } from "datui";

export default function Example() {
  return (
    <div className="h-[240px]">
      <Panel id="empty" centered mode="plain" className="h-full">
        <p className="mb-3 text-body text-muted-foreground">No messages yet</p>
        <Button>Start a chat</Button>
      </Panel>
    </div>
  );
}
