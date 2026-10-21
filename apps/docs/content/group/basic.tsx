"use client";

import { Group, Header, InfoRow } from "datui";

export default function Example() {
  return (
    <div className="bg-background-secondary p-2">
      <Group header={<Header>Contact</Header>} description="Only friends can see this.">
        <div className="grid gap-3 px-4 py-2">
          <InfoRow header="Phone">+1 555 0100</InfoRow>
          <InfoRow header="Email">mia@example.com</InfoRow>
        </div>
      </Group>
      <Group header={<Header>Plain group</Header>} mode="plain">
        <Group.ExpandedContent>
          {["One", "Two", "Three"].map((t) => (
            <span key={t} className="shrink-0 rounded-lg bg-secondary px-4 py-6">
              {t}
            </span>
          ))}
        </Group.ExpandedContent>
      </Group>
    </div>
  );
}
