"use client";

import { Tabs, TabsItem } from "datui";

export default function Example() {
  return (
    <div className="grid gap-4">
      {(["default", "accent", "secondary"] as const).map((mode) => (
        <Tabs key={mode} mode={mode} defaultValue="inbox" layoutFillMode="shrinked" aria-label={`${mode} tabs`}>
          <TabsItem value="inbox" status={3}>
            Inbox
          </TabsItem>
          <TabsItem value="sent">Sent</TabsItem>
          <TabsItem value="drafts">Drafts</TabsItem>
          <TabsItem value="spam" disabled>
            Spam
          </TabsItem>
        </Tabs>
      ))}
    </div>
  );
}
