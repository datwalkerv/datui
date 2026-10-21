"use client";

import { Removable } from "datui";
import { useState } from "react";

export default function Example() {
  const [emails, setEmails] = useState(["anna@example.com", "ben@example.com"]);
  return (
    <div className="grid max-w-md gap-1 rounded-lg bg-card py-1">
      {emails.map((email) => (
        <Removable
          key={email}
          removeLabel={`Remove ${email}`}
          onRemove={() => setEmails((prev) => prev.filter((e) => e !== email))}
        >
          <div className="px-4 py-3 text-body">{email}</div>
        </Removable>
      ))}
      <Removable indent>
        <div className="px-4 py-3 text-body text-muted-foreground">owner@example.com (can't be removed)</div>
      </Removable>
    </div>
  );
}
