"use client";

import { Tabs, TabsItem } from "datui";
import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity" },
  { id: "members", label: "Members" },
];

export default function Example() {
  const [value, setValue] = useState("overview");
  return (
    <div>
      <Tabs value={value} onChange={setValue} aria-label="Project">
        {tabs.map((t) => (
          <TabsItem key={t.id} value={t.id} id={`tab-${t.id}`} aria-controls={`panel-${t.id}`}>
            {t.label}
          </TabsItem>
        ))}
      </Tabs>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={value !== t.id}
          className="p-4 text-body"
        >
          {t.label} content
        </div>
      ))}
    </div>
  );
}
