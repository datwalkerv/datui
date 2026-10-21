"use client";

import { FormItem, Textarea } from "datui";

export default function Example() {
  return (
    <div className="max-w-sm">
      <FormItem top="Comment">
        <Textarea placeholder="Write several lines…" maxHeight={160} />
      </FormItem>
      <FormItem top="Fixed height">
        <Textarea rows={3} grow={false} />
      </FormItem>
    </div>
  );
}
