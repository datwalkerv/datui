"use client";

import { FormField } from "datui";
import { AtSign, Check } from "lucide-react";

export default function Example() {
  return (
    <div className="grid max-w-sm gap-3">
      <FormField before={<AtSign className="size-icon-sm" aria-hidden />}>
        <input
          aria-label="Username"
          placeholder="username"
          className="min-w-0 flex-1 bg-transparent px-3 outline-none"
        />
      </FormField>
      <FormField status="valid" after={<Check className="size-icon-md text-positive" aria-hidden />}>
        <input aria-label="Code" defaultValue="A1B2" className="min-w-0 flex-1 bg-transparent px-3 outline-none" />
      </FormField>
      <FormField mode="plain">
        <input
          aria-label="Plain"
          placeholder="Plain mode"
          className="min-w-0 flex-1 bg-transparent px-3 outline-none"
        />
      </FormField>
    </div>
  );
}
