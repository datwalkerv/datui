"use client";

import { FormItem, FormLayoutGroup, Input } from "datui";

export default function Example() {
  return (
    <div className="grid max-w-lg gap-4">
      <FormLayoutGroup mode="horizontal" aria-label="Full name">
        <FormItem top="First name">
          <Input />
        </FormItem>
        <FormItem top="Last name">
          <Input />
        </FormItem>
      </FormLayoutGroup>
      <FormLayoutGroup segmented aria-label="Address">
        <FormItem>
          <Input aria-label="Street" placeholder="Street" />
        </FormItem>
        <FormItem>
          <Input aria-label="City" placeholder="City" />
        </FormItem>
      </FormLayoutGroup>
    </div>
  );
}
