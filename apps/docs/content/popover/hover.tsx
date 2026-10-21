"use client";

import { Button, Popover } from "datui";

export default function Example() {
  return (
    <Popover
      aria-label="Profile preview"
      trigger={["hover", "focus"]}
      placement="top"
      arrow
      content={<p className="m-0">Ada Lovelace · 1,204 followers</p>}
    >
      <Button variant="link">@ada</Button>
    </Popover>
  );
}
