"use client";

import { Badge } from "datui";

export default function Example() {
  return (
    <div className="flex items-center gap-4 text-body">
      <span className="inline-flex items-center gap-1.5">
        Updates <Badge>New</Badge>
      </span>
      <span className="inline-flex items-center gap-1.5">
        Alerts <Badge appearance="negative">Important</Badge>
      </span>
    </div>
  );
}
