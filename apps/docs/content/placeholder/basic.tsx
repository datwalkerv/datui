"use client";

import { Button, Placeholder } from "datui";
import { Inbox } from "lucide-react";

export default function Example() {
  return (
    <div className="rounded-xl bg-background">
      <Placeholder icon={<Inbox />} title="No messages" action={<Button>Write a message</Button>}>
        Conversations you start appear here.
      </Placeholder>
    </div>
  );
}
