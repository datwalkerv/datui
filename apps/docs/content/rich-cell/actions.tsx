"use client";

import { Avatar, Button, RichCell } from "datui";
import { useState } from "react";

export default function Example() {
  const [status, setStatus] = useState("Pending");
  return (
    <div className="max-w-md rounded-lg bg-card">
      <RichCell
        before={<Avatar size={48} initials="AM" gradientColor="light-blue" alt="" />}
        subtitle="Wants to join your team"
        meta={status}
        onClick={() => setStatus("Opened")}
        actions={
          <>
            <Button size="s" onClick={() => setStatus("Accepted")}>
              Accept
            </Button>
            <Button size="s" variant="secondary" onClick={() => setStatus("Declined")}>
              Decline
            </Button>
          </>
        }
      >
        Alex Morgan
      </RichCell>
    </div>
  );
}
