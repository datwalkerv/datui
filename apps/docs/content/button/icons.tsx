"use client";

import { Button } from "datui";
import { Plus, Send } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button before={<Plus className="size-icon-md" />}>Create</Button>
      <Button variant="secondary" after={<Send className="size-icon-sm" />}>
        Send
      </Button>
      <Button variant="tertiary" before={<Plus className="size-icon-md" />} aria-label="Add item" />
      <Button
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1500);
        }}
      >
        Save changes
      </Button>
    </div>
  );
}
