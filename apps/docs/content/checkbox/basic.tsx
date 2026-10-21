"use client";

import { Checkbox } from "datui";
import { useState } from "react";

const items = ["Email", "Push", "SMS"];

export default function Example() {
  const [on, setOn] = useState<string[]>(["Email"]);
  const all = on.length === items.length;
  return (
    <div className="max-w-sm">
      <Checkbox checked={all} indeterminate={on.length > 0 && !all} onCheckedChange={() => setOn(all ? [] : items)}>
        All notifications
      </Checkbox>
      {items.map((item) => (
        <Checkbox
          key={item}
          checked={on.includes(item)}
          onCheckedChange={(c) => setOn(c === true ? [...on, item] : on.filter((i) => i !== item))}
          description={`Send ${item.toLowerCase()} updates`}
        >
          {item}
        </Checkbox>
      ))}
      <Checkbox disabled>Disabled</Checkbox>
    </div>
  );
}
