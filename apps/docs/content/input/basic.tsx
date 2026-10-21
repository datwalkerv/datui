"use client";

import { FormItem, Input } from "datui";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [value, setValue] = useState("");
  return (
    <div className="grid max-w-sm">
      <FormItem top="Controlled" bottom={`${value.length} characters`}>
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type…" />
      </FormItem>
      <FormItem top="With icon">
        <Input defaultValue="Uncontrolled" before={<Search className="size-icon-sm" aria-hidden />} />
      </FormItem>
      <FormItem top="Amount">
        <Input type="number" align="right" after={<span className="text-muted-foreground">€</span>} />
      </FormItem>
    </div>
  );
}
