"use client";

import { Panel, PanelHeader, SplitCol, SplitLayout } from "datui";

export default function Example() {
  return (
    <div className="h-[320px] overflow-y-auto rounded-lg border border-border bg-background-secondary">
      <SplitLayout center>
        <SplitCol as="nav" aria-label="Sections" width={220} fixed autoSpaced className="max-tablet:hidden">
          <ul className="grid gap-1 p-3 text-subhead">
            <li>Feed</li>
            <li>Messages</li>
            <li>Settings</li>
          </ul>
        </SplitCol>
        <SplitCol as="section" aria-label="Conversation" maxWidth={560} stretchedOnMobile autoSpaced>
          <Panel id="feed">
            <PanelHeader>Feed</PanelHeader>
            <p className="p-4 text-body">Content column.</p>
          </Panel>
        </SplitCol>
      </SplitLayout>
    </div>
  );
}
