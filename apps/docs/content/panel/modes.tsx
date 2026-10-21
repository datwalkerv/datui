"use client";

import { Panel, PanelHeader } from "datui";

export default function Example() {
  return (
    <div className="grid gap-4 bg-background-secondary p-4 tablet:grid-cols-2">
      <Panel id="plain" mode="plain">
        <PanelHeader>Plain</PanelHeader>
        <p className="p-4 text-body">Edge to edge, separator under the header.</p>
      </Panel>
      <Panel id="card" mode="card">
        <PanelHeader>Card</PanelHeader>
        <p className="p-4 text-body">Rounded surface, spacing under the header.</p>
      </Panel>
    </div>
  );
}
