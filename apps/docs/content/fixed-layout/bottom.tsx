"use client";

import { Button, FixedLayout, Panel, PanelHeader } from "datui";

export default function Example() {
  return (
    <div className="h-[320px] overflow-y-auto rounded-lg border border-border">
      <Panel id="checkout" mode="plain">
        <PanelHeader fixed>Checkout</PanelHeader>
        <ul className="grid gap-3 p-4 pb-8 text-body">
          {Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`).map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
        <FixedLayout vertical="bottom" filled className="p-3">
          <Button stretched size="l">
            Pay
          </Button>
        </FixedLayout>
      </Panel>
    </div>
  );
}
