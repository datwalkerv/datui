"use client";

import { Accordion } from "datui";
import { useState } from "react";

const sections = [
  { id: "account", title: "Account", body: "Name, email and password." },
  { id: "privacy", title: "Privacy", body: "Who can see your profile and activity." },
  { id: "devices", title: "Devices", body: "Phones and computers signed in to your account." },
];

export default function Example() {
  const [openId, setOpenId] = useState<string | null>("account");
  return (
    <div className="max-w-md rounded-lg bg-card">
      {sections.map((s) => (
        <Accordion
          key={s.id}
          unmountOnCollapse
          open={openId === s.id}
          onOpenChange={(open) => setOpenId(open ? s.id : null)}
        >
          <Accordion.Summary>{s.title}</Accordion.Summary>
          <Accordion.Content>
            <p className="m-0 px-4 pb-4 text-paragraph text-subtle-foreground">{s.body}</p>
          </Accordion.Content>
        </Accordion>
      ))}
    </div>
  );
}
